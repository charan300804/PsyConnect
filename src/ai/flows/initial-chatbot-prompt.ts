'use server';

/**
 * @fileOverview Provides a friendly and helpful initial message from the chatbot to encourage user interaction.
 *
 * @exports initialChatbotPrompt - Function to generate the initial chatbot message.
 */

const WELCOME_MESSAGES = [
  "Hello! I'm PsyConnect Assistant. I'm here to listen and support you. How are you feeling today?",
  "Hi there. I'm PsyConnect Assistant, your personal support companion. What's on your mind?",
  "Welcome. I'm PsyConnect Assistant. I'm here to provide a safe space for you to share your thoughts. How can I help?",
  "Hello. I'm PsyConnect Assistant. Feel free to share whatever is troubling you. I'm here to listen.",
  "Hi! I'm PsyConnect Assistant. I'm here to support you through whatever you're experiencing. Want to talk about it?"
];

export type InitialChatbotPromptInput = {};

export type InitialChatbotPromptOutput = {
  message: string;
};

export async function initialChatbotPrompt(input: InitialChatbotPromptInput): Promise<InitialChatbotPromptOutput> {
  // Select a random message from the list
  const randomMessage = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];

  // Return immediately for instant UI feedback
  return { message: randomMessage };
}
