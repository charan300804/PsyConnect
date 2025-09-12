
'use client';

import { forumPosts } from '@/lib/forum-data';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserCircle, Shield, MessageSquare, Eye, Flag, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';

// This is a dummy component for replies. In a real app, this would be more complex.
const ForumReplies = () => {
    const { t } = useTranslation();
    const replies: any[] = [];

    if (replies.length === 0) {
        return (
            <div className="space-y-6 mt-8">
                <h3 className="text-xl font-bold">{t('forum_replies')}</h3>
                <div className="text-center text-muted-foreground py-8">
                    {t('forum_no_replies')}
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-6 mt-8">
            <h3 className="text-xl font-bold">{t('forum_replies')}</h3>
            {replies.map(reply => (
                <Card key={reply.id}>
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                         <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-accent/20 text-accent text-sm">
                                {reply.author.isModerator ? <Shield className="w-4 h-4" /> : <UserCircle className="w-4 h-4" />}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{reply.author.name}</span>
                                {reply.author.isModerator && <Badge variant="secondary">{t('forum_moderator')}</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground">{reply.createdAt}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{reply.text}</p>
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            <ThumbsUp className="w-4 h-4" /> 2 {t('forum_likes')}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            <Flag className="w-4 h-4" /> {t('forum_report')}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};


export default function ForumPostPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const post = forumPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
            <div className="mb-4">
                <Link href="/forum" className="text-sm text-primary hover:underline">
                    &larr; {t('forum_back_to_forum')}
                </Link>
            </div>
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold font-headline">{post.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-accent/20 text-accent">
                            {post.author.isModerator ? <Shield className="w-5 h-5" /> : <UserCircle className="w-5 h-5" />}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.author.name}</span>
                            {post.author.isModerator && <Badge variant="secondary">{t('forum_moderator')}</Badge>}
                        </div>
                        <p className="text-xs">{post.createdAt}</p>
                    </div>
                </div>
                </CardHeader>
                <CardContent>
                <p className="whitespace-pre-wrap">{post.content}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                    {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                        {tag}
                    </Badge>
                    ))}
                </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.replies} {t('forum_replies')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views} {t('forum_views')}</span>
                        </div>
                    </div>
                    <Button variant="outline">
                        <Flag className="w-4 h-4 mr-2" /> {t('forum_report_post')}
                    </Button>
                </CardFooter>
            </Card>

            <ForumReplies />

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>{t('forum_leave_reply')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder={t('forum_reply_placeholder')} className="min-h-[120px]" />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>{t('forum_post_reply')}</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
