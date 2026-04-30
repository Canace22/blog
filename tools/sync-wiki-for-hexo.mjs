#!/usr/bin/env node
/**
 * 将仓库根目录 wiki/ 同步到 source/wiki/，供 Hexo 生成可访问页面。
 * - 原始内容仍以 wiki/ 为准；本目录为构建产物，已由 .gitignore 忽略。
 * - 站内链接：_posts 引用 → 博客文章路径 /slug/；wiki 内 .md → .html（Hexo 默认页面 URL）。
 * - `wiki/index.md`：保留分区框架；每个 ## / ### 下条目按指向的 wiki 文件 mtime **倒序**排序；列表项链接文案与站内各 wiki 页的 `title` 前言区均增加 **`YYYY-MM-DD` 日期前缀**（取自对应页文件 mtime 的日历日）。
 * - 跳过 `wiki/Clippings/` 不同步到站（避免草稿被发布）。
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const WIKI = path.join(ROOT, 'wiki')
const OUT = path.join(ROOT, 'source/wiki')

function rewriteLinks(md) {
  let s = md
  s = s.replace(
    /\]\((\.\.\/)*\.\.\/source\/_posts\/([^/)]+)\.md\)/g,
    (_, _dots, slug) => `](/${slug}/)`
  )
  s = s.replace(/\]\(([^)]*\.md)\)/g, (full, p) => {
    if (/^https?:\/\//i.test(p)) return full
    if (/\bdocs\/\b/.test(p)) return full
    return `](${p.replace(/\.md$/, '.html')})`
  })
  return s
}

function extractTitle(mdBody, relPath) {
  const m = mdBody.match(/^#\s+(.+)$/m)
  if (m) return m[1].trim().slice(0, 200)
  return path.basename(relPath, '.md')
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

/** 本地日历日 `YYYY-MM-DD` */
function toYyyyMmDd(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

function formatYamlDateFromStat(st) {
  const d = st.mtime
  const ymdhms =
    `${toYyyyMmDd(d)} ` +
    `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
  return JSON.stringify(ymdhms)
}

function ymdForWikiMarkdownRel(relToWikiRoot) {
  const norm = relToWikiRoot.replace(/\\/g, '/')
  const abs = path.join(WIKI, norm)
  try {
    return toYyyyMmDd(fs.statSync(abs).mtime)
  } catch {
    return '????-??-??'
  }
}

const MD_LINK_RE = /\[[^\]]*\]\(([^)]+\.md)\)/

function firstMarkdownMdLink(line) {
  const m = line.match(MD_LINK_RE)
  return m ? m[1].trim() : null
}

function targetMtimeMs(relToWikiRoot) {
  const norm = relToWikiRoot.replace(/\\/g, '/')
  const abs = path.join(WIKI, norm)
  try {
    return fs.statSync(abs).mtimeMs
  } catch {
    return 0
  }
}

/** 对每个 ## / ### 小节下连续的 `- …` 列表，按条目内首个指向 wiki 内的 `.md` 链接对应文件的 mtime 倒序排序。 */
function sortListBlocksUnderHeadings(markdown) {
  const lines = markdown.split('\n')
  const out = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (/^#{2,3}\s/.test(line)) {
      out.push(line)
      i++
      while (i < lines.length && lines[i].trim() === '') {
        out.push(lines[i])
        i++
      }
      const bullets = []
      while (i < lines.length && /^- /.test(lines[i])) {
        bullets.push(lines[i])
        i++
      }
      if (bullets.length > 0) {
        bullets.sort((a, b) => {
          const pa = firstMarkdownMdLink(a)
          const pb = firstMarkdownMdLink(b)
          const ma = pa ? targetMtimeMs(pa) : 0
          const mb = pb ? targetMtimeMs(pb) : 0
          if (mb !== ma) return mb - ma
          return a.localeCompare(b, 'zh-CN')
        })
        bullets.forEach((bl) => out.push(bl))
      }
      continue
    }
    out.push(line)
    i++
  }
  return out.join('\n')
}

/** `wiki/index.md` 正文中：对每个 `- [...](*.md)` 条目，在方括号标题前冠以 `YYYY-MM-DD `（已与链接目标 mtime 一致时可去重前缀后再写）。 */
function prefixDatesInWikiIndexBulletLines(markdown) {
  return markdown
    .split('\n')
    .map((line) => {
      if (!/^- /.test(line)) return line
      const m = line.match(/^(-\s+)\[([^\]]*)\]\(([^)]+\.md)\)(.*)$/)
      if (!m) return line
      const [, lead, inner, mdPath, rest] = m
      const stripped = inner.replace(/^\d{4}-\d{2}-\d{2}\s+/, '').trim()
      const ymd = ymdForWikiMarkdownRel(mdPath)
      return `${lead}[${ymd} ${stripped}](${mdPath})${rest}`
    })
    .join('\n')
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  for (const name of fs.readdirSync(dir)) {
    if (name === '.DS_Store') continue
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p, files)
    else if (name.endsWith('.md')) files.push(p)
  }
  return files
}

function main() {
  if (!fs.existsSync(WIKI)) {
    console.warn('sync-wiki-for-hexo: wiki/ 不存在，跳过')
    return
  }
  fs.rmSync(OUT, { recursive: true, force: true })
  fs.mkdirSync(OUT, { recursive: true })

  const list = walk(WIKI)
  let synced = 0
  for (const abs of list) {
    const rel = path.relative(WIKI, abs).split(path.sep).join('/')
    if (rel === 'Clippings' || rel.startsWith('Clippings/')) continue
    const raw = fs.readFileSync(abs, 'utf8')
    const title = extractTitle(raw, rel)
    const st = fs.statSync(abs)
    const dateLine = formatYamlDateFromStat(st)
    let bodyMd = raw.replace(/^#\s+.+\n?/, '')
    if (rel === 'index.md') {
      bodyMd = sortListBlocksUnderHeadings(bodyMd)
      bodyMd = prefixDatesInWikiIndexBulletLines(bodyMd)
    }
    const body = rewriteLinks(bodyMd)

    let pageTitle = title
    if (rel !== 'index.md') {
      const prefix = `${toYyyyMmDd(st.mtime)} `
      pageTitle = title.startsWith(prefix) ? title : prefix + title
    }

    const outAbs = path.join(OUT, rel)
    fs.mkdirSync(path.dirname(outAbs), { recursive: true })
    const head =
      '---\n' +
      `title: ${JSON.stringify(pageTitle)}\n` +
      'layout: page\n' +
      'comments: false\n' +
      'toc: true\n' +
      `date: ${dateLine}\n` +
      '---\n\n'
    fs.writeFileSync(outAbs, head + body, 'utf8')
    synced += 1
  }
  console.log(`sync-wiki-for-hexo: ${synced} 页 → source/wiki/（扫描 ${list.length} 份 .md）`)
}

main()
