'use server';

/**
 * @fileOverview This file defines a flow for detecting user sentiment and severity of emotional state using Gemini.
 */

import { model } from '@/lib/gemini';

export type DetectUserSentimentInput = {
  text: string;
};

export type DetectUserSentimentOutput = {
  sentiment: string;
  severity: string;
};

export async function detectUserSentiment(
  input: DetectUserSentimentInput
): Promise<DetectUserSentimentOutput> {
  const { text } = input;

  const prompt = `Analyze the sentiment and severity of the following text:

  Text: ${text}

  Determine the overall sentiment (positive, negative, or neutral) and the severity of the emotional state (low, medium, or high). 
  The severity should reflect the intensity of the emotion expressed in the text.
  
  Respond ONLY with a valid JSON object in the following format:
  {
    "sentiment": "positive" | "negative" | "neutral",
    "severity": "low" | "medium" | "high"
  }
  Do not include markdown formatting like \`\`\`json. Just the raw JSON string.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text().trim();

    // Clean up markdown formatting if present
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '');
    }
    if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```/g, '');
    }

    try {
      const jsonResponse = JSON.parse(responseText);
      return {
        sentiment: jsonResponse.sentiment || 'neutral',
        severity: jsonResponse.severity || 'low'
      };
    } catch (parseError) {
      console.warn("Failed to parse sentiment JSON:", responseText);
      return { sentiment: 'neutral', severity: 'low' };
    }

  } catch (error) {
    console.error("Error detecting sentiment:", error);
    return { sentiment: 'neutral', severity: 'low' };
  }
}
