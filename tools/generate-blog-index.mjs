#!/usr/bin/env node
/**
 * 扫描博客文章，提取元数据并生成索引文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname, '../source/_posts');
const OUTPUT_DIR = '/Users/canace/Documents/知识库/AI 探索';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'Canace 博客索引.md');

// 解析 front matter
function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m);
  if (!match) return null;
  return { yaml: match[1], body: match[2] };
}

// 提取 YAML 字段
function extractField(yaml, field) {
  const match = yaml.match(new RegExp('^' + field + '\\s*:\\s*(.+)', 'm'));
  return match ? match[1].trim() : null;
}

// 格式化日期
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 格式化字段（去除单引号）
function formatField(value) {
  if (!value) return '-';
  // 去除首尾单引号
  return value.replace(/^'|'$/g, '').trim();
}

// 格式化标签
function formatTags(tags) {
  if (!tags) return '-';
  // 处理数组格式 [tag1, tag2]
  if (tags.startsWith('[')) {
    return tags.replace(/[\[\]]/g, '').split(',').map(t => t.trim()).join('、');
  }
  // 统一使用顿号分隔多个标签
  return tags.replace(/^'|'$/g, '').trim().replace(/,/g, '、');
}

// 获取所有文章
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const posts = [];

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = parseFrontMatter(raw);
  
  if (!parsed) continue;
  
  const title = extractField(parsed.yaml, 'title') || file.replace('.md', '');
  const date = extractField(parsed.yaml, 'date');
  const categories = extractField(parsed.yaml, 'categories');
  const tags = extractField(parsed.yaml, 'tags');
  const slug = file.replace('.md', '');
  
  if (date) {
    posts.push({ title, date, categories, tags, slug });
  }
}

// 按日期倒序排列
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 生成今天的日期
const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

// 生成 Markdown 内容
let md = `# Canace 博客索引

> 博客地址：https://canace.site  
> 本地路径：~/Desktop/blog/source/_posts  
> 最后更新：${todayStr}  
> 文章总数：${posts.length} 篇

## 文章索引

| 日期 | 标题 | 分类 | 标签 |
|------|------|------|------|
`;

for (const post of posts) {
  const date = formatDate(post.date);
  const link = `https://canace.site/${post.slug}/`;
  const title = post.title.replace(/\|/g, '\\|'); // 转义竖线
  const categories = formatField(post.categories) || '-';
  const tags = formatTags(post.tags);
  
  md += `| ${date} | [${title}](${link}) | ${categories} | ${tags} |\n`;
}

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 写入文件
fs.writeFileSync(OUTPUT_FILE, md, 'utf-8');

console.log(`✅ 博客索引已生成: ${OUTPUT_FILE}`);
console.log(`   共 ${posts.length} 篇文章`);
