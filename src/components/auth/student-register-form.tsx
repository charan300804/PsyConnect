
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
    <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
                <UserPlus className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold font-headline">{t('student_register_title')}</CardTitle>
            <CardDescription>{t('student_register_subtitle')}</CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_full_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_full_name')} {...field} />
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
             <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_confirm_password')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('form_confirm_password')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">{t('register_button')}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
            {t('already_have_account')}{' '}
            <Link href="/login/student" className="text-primary hover:underline">
                {t('login_here_link')}
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
