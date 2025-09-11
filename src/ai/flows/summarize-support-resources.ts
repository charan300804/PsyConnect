'use server';

/**
 * @fileOverview Summarizes support resources for quick understanding.
 *
 * - summarizeSupportResource - A function that summarizes the given text.
 * - SummarizeSupportResourceInput - The input type for the summarizeSupportResource function.
 * - SummarizeSupportResourceOutput - The return type for the summarizeSupportResource function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSupportResourceInputSchema = z.object({
  resourceText: z
    .string()
    .describe('The text content of the support resource to summarize.'),
});
export type SummarizeSupportResourceInput = z.infer<
  typeof SummarizeSupportResourceInputSchema
>;

const SummarizeSupportResourceOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the support resource.'),
});
export type SummarizeSupportResourceOutput = z.infer<
  typeof SummarizeSupportResourceOutputSchema
>;

export async function summarizeSupportResource(
  input: SummarizeSupportResourceInput
): Promise<SummarizeSupportResourceOutput> {
  return summarizeSupportResourceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSupportResourcePrompt',
  input: {schema: SummarizeSupportResourceInputSchema},
  output: {schema: SummarizeSupportResourceOutputSchema},
  prompt: `Summarize the following support resource text in a concise manner:

  {{{resourceText}}}`,
});

const summarizeSupportResourceFlow = ai.defineFlow(
  {
    name: 'summarizeSupportResourceFlow',
    inputSchema: SummarizeSupportResourceInputSchema,
    outputSchema: SummarizeSupportResourceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
