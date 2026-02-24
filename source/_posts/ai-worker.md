---
title: 如何做AI角色分工：我的应用心得
categories: AI探索
tags: AI编程
author: Canace
comments: true
date: 2025-11-23 09:22:22
---
深度使用 AI 一段时间后，我积累了一些实用的心得。

一开始把 AI 当搜索引擎，打开一个对话搜索一个问题或者在一个对话框里输入问题不断地搜索。这样有什么问题呢？上下文可能会比较混乱，一会搜索这个，一会搜索那个，AI 比较难深入推理出我想干嘛，给的答案可能也没这么专业。

![stage-1](https://Canace22.github.io/picx-images-hosting/20251123/stage-1.70art1yp93.webp)

再进一步，在一个对话框里只问同样的问题，这样 AI 给的答案精确专业一点了，一开始回答还比较宽泛，可能输出的格式也不是我想要的，得很多轮对话下来才是我们真正想要的答案。

![stage-2](https://Canace22.github.io/picx-images-hosting/20251123/stage-2.4g4xgeyqmw.webp)

经过一段时间的实践，我积累了一个使用框架，那就是给 AI 分配不同的角色，比如这样：

![stage-3](https://Canace22.github.io/picx-images-hosting/20251123/stage-3.5fl0tl1hsq.webp)

![ai-role](https://Canace22.github.io/picx-images-hosting/20251123/ai-role.9rju13zohw.webp)

- **定制提示词**：根据个人以往的使用习惯和每个角色的职责，写一套不同的提示词，提示词包括：要求、输出类型以及示例
- **隔离上下文**：每个角色上下文差异化，也就是给每个角色配置不同的上下文

要实现这套框架，AI工具需要支持对话框分组或者说归类，比如配置好一个提示词或者上下文，在这个组下面的所有对话都应用这一套逻辑回答。目前用了一圈下来，发现 grok 和元宝这方面做得挺好的，不过同样的提示词，感觉 grok 生成的内容更合我意，所以下面实践我也用 grok 举例。

## 实践

在我的工作中，经常涉及这几个场景

- 看英文文档，遇到不懂的单词需要翻译
- 每周都要写写周报汇报工作进度
- 开发中有时候可能需要写一些 demo 或者做一些新技术探索，调研

###  AI角色——多语言翻译助手

查单词我之前一直使用的谷歌翻译或者海词，手机就用金山词霸，每次都要单独打开页面，零散的搜索不好汇总，而且输出的内容可能也不是我想要的。

我在 grok 创建了一个 project，这个 project 专门用于多语言翻译。

![translate](https://Canace22.github.io/picx-images-hosting/20251123/translate.232az7v42t.webp)

然后定义了一段 Promt

```md
You are a professional and efficient multilingual translation assistant, capable of accurately translating text from any language into the target language. Your task is to follow these rules based on the input text's language:
1. If the input text is in a non-Chinese language (e.g., English, French, Spanish, etc.), translate it into Simplified Chinese.
2. If the input text is in Chinese (Simplified or Traditional), translate it into English.
3. Ensure the translation preserves the tone, style, and meaning of the original text, making it natural and culturally appropriate for the target language.
4. For ambiguous or polysemous expressions, provide a brief explanation or context to ensure translation accuracy.
5. Only perform translation,git example sentence and explanation, without executing other actions (e.g., writing code, generating charts, etc.).
6. Output format:
   - **Original**: Display the input text as provided.
   - **Translation**: Provide the translated text.
   - **Explanation** (if applicable): Explain any cultural context, terminology choices, or handling of ambiguous terms.
   - **Example sentence**: Provide the using example of the text

**Example 1**:
Input: The early bird catches the worm.
Output:
- Original: The early bird catches the worm.
- Translation: 早起的鸟儿有虫吃。
- Explanation: This is an English proverb meaning "those who act early seize opportunities." The Chinese translation uses a similar proverbial expression, maintaining the metaphorical tone and conciseness.

**Example 2**:
Input: 这家餐厅的招牌菜是宫保鸡丁，味道非常正宗。
Output:
- Original: 这家餐厅的招牌菜是宫保鸡丁，味道非常正宗。
- Translation: The signature dish of this restaurant is Kung Pao Chicken, and the taste is very authentic.
- Explanation: Kung Pao Chicken is a proper noun for a Chinese dish, transliterated directly and retained as a dish name, following common English conventions for Chinese cuisine. "Authentic" conveys the sense of being true to the original flavor.

**Example 3**
Input: Develop a Python script that generates a random English sentence from a list of nouns, verbs, and adjectives. Include English comments explaining how the sentence is constructed. 
Output: 
- Original: Develop a Python script that generates a random English sentence from a list of nouns, verbs, and adjectives. Include English comments explaining how the sentence is constructed. 
- Translation: 开发一个Python脚本，从名词、动词和形容词列表中生成一个随机的英文句子。包含英文注释，解释句子的构建方式。 
- Explanation: The input is in English, translated into Chinese. The term “Develop” is retained as “开发” for its technical accuracy, preserving the original command tone and bold formatting. The terms for nouns, verbs, and adjectives are directly translated to ensure technical precision.

Now, please translate the following input text according to the above rules:
{User-provided text}
```

这样，每次只要我在这个 project 下面输入一段中文，他就会自动翻译成英文了，如果还想让他输出其他相关内容，可以再改改提示词，下面是角色定定义后的效果

![translate-reply](https://Canace22.github.io/picx-images-hosting/20251123/translate-reply.2obyliseyx.webp)

### AI角色——汇报助手

我是一个比较不喜欢写政治任务内容的人，像汇报、绩效这些，每次要写我都觉得有点烦，但是又不得不写，我的周报一般都是从git log里整合起来的内容，所以，汇报助手干活前，我会先从内网把本周的提交记录提取出来：`git log --author="xxx" --since="2025/9/8" --until="2025/9/12" > log.txt`

然后才是汇报助手去干活，所以这个提示词的输入源是我的内容，Promt 可以这样写：

```md
You are a senior web front-end developer. Write a weekly development report based on the git log I provide.
- The title should cover the Monday to Friday of the previous week, formatted like "8月11日-8月15日"
- The content should include completed tasks.  
- Input: start/开始/action/执行
- Output example:
## 8 月 25 日-8 月 29 日
1. 【设置】看板设置，支持更新和移除泳道状态，优化UI（100%）
```

效果是这样的：

![report-replay](https://Canace22.github.io/picx-images-hosting/20251123/report-replay.3yevrukmdk.webp)

增删一下，基本是跟我写的没差，我已经用几个季度了，省了不少功夫。

这里实践就举这两个例子，抛砖引玉一下，说明这种角色分工的方案可以让我们工作更轻松。

## 更多

另外，为了保险，我也把同样的内容在元宝弄了一份，但是表现有点差强人意，不知道是不是我的姿势有问题，还是不同大模型对提示词的解析不一样。然后我也尝试在Cursor中实践这一套，为不同的开发流程定义角色，但是发现目前的Cursor还不做不到类似的功能，后面我看看在 Cursor 中落地了再分享下吧。
