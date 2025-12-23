'use server';

/**
 * @fileOverview This file defines a flow for generating a context-aware chatbot response using Gemini.
 */

import { model } from '@/lib/gemini';

export type Message = {
  role: 'user' | 'bot';
  text: string;
};

export type GenerateChatResponseInput = {
  history: Message[];
  text: string;
  language?: string;
  region?: string;
};

export type GenerateChatResponseOutput = {
  response: string;
};

export async function generateChatResponse(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput> {
  const { history, text, language, region } = input;

  const systemInstruction = `You are a friendly and supportive AI chatbot named PsyConnect Assistant, designed to provide psychological first aid.
  Your goal is to be a welcoming and supportive presence, encouraging users to share their feelings and concerns.
  Your responses should be empathetic, reassuring, and non-judgmental. You are here to listen and offer guidance.
  
  Guide the user through their emotions using active listening and open-ended questions.
  Keep your responses concise but warm. Avoid long paragraphs unless necessary.

  VERY IMPORTANT: You must consider the user's language and region to provide culturally appropriate and sensitive support.
  User Language: ${language || 'en-US'}
  User Region: ${region || 'Unknown'}

  If the user's message indicates severe distress or mentions self-harm, gently guide them towards professional help and suggest they visit the Resource Hub.
  `;

  // Construct a prompt that includes the history and system instruction
  // This is a stateless approach which is often more robust for simple rewrites
  const finalPrompt = `${systemInstruction}

  Conversation History:
  ${history.map(h => `${h.role}: ${h.text}`).join('\n')}

  New User Message:
  ${text}

  Generate your response:`;

  try {
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const responseText = response.text();

    return { response: responseText };

  } catch (error) {
    console.error("Error generating chat response:", error);
    return { response: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." };
  }
}
