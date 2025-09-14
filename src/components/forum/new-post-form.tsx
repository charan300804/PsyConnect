
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
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('forum_create_post_form_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_title')} {...field} />
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
                  <FormLabel>{t('form_content')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('form_content_placeholder')}
                      className="resize-y min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>{t('cancel_button')}</Button>
                <Button type="submit">{t('create_post_button')}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
