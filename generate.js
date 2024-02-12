const OpenAI = require('openai').default;
const articlesCore = require('./src/app/core/index.js');
const prompts = require('./src/app/prompts/index.js');
const { appendFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const path = require('path');
const slugify = require('slugify');
const { fileURLToPath } = require('url');

const { getArticleContentPrompt, getArticleDescription, getOpenAiImage } = prompts;

const openai = new OpenAI({
  apiKey: process.env['OPEN_AI_KEY'],
});

const generateImage = async (elem) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: getOpenAiImage(elem),
    style: 'vivid',
    n: 1,
    response_format: 'b64_json',
    quality: 'standard',
    size: '1024x1024',
  });

  return Buffer.from(response.data[0].b64_json, 'base64');
}

const generateDescription = async (elem) => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'As professional content writer, based on programming on Javascript you will have help me to write article' },
      { role: 'user', content: getArticleDescription(elem) },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

const generateDate = (start = new Date('2023-09-01T00:00:00Z')) => {
  const startDate = start.getTime();
  const endDate = new Date().getTime();
  const randomTime = startDate + Math.random() * (endDate - startDate);

  return new Date(randomTime).toISOString();
}

async function main() {
  const contentFolder = path.resolve(__dirname, 'content');
  const blogFolder = path.resolve(contentFolder, 'blog');

  if (!existsSync(contentFolder)) {
    mkdirSync(contentFolder);
  }

  if (!existsSync(blogFolder)) {
    mkdirSync(blogFolder);
  }

  for (const elem of articlesCore.slice(0, 4)) {
    try {
      let chatCompletion = '';

      const stream = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'As a professional content writer, based on programming on Javascript you will have to help me to write an article' },
          { role: 'user', content: getArticleContentPrompt(elem) },
        ],
        model: 'gpt-3.5-turbo',
        stream: true,
        temperature: 0.7,
      });

      for await (const chunk of stream) {
        if (chunk.choices[0]?.delta?.content) {
          chatCompletion += chunk.choices[0]?.delta?.content
        }
      }

      const imageBuffer = await generateImage(elem);
      const description = await generateDescription(elem);

      const slug = slugify(elem.title, {
        replacement: '-',
        lower: true,
      });

      const articleFolder = path.join(blogFolder, slug);

      if (!existsSync(articleFolder)) {
        mkdirSync(articleFolder);
      }

      appendFileSync(path.join(articleFolder, 'index.md'), `---
title: "${elem.title}"
metatags: "${elem.metatags.join(', ')}"
date: "${generateDate()}"
slug: "${slug}"
description: "${description}"
---
![Article image](./image.png)
${chatCompletion}
`);

      writeFileSync(path.join(articleFolder, 'image.png'), imageBuffer);
    } catch (error) {
      console.error(error);
    }
  }
}

main();