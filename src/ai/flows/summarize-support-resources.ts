'use server';

/**
 * @fileOverview Summarizes support resources for quick understanding.
 *
 * - summarizeSupportResource - A function that summarizes the given text.
 * - SummarizeSupportResourceInput - The input type for the summarizeSupportResource function.
 * - SummarizeSupportResourceOutput - The return type for the summarizeSupportResource function.
 */

import { model } from '@/lib/gemini';

export type SummarizeSupportResourceInput = {
  resourceText: string;
  summaryLength?: 'short' | 'medium' | 'detailed';
};

export type SummarizeSupportResourceOutput = {
  summary: string;
};

export async function summarizeSupportResource(
  input: SummarizeSupportResourceInput
): Promise<SummarizeSupportResourceOutput> {
  const { resourceText, summaryLength = 'medium' } = input;

  let lengthInstruction = '';
  if (summaryLength === 'short') {
    lengthInstruction = 'Provide a very brief, one-sentence summary.';
  } else if (summaryLength === 'medium') {
    lengthInstruction = 'Provide a concise summary of about 2-3 sentences.';
  } else if (summaryLength === 'detailed') {
    lengthInstruction = 'Provide a more detailed summary of 4-5 sentences, breaking down the key points.';
  }

  const prompt = `You are an expert at summarizing texts for students who may be feeling stressed or overwhelmed. Your summaries should be in plain, easy-to-understand language.

  Please summarize the following support resource text.

  ${lengthInstruction}

  Resource Text:
  ${resourceText}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return { summary };

  } catch (error) {
    console.error("Error summarizing resource:", error);
    return { summary: "Failed to generate summary." };
  }
}
