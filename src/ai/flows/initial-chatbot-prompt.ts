'use server';

/**
 * @fileOverview Provides a friendly and helpful initial message from the chatbot to encourage user interaction.
 *
 * @exports initialChatbotPrompt - Function to generate the initial chatbot message.
 * @exports InitialChatbotPromptInput - The input type for the initialChatbotPrompt function (currently empty).
 * @exports InitialChatbotPromptOutput - The return type for the initialChatbotPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InitialChatbotPromptInputSchema = z.object({});
export type InitialChatbotPromptInput = z.infer<typeof InitialChatbotPromptInputSchema>;

const InitialChatbotPromptOutputSchema = z.object({
  message: z.string().describe('A friendly and helpful initial message from the chatbot.'),
});
export type InitialChatbotPromptOutput = z.infer<typeof InitialChatbotPromptOutputSchema>;

export async function initialChatbotPrompt(input: InitialChatbotPromptInput): Promise<InitialChatbotPromptOutput> {
  return initialChatbotPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'initialChatbotPrompt',
  input: {schema: InitialChatbotPromptInputSchema},
  output: {schema: InitialChatbotPromptOutputSchema},
  prompt: `You are a friendly and supportive AI chatbot designed to provide psychological first aid.
  Your initial message should set a welcoming and supportive tone, encouraging users to share their feelings and concerns.
  The message should be concise and reassuring, letting the user know that you are there to listen and offer guidance.

  Generate the initial message:
  `,
});

const initialChatbotPromptFlow = ai.defineFlow(
  {
    name: 'initialChatbotPromptFlow',
    inputSchema: InitialChatbotPromptInputSchema,
    outputSchema: InitialChatbotPromptOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
