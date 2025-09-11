
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { forumPosts } from '@/lib/forum-data';
import ForumPostItem from '@/components/forum/forum-post-item';

export default function ForumPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Student Forum</h1>
            <p className="mt-2 text-lg text-muted-foreground">
            A safe space to connect with your peers.
            </p>
        </div>
        <Button asChild>
          <Link href="/forum/new">
            <Plus className="mr-2" />
            New Post
          </Link>
        </Button>
      </div>
      
      {forumPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No posts have been made yet. Be the first to start a discussion!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {forumPosts.map((post) => (
            <ForumPostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
