'use server';

/**
 * @fileOverview This file defines a Genkit flow for detecting user sentiment and severity of emotional state.
 *
 * - detectUserSentiment -  A function that analyzes user input and returns the sentiment and severity.
 * - DetectUserSentimentInput - The input type for the detectUserSentiment function.
 * - DetectUserSentimentOutput - The return type for the detectUserSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectUserSentimentInputSchema = z.object({
  text: z.string().describe('The text to analyze for sentiment.'),
});
export type DetectUserSentimentInput = z.infer<typeof DetectUserSentimentInputSchema>;

const DetectUserSentimentOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The overall sentiment of the text (e.g., positive, negative, neutral).'
    ),
  severity: z
    .string()
    .describe(
      'The severity of the emotional state expressed in the text (e.g., low, medium, high).'
    ),
});
export type DetectUserSentimentOutput = z.infer<typeof DetectUserSentimentOutputSchema>;

export async function detectUserSentiment(
  input: DetectUserSentimentInput
): Promise<DetectUserSentimentOutput> {
  return detectUserSentimentFlow(input);
}

const detectUserSentimentPrompt = ai.definePrompt({
  name: 'detectUserSentimentPrompt',
  input: {schema: DetectUserSentimentInputSchema},
  output: {schema: DetectUserSentimentOutputSchema},
  prompt: `Analyze the sentiment and severity of the following text:

Text: {{{text}}}

Determine the overall sentiment (positive, negative, or neutral) and the severity of the emotional state (low, medium, or high).  The severity should reflect the intensity of the emotion expressed in the text. Respond with a valid JSON object.
`,
});

const detectUserSentimentFlow = ai.defineFlow(
  {
    name: 'detectUserSentimentFlow',
    inputSchema: DetectUserSentimentInputSchema,
    outputSchema: DetectUserSentimentOutputSchema,
  },
  async input => {
    const {output} = await detectUserSentimentPrompt(input);
    return output!;
  }
);
