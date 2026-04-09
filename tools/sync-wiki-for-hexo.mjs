#!/usr/bin/env node
/**
 * 将仓库根目录 wiki/ 同步到 source/wiki/，供 Hexo 生成可访问页面。
 * - 原始内容仍以 wiki/ 为准；本目录为构建产物，已由 .gitignore 忽略。
 * - 站内链接：_posts 引用 → 博客文章路径 /slug/；wiki 内 .md → .html（Hexo 默认页面 URL）。
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
  for (const abs of list) {
    const rel = path.relative(WIKI, abs).split(path.sep).join('/')
    const raw = fs.readFileSync(abs, 'utf8')
    const body = rewriteLinks(raw)
    const title = extractTitle(body, rel)
    const outAbs = path.join(OUT, rel)
    fs.mkdirSync(path.dirname(outAbs), { recursive: true })
    const head = `---\ntitle: ${JSON.stringify(title)}\nlayout: page\ncomments: false\n---\n\n`
    fs.writeFileSync(outAbs, head + body, 'utf8')
  }
  console.log(`sync-wiki-for-hexo: ${list.length} 页 → source/wiki/`)
}

main()
