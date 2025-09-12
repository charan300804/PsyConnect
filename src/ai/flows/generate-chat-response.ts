'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a context-aware chatbot response.
 *
 * - generateChatResponse - A function that analyzes user input and conversation history to generate an empathetic response.
 * - GenerateChatResponseInput - The input type for the generateChatResponse function.
 * - GenerateChatResponseOutput - The return type for the generateChatResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'bot']),
  text: z.string(),
});

const GenerateChatResponseInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  text: z.string().describe('The latest user message.'),
  language: z.string().optional().describe('The user\'s preferred language (e.g., "en-US", "es-MX").'),
  region: z.string().optional().describe('The user\'s region (e.g., "US", "MX") for cultural context.'),
});
export type GenerateChatResponseInput = z.infer<typeof GenerateChatResponseInputSchema>;

const GenerateChatResponseOutputSchema = z.object({
  response: z.string().describe('The generated response from the chatbot.'),
});
export type GenerateChatResponseOutput = z.infer<typeof GenerateChatResponseOutputSchema>;

export async function generateChatResponse(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput> {
  return generateChatResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChatResponsePrompt',
  input: {schema: GenerateChatResponseInputSchema},
  output: {schema: GenerateChatResponseOutputSchema},
  prompt: `You are a friendly and supportive AI chatbot named EmotiCare, designed to provide psychological first aid.
  Your goal is to be a welcoming and supportive presence, encouraging users to share their feelings and concerns.
  Your responses should be empathetic, reassuring, and non-judgmental. You are here to listen and offer guidance.
  Keep your responses concise but warm.

  VERY IMPORTANT: You must consider the user's language and region to provide culturally appropriate and sensitive support.
  User Language: {{{language}}}
  User Region: {{{region}}}

  Analyze the conversation history and the latest user message. Generate a response that is appropriate and supportive.
  If the user's message indicates severe distress or mentions self-harm, gently guide them towards professional help and suggest they visit the Resource Hub.

  Conversation History:
  {{#each history}}
  {{role}}: {{{text}}}
  {{/each}}

  New User Message:
  {{{text}}}

  Generate your response:
  `,
});

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
