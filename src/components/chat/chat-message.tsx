
import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'bot';
  text: string | React.ReactNode;
};

type ChatMessageProps = {
  message: Message;
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'bot';

  return (
    <div
      className={cn(
        'flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-300',
        !isBot && 'flex-row-reverse'
      )}
    >
      <Avatar className="w-9 h-9 border-2 border-white shadow-sm">
        <AvatarFallback
          className={cn(
            isBot ? 'bg-gradient-to-br from-primary to-primary/60 text-white' : 'bg-gradient-to-br from-accent to-accent/60 text-white'
          )}
        >
          {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'p-4 max-w-sm md:max-w-md shadow-md text-sm leading-relaxed',
          isBot
            ? 'glass-card rounded-2xl rounded-tl-none border-0 bg-white/80 dark:bg-gray-800/80'
            : 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-tr-none'
        )}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
}
