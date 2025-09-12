
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
    <Link href={`/forum/${post.id}`}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg font-headline">{post.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
              <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-accent/20 text-accent text-xs">
                      {post.author.isModerator ? <Shield className="w-4 h-4" /> : <UserCircle className="w-4 h-4" />}
                  </AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
              {post.author.isModerator && <Badge variant="secondary">{t('forum_moderator')}</Badge>}
              <span>•</span>
              <span>{post.createdAt}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.replies} {t('forum_replies')}</span>
              </div>
              <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views} {t('forum_views')}</span>
              </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
