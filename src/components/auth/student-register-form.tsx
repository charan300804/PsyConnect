
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
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';
import { addUser } from '@/lib/user-store';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type StudentRegisterFormValues = z.infer<typeof formSchema>;

export default function StudentRegisterForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<StudentRegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: StudentRegisterFormValues) => {
    const success = addUser('student', data);
    if (success) {
      toast({
        title: t('toast_registration_success_title'),
        description: t('toast_registration_success_description'),
      });
      router.push('/login/student');
    } else {
      toast({
        title: t('toast_registration_error_title'),
        description: t('toast_user_already_exists_description'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full glass border-white/40 dark:border-white/10 shadow-2xl backdrop-blur-md">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold font-headline">{t('student_register_title')}</CardTitle>
        <CardDescription className="text-base">{t('student_register_subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{t('form_full_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_full_name')} {...field} className="h-11 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{t('form_email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('form_email')} {...field} className="h-11 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200" />
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
                  <FormLabel className="text-foreground/80">{t('form_password')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('form_password')} {...field} className="h-11 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{t('form_confirm_password')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('form_confirm_password')} {...field} className="h-11 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button type="submit" className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">{t('register_button')}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 bg-muted/30 p-6 rounded-b-xl border-t border-gray-100 dark:border-gray-800">
        <div className="text-center text-sm text-muted-foreground">
          {t('already_have_account')}{' '}
          <Link href="/login/student" className="text-primary font-medium hover:underline decoration-2 underline-offset-4">
            {t('login_here_link')}
          </Link>
        </div>
        <Button type="button" variant="ghost" size="sm" asChild className="hover:bg-transparent hover:text-primary transition-colors">
          <Link href="/">{t('back_to_login_selection')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
