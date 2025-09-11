
import { forumPosts } from '@/lib/forum-data';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserCircle, Shield, MessageSquare, Eye, Flag, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

// This is a dummy component for replies. In a real app, this would be more complex.
const ForumReplies = () => {
    const replies = [
        { id: 1, author: { name: 'Chris P.', isModerator: false }, text: "I feel the same way! I've been trying the Pomodoro technique, it helps a bit.", createdAt: '2 days ago' },
        { id: 2, author: { name: 'Samantha R.', isModerator: false }, text: "Make sure you're getting enough sleep and eating well. It makes a huge difference for me.", createdAt: '2 days ago' },
        { id: 3, author: { name: 'Chloe M.', isModerator: true }, text: "These are all great suggestions. Remember to take short breaks and do something you enjoy. If it gets too much, the university counselling service is available. You can book an appointment through the app.", createdAt: '1 day ago' },
    ];

    return (
        <div className="space-y-6 mt-8">
            <h3 className="text-xl font-bold">Replies</h3>
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
                                {reply.author.isModerator && <Badge variant="secondary">Moderator</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground">{reply.createdAt}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{reply.text}</p>
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            <ThumbsUp className="w-4 h-4" /> 2 Likes
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                            <Flag className="w-4 h-4" /> Report
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};


export default function ForumPostPage({ params }: { params: { id: string } }) {
  const post = forumPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
            <div className="mb-4">
                <Link href="/forum" className="text-sm text-primary hover:underline">
                    &larr; Back to Forum
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
                            {post.author.isModerator && <Badge variant="secondary">Moderator</Badge>}
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
                            <span>{post.replies} Replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views} Views</span>
                        </div>
                    </div>
                    <Button variant="outline">
                        <Flag className="w-4 h-4 mr-2" /> Report Post
                    </Button>
                </CardFooter>
            </Card>

            <ForumReplies />

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Leave a Reply</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Share your thoughts or offer support..." className="min-h-[120px]" />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Post Reply</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
