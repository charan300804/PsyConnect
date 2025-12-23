
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { addForumPost } from '@/lib/forum-data';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  content: z.string().min(10, { message: 'Post content must be at least 10 characters.' }),
});

export type NewPostFormValues = z.infer<typeof formSchema>;

export default function NewPostForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const router = useRouter();
  const { authState } = useAuth();
  const form = useForm<NewPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: NewPostFormValues) => {
    if (!authState.userName || !authState.userRole) {
      toast({
        title: t('toast_error_title'),
        description: "You must be logged in to create a post.",
        variant: 'destructive',
      });
      return;
    }

    try {
      await addForumPost({
        ...data,
        authorName: authState.userName,
        authorRole: authState.userRole,
      });

      toast({
        title: t('toast_post_created_title'),
        description: t('toast_post_created_description'),
      });
      router.push('/forum');
    } catch (error) {
      toast({
        title: t('toast_error_title'),
        description: "Failed to create post. Please try again later.",
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto glass border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-black/20">
      <CardHeader className="text-center pb-8 border-b border-white/10 dark:border-white/5">
        <CardTitle className="text-2xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('forum_create_post_form_title')}</CardTitle>
        <p className="text-muted-foreground mt-2 text-sm">Share your thoughts or ask for advice from the community.</p>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">{t('form_title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_title')} {...field} className="h-12 bg-white/40 border-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">{t('form_content')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('form_content_placeholder')}
                      className="resize-y min-h-[200px] bg-white/40 border-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 p-4 leading-relaxed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => router.back()} className="h-11 px-6 border-white/20 hover:bg-white/10">{t('cancel_button')}</Button>
              <Button type="submit" className="h-11 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">{t('create_post_button')}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
