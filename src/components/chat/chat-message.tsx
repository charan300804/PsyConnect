
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
        'flex items-start gap-3',
        !isBot && 'flex-row-reverse'
      )}
    >
      <Avatar className="w-8 h-8">
        <AvatarFallback
          className={cn(
            isBot ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
          )}
        >
          {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'p-3 rounded-lg max-w-sm md:max-w-md',
          isBot ? 'bg-secondary' : 'bg-primary/90 text-primary-foreground'
        )}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
