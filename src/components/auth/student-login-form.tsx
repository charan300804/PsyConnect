
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { validateUser } from '@/lib/user-store';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type StudentLoginFormValues = z.infer<typeof formSchema>;

export default function StudentLoginForm() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const router = useRouter();
    const { login } = useAuth();
    const form = useForm<StudentLoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

  const onSubmit = (data: StudentLoginFormValues) => {
    const user = validateUser('student', data.email, data.password);

    if (user) {
      login('student', user.fullName);
      toast({
        title: t('toast_logged_in_title'),
        description: t('toast_student_logged_in_description'),
      });
      router.push('/test');
    } else {
        toast({
            title: t('toast_login_failed_title'),
            description: t('toast_login_failed_description'),
            variant: 'destructive',
        });
    }
  };

  return (
    <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
                <User className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold font-headline">{t('student_login_title')}</CardTitle>
            <CardDescription>{t('login_form_subtitle')}</CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('form_email')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_password')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('form_password')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">{t('login_button')}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
            {t('dont_have_account')}{' '}
            <Link href="/login/student/register" className="text-primary hover:underline">
                {t('register_here_link')}
            </Link>
        </div>
        <Button type="button" variant="link" size="sm" asChild>
            <Link href="/login">{t('back_to_login_selection')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
