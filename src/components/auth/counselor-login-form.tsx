
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
import { Briefcase } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type CounselorLoginFormValues = z.infer<typeof formSchema>;

export default function CounselorLoginForm() {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<CounselorLoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

  const onSubmit = (data: CounselorLoginFormValues) => {
    console.log(data);
    toast({
      title: 'Logged In!',
      description: 'You have successfully logged in as a counselor.',
    });
    router.push('/admin'); // Redirect to a counselor-specific dashboard in the future
  };

  return (
    <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
                <Briefcase className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold font-headline">Counselor Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">Login</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/login/counselor/register" className="text-primary hover:underline">
                Register here
            </Link>
        </div>
        <Button type="button" variant="link" size="sm" asChild>
            <Link href="/login">Back to login selection</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
