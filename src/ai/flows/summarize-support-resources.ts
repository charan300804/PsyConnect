
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
  summaryLength: z
    .enum(['short', 'medium', 'detailed'])
    .optional()
    .default('medium')
    .describe('The desired length of the summary.'),
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
  prompt: `You are an expert at summarizing texts for students who may be feeling stressed or overwhelmed. Your summaries should be in plain, easy-to-understand language.

Please summarize the following support resource text.

{{#if (eq summaryLength "short")}}
Provide a very brief, one-sentence summary.
{{/if}}
{{#if (eq summaryLength "medium")}}
Provide a concise summary of about 2-3 sentences.
{{/if}}
{{#if (eq summaryLength "detailed")}}
Provide a more detailed summary of 4-5 sentences, breaking down the key points.
{{/if}}

Resource Text:
{{{resourceText}}}
`,
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
