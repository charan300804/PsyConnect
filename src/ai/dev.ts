import { config } from 'dotenv';
import 'dotenv/config';

config();

import '@/ai/flows/detect-user-sentiment.ts';
import '@/ai/flows/initial-chatbot-prompt.ts';
import '@/ai/flows/summarize-support-resources.ts';
import '@/ai/flows/generate-chat-response.ts';
