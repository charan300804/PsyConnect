
'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatMessage from './chat-message';
import { initialChatbotPrompt } from '@/ai/flows/initial-chatbot-prompt';
import { detectUserSentiment } from '@/ai/flows/detect-user-sentiment';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

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
            text: 'Hello! I am here to help. How are you feeling today?',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialMessage();
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
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { sentiment, severity } = await detectUserSentiment({ text: input });

      let botResponseText: string | React.ReactNode;

      if (severity === 'high') {
        botResponseText = (
          <span>
            It sounds like you're going through a very difficult time. Your feelings are valid, and it's brave of you to share.
            For immediate and professional support, it might be best to connect with a trained counsellor. You can explore our{' '}
            <Link href="/resources" className="text-accent underline">Resource Hub</Link> for helplines and booking options. Please remember, you are not alone.
          </span>
        );
      } else if (sentiment === 'negative') {
        botResponseText = "I'm sorry to hear that you're feeling this way. It's okay to not be okay. Thank you for sharing with me. I'm here to listen if you want to talk more about it.";
      } else if (sentiment === 'positive') {
        botResponseText = "That's wonderful to hear! I'm glad you're feeling positive. It's great to cherish these moments.";
      } else {
        botResponseText = "Thank you for sharing that with me. Every feeling is valid. Is there anything specific on your mind?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: botResponseText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get sentiment:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'I had a little trouble understanding that. Could you please try rephrasing?',
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
          <h2 className="text-lg font-semibold">EmotiCare Assistant</h2>
          <p className="text-xs text-muted-foreground">Psychological First-Aid Chat</p>
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
            placeholder="Tell me what's on your mind..."
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
            This chat is anonymous and for supportive purposes. It is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
