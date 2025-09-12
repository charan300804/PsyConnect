
'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { forumPosts } from '@/lib/forum-data';
import ForumPostItem from '@/components/forum/forum-post-item';
import { useTranslation } from '@/context/language-context';

export default function ForumPage() {
  const { t } = useTranslation();
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
      
      {forumPosts.length === 0 ? (
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
