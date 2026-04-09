#!/usr/bin/env node
/**
 * 将 source/_posts/*.md 批量同步为 wiki/sources/*.md，并生成 wiki/index.md 中的 Sources 区块。
 * 手写精修页：若 slug 在 PRESERVE_SLUGS 中则跳过覆盖。
 *
 * 用法：node tools/wiki-ingest-all.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const POSTS = path.join(ROOT, 'source/_posts')
const WIKI = path.join(ROOT, 'wiki')
const SOURCES = path.join(WIKI, 'sources')
const INDEX_PATH = path.join(WIKI, 'index.md')
const LOG_PATH = path.join(WIKI, 'log.md')

/** 不覆盖：已由人工写摘要与关联概念 */
const PRESERVE_SLUGS = new Set(['llm-wiki.md', 'ai-coding-game.md'])

const CATEGORY_ORDER = [
  '编程基础',
  'Web开发',
  '工程化与运维',
  'AI探索',
  '软技能与思考',
  '网站建设',
  '未分类',
]

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m)
  if (!match) return null
  return { yaml: match[1], body: match[2] }
}

function parseSimpleYaml(yaml) {
  const obj = {}
  const lines = yaml.split(/\r?\n/)
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (/^\s*#/.test(line) || line.trim() === '') {
      i++
      continue
    }
    const kv = line.match(/^(\w+)\s*:\s*(.*)$/)
    if (!kv) {
      i++
      continue
    }
    const key = kv[1]
    let rest = kv[2].trim()
    if (rest === '|' || rest === '>') {
      i++
      continue
    }
    if (rest.startsWith('[') && rest.endsWith(']')) {
      obj[key] = rest
        .slice(1, -1)
        .split(/\s*,\s*/)
        .map((s) => s.replace(/^['"]|['"]$/g, '').trim())
        .filter(Boolean)
    } else {
      obj[key] = rest.replace(/^['"]|['"]$/g, '').replace(/\s+#.*$/, '').trim()
    }
    i++
  }
  return obj
}

function bodyExcerpt(body, maxLen = 600) {
  let t = body
  t = t.replace(/```[\s\S]*?```/g, ' ')
  t = t.replace(/^#{1,6}\s+/gm, '')
  t = t.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  t = t.replace(/\s+/g, ' ').trim()
  if (!t) return '（正文主要为代码或列表，请在源文件中查看。）'
  if (t.length <= maxLen) return t
  return t.slice(0, maxLen) + '…'
}

function normalizeCategory(c) {
  if (!c) return '未分类'
  const s = String(c).trim()
  return CATEGORY_ORDER.includes(s) ? s : '未分类'
}

function escapeMd(text) {
  return String(text).replace(/\|/g, '\\|')
}

function fmtTags(tags) {
  if (tags == null || tags === '') return '—'
  if (Array.isArray(tags)) return tags.join('，')
  return String(tags)
}

function renderSourcePage(basename, meta, body) {
  const title = meta.title || basename.replace(/\.md$/, '')
  const cat = normalizeCategory(meta.categories)
  const tags = fmtTags(meta.tags)
  const date = meta.date || '—'
  const desc = meta.description ? String(meta.description).trim() : ''
  const summary = desc || bodyExcerpt(body, 700)

  const lines = [
    `# 来源：${title}`,
    '',
    `- **源文件**：[\`source/_posts/${basename}\`](../../source/_posts/${basename})`,
    `- **分类**：${cat}`,
    `- **标签**：${tags}`,
    `- **日期**：${date}`,
    '',
    '## 摘要',
    '',
    escapeMd(summary),
    '',
  ]
  return lines.join('\n') + '\n'
}

function readConcepts() {
  const dir = path.join(WIKI, 'concepts')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const p = path.join(dir, f)
      const raw = fs.readFileSync(p, 'utf8')
      const first = raw.match(/^#\s+(.+)$/m)
      const title = first ? first[1].trim() : f
      return { title, href: `concepts/${f}` }
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
}

function buildIndex(byCategory, concepts) {
  const lines = ['# Wiki Index', '', '## Sources（按分类）', '']
  for (const cat of CATEGORY_ORDER) {
    const items = byCategory[cat]
    if (!items?.length) continue
    lines.push(`### ${cat}`, '')
    for (const { title, basename } of items) {
      const slug = basename.replace(/\.md$/, '')
      const linkTitle = title.includes(']') ? title.replace(/]/g, '\\]') : title
      lines.push(
        `- [${linkTitle}](sources/${basename}) — \`source/_posts/${basename}\``
      )
    }
    lines.push('')
  }
  lines.push('## Concepts', '')
  for (const c of concepts) {
    lines.push(`- [${c.title}](${c.href})`)
  }
  lines.push('', '## Other', '', '- （暂无 `queries/`、`reports/` 条目）', '')
  return lines.join('\n')
}

function appendLogLine(message) {
  const prev = fs.existsSync(LOG_PATH) ? fs.readFileSync(LOG_PATH, 'utf8') : '# Wiki Log\n\n'
  const trimmed = prev.endsWith('\n') ? prev : prev + '\n'
  const line = `- ${message}\n`
  if (trimmed.includes(message)) return
  fs.writeFileSync(LOG_PATH, trimmed + line, 'utf8')
}

function main() {
  if (!fs.existsSync(SOURCES)) fs.mkdirSync(SOURCES, { recursive: true })

  const files = fs.readdirSync(POSTS).filter((f) => f.endsWith('.md'))
  const byCategory = Object.fromEntries(CATEGORY_ORDER.map((c) => [c, []]))
  let written = 0
  let skipped = 0

  for (const basename of files.sort()) {
    const abs = path.join(POSTS, basename)
    const raw = fs.readFileSync(abs, 'utf8')
    const parsed = parseFrontMatter(raw)
    const meta = parsed ? parseSimpleYaml(parsed.yaml) : {}
    const body = parsed?.body ?? raw
    const title = meta.title || basename.replace(/\.md$/, '')
    const cat = normalizeCategory(meta.categories)
    byCategory[cat].push({ title, basename })

    const outPath = path.join(SOURCES, basename)
    if (PRESERVE_SLUGS.has(basename)) {
      skipped++
      continue
    }
    fs.writeFileSync(outPath, renderSourcePage(basename, meta, body), 'utf8')
    written++
  }

  for (const cat of CATEGORY_ORDER) {
    byCategory[cat].sort((a, b) => {
      const fa = path.join(POSTS, a.basename)
      const fb = path.join(POSTS, b.basename)
      const da = fs.statSync(fa).mtimeMs
      const db = fs.statSync(fb).mtimeMs
      return db - da
    })
  }

  const concepts = readConcepts()
  fs.writeFileSync(INDEX_PATH, buildIndex(byCategory, concepts), 'utf8')

  const today = new Date().toISOString().slice(0, 10)
  appendLogLine(
    `${today}：批量 ingest source/_posts（${files.length} 篇），生成/更新 wiki/sources（跳过手写保留 ${skipped} 篇），重写 wiki/index.md Sources 区块。`
  )

  console.log(
    `wiki-ingest-all: ${files.length} posts, wrote ${written} source pages, preserved ${skipped}, index updated.`
  )
}

main()
