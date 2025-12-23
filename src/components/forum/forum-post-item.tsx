
'use client';

import Link from 'next/link';
import { MessageSquare, Eye, UserCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ForumPost } from '@/lib/forum-data';
import { useTranslation } from '@/context/language-context';

type ForumPostItemProps = {
  post: ForumPost;
};

export default function ForumPostItem({ post }: ForumPostItemProps) {
  const { t } = useTranslation();
  return (
    <Link href={`/forum/${post.id}`} className="block group">
      <Card className="glass border-white/20 dark:border-white/10 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-primary/30 bg-white/40 dark:bg-black/20 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg group-hover:text-primary transition-colors font-headline">{post.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
            <Avatar className="w-6 h-6 border border-white/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {post.author.isModerator ? <Shield className="w-3.5 h-3.5" /> : <UserCircle className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground/80">{post.author.name}</span>
            {post.author.isModerator && <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-primary/10 text-primary border-primary/20">{t('forum_moderator')}</Badge>}
            <span className="text-muted-foreground/40">•</span>
            <span className="text-muted-foreground/80">{post.createdAt}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/70 line-clamp-2 leading-relaxed">{post.content}</p>
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-4">
            <div className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{post.replies} {t('forum_replies')}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
              <Eye className="w-3.5 h-3.5" />
              <span>{post.views} {t('forum_views')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
