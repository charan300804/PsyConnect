
'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatMessage from './chat-message';
import { initialChatbotPrompt } from '@/ai/flows/initial-chatbot-prompt';
import { generateChatResponse } from '@/ai/flows/generate-chat-response';
import { Skeleton } from '../ui/skeleton';
import { useLanguage, useTranslation } from '@/context/language-context';

type Message = {
  id: string;
  role: 'user' | 'bot';
  text: string | React.ReactNode;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { language, region } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchInitialMessage = async () => {
      try {
        const response = await initialChatbotPrompt({});
        setMessages([
          {
            id: 'init-1',
            role: 'bot',
            text: response.message,
          },
        ]);
      } catch (error) {
        console.error('Failed to get initial prompt:', error);
        setMessages([
          {
            id: 'init-error',
            role: 'bot',
            text: t('chat_initial_error'),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialMessage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Map ReactNode to string for the history
      const history = newMessages.slice(0, -1).map(m => ({
        role: m.role,
        // This is a simplification. If the bot returns complex JSX, this could be lossy.
        text: typeof m.text === 'string' ? m.text : 'Complex UI Component',
      }));

      const { response } = await generateChatResponse({ text: input, history, language, region });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to generate chat response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: t('chat_response_error'),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full max-h-[70vh] bg-card border rounded-lg shadow-lg">
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="EmotiCare Bot" />
          <AvatarFallback className="bg-primary/20">
            <Bot className="text-primary" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{t('chat_assistant_title')}</h2>
          <p className="text-xs text-muted-foreground">{t('chat_assistant_subtitle')}</p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && messages.length > 0 && (
             <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/20">
                  <Bot className="w-4 h-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat_input_placeholder')}
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSendMessage(e);
              }
            }}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
            {t('chat_disclaimer')}
        </p>
      </div>
    </div>
  );
}
