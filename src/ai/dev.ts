import { config } from 'dotenv';
config();

import '@/ai/flows/detect-user-sentiment.ts';
import '@/ai/flows/initial-chatbot-prompt.ts';
import '@/ai/flows/summarize-support-resources.ts';