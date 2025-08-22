import React from 'react'
import {
    GoogleGenAI,
} from '@google/genai';
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export async function POST(req) {
    const user = await currentUser();
    const DataForm = await req.json();
    const PROMPT = `
Create a detailed and structured learning course based on the following input: ${JSON.stringify(DataForm)}

Your response should be returned strictly in JSON format and follow the schema described.

Include:
- Course name, description, category, level, video content, chapters count
- Each chapter: title, duration, topics, and image prompt

Create an image prompt for each chapter:

"Create a clean and modern 2D flat-style illustration related to ${DataForm.name}. Include code snippets, programming icons, development tools, workspace elements, diagrams, charts, educational elements. Use a bold color scheme (blues, purples, oranges) reflecting DevOps in ${DataForm.category}."

Respond using this JSON structure only:
{
  "course": {
    "name": "string",
    "description": "string", 
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "chapters": "number",
    "imagePrompt": "string",
    "allchapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"]
      }
    ]
  }
}
`;
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const model = 'gemini-2.5-flash';
    const contents = [
        {
            role: 'user',
            parts: [{ text: PROMPT }],
        },
    ];
    const tools = [{ googleSearch: {} }];
    const config = { thinkingConfig: { thinkingBudget: -1 }, tools };

    const response = await ai.models.generateContent({ model, config, contents });

    const rowRES = response.candidates[0].content.parts[0].text;
    const rowJson = rowRES.replace("```json", "").replace("```", "");
    const ResJson = JSON.parse(rowJson);
    const imageBanner = ResJson.course?.imagePrompt;
    const imageURL = await generateImage(imageBanner);
    const courseid = uuidv4();
    await db.insert(coursesTable).values({
        ...DataForm,
        courseJson: ResJson,
        cid: courseid,
        imageURL: imageURL,
        email: user?.primaryEmailAddress?.emailAddress,
    });

    return NextResponse.json({ courseid });
}
async function generateImage(prompt) {
    try {
        const response = await axios.post(
            "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
            {
                text_prompts: [{ text: prompt }],
                cfg_scale: 7,
                steps: 30
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );

        const base64Image = response.data.artifacts[0].base64;
        return `data:image/png;base64,${base64Image}`;
    } catch (err) {
        console.error("Stability AI Error:", err.response?.data || err.message);
        throw err;
    }
}
