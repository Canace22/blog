#!/usr/bin/env node
/**
 * 为没有摘要的文章自动生成摘要
 * 调用千问（通义千问）API，写入 front matter 的 description 字段
 *
 * 用法：npm run summary
 * 环境变量：QWEN_API_KEY（放在 .env 文件中）
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import OpenAI from 'openai'
import { config } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.resolve(__dirname, '../source/_posts')
const CONCURRENCY = 3   // 并发请求数，避免触发限流
const MAX_CONTENT_CHARS = 3000  // 送给模型的正文最大字符数

config({ path: path.resolve(__dirname, '../.env') })

// ---------------------------------------------------------------------------
// 千问客户端（OpenAI 兼容接口）
// ---------------------------------------------------------------------------
function createClient() {
  const apiKey = process.env.QWEN_API_KEY
  if (!apiKey) {
    console.error('❌ 缺少 QWEN_API_KEY，请在 .env 文件中配置')
    process.exit(1)
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  })
}

// ---------------------------------------------------------------------------
// front matter 解析 / 写入（不依赖 gray-matter，减少依赖）
// ---------------------------------------------------------------------------
function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m)
  if (!match) return null
  return { yaml: match[1], body: match[2] }
}

function hasDescription(yaml) {
  return /^description\s*:/m.test(yaml)
}

/** 替换已有的 description 字段值 */
function replaceDescription(yaml, description) {
  const escaped = description.replace(/'/g, "''")
  return yaml.replace(/^(description\s*:).*/m, `$1 '${escaped}'`)
}

/** 在 yaml 块中插入 description 字段（紧跟在 title 行后面） */
function insertDescription(yaml, description) {
  const escaped = description.replace(/'/g, "''")
  const line = `description: '${escaped}'`

  if (/^title\s*:/m.test(yaml)) {
    return yaml.replace(/^(title\s*:.*)/m, `$1\n${line}`)
  }
  return `${line}\n${yaml}`
}

// ---------------------------------------------------------------------------
// 生成摘要
// ---------------------------------------------------------------------------
async function generateDescription(client, title, body) {
  const content = body.slice(0, MAX_CONTENT_CHARS)
  const prompt = `你是一名技术博主，请基于提供的标题和正文内容，输出一句话摘要（80 字以内）。

【输出目标】
用一句口语化表达，总结最核心的结论或关键踩坑点，像朋友之间复盘经验时随口说出的那句重点。

【必须满足】

* 严格控制在 80 字以内
* 只能输出摘要文本，不要添加任何解释或额外内容
* 不得出现任何人称代词或指代词，包括但不限于：我、你、他、她、它、我们、你们、他们、作者、本文、文章
* 不得使用引号

【风格要求】

* 直接给结论或指出关键问题
* 语气自然、克制、不夸张
* 偏经验总结，不要情绪化煽动
* 不要标题党，不要制造焦虑
* 避免书面化表达，避免总结式套话

---

文章标题：
${title}

文章正文：
${content}`

  const res = await client.chat.completions.create({
    model: 'qwen-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 200,
  })

  return res.choices[0].message.content.trim()
}

// ---------------------------------------------------------------------------
// 处理单篇文章
// ---------------------------------------------------------------------------
async function processPost(client, filePath, regen = false) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = parseFrontMatter(raw)

  if (!parsed) {
    console.warn(`⚠️  跳过（无 front matter）: ${path.basename(filePath)}`)
    return 'skipped'
  }

  const needRegen = regen && hasDescription(parsed.yaml)
  if (hasDescription(parsed.yaml) && !needRegen) {
    return 'exists'
  }

  // 从 yaml 提取 title
  const titleMatch = parsed.yaml.match(/^title\s*:\s*(.+)/m)
  const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, '.md')

  const description = await generateDescription(client, title, parsed.body)

  const newYaml = needRegen
    ? replaceDescription(parsed.yaml, description)
    : insertDescription(parsed.yaml, description)
  const newRaw = `---\n${newYaml}\n---\n${parsed.body}`
  fs.writeFileSync(filePath, newRaw, 'utf-8')

  console.log(`✅ ${path.basename(filePath)}`)
  console.log(`   → ${description}`)
  return 'done'
}

// ---------------------------------------------------------------------------
// 并发控制：把数组切成大小为 size 的批次顺序执行
// ---------------------------------------------------------------------------
async function runInBatches(items, size, fn) {
  const stats = { done: 0, exists: 0, skipped: 0, failed: 0 }
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size)
    const results = await Promise.allSettled(batch.map(fn))
    results.forEach((r, idx) => {
      if (r.status === 'fulfilled') {
        stats[r.value] = (stats[r.value] ?? 0) + 1
      } else {
        stats.failed++
        console.error(`❌ ${path.basename(batch[idx])}: ${r.reason?.message ?? r.reason}`)
      }
    })
  }
  return stats
}

// ---------------------------------------------------------------------------
// 入口
// ---------------------------------------------------------------------------
async function main() {
  const regen = process.argv.includes('--regen')
  const client = createClient()

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'blog-category.md')
    .map(f => path.join(POSTS_DIR, f))

  const toProcess = files.filter(f => {
    const raw = fs.readFileSync(f, 'utf-8')
    const parsed = parseFrontMatter(raw)
    if (!parsed) return false
    if (!hasDescription(parsed.yaml)) return true
    return regen
  })

  const mode = regen ? '（重新生成所有摘要）' : ''
  console.log(`📄 共 ${files.length} 篇文章，${toProcess.length} 篇需要处理${mode}\n`)

  if (toProcess.length === 0) {
    console.log('🎉 所有文章已有摘要，无需处理')
    return
  }

  const stats = await runInBatches(
    toProcess,
    CONCURRENCY,
    f => processPost(client, f, regen),
  )

  console.log(`\n📊 完成: ${stats.done}  失败: ${stats.failed}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
