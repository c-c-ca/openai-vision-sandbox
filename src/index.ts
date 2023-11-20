import path from 'path';
import { config } from 'dotenv';

config({
  path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`),
});

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await openai.chat.completions.create({
    model: process.env.MODEL!,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "What's in this image?",
          },
          {
            type: 'image_url',
            image_url: {
              url: process.env.SAMPLE_IMAGE_URI!,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  });
  console.log(response.choices);
}
main();
