
'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ForumPost } from '@/lib/forum-data';
import ForumPostItem from '@/components/forum/forum-post-item';
import { useTranslation } from '@/context/language-context';
import { useEffect, useState } from 'react';
import { getCollection } from '@/lib/firestore-service';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';

export default function ForumPage() {
  const { t } = useTranslation();
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getCollection<any>('forumPosts', 'createdAt', 'desc');
        const formattedPosts = posts.map(post => ({
          ...post,
          id: post.id,
          createdAt: post.createdAt ? format(post.createdAt.toDate(), 'PP') : 'Date not available'
        }));
        setForumPosts(formattedPosts as ForumPost[]);
      } catch (error) {
        console.error("Failed to fetch forum posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{t('forum_page_title')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
            {t('forum_page_subtitle')}
            </p>
        </div>
        <Button asChild>
          <Link href="/forum/new">
            <Plus className="mr-2" />
            {t('forum_new_post')}
          </Link>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : forumPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{t('forum_no_posts')}</p>
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
