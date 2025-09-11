
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
import { Shield } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type AdminLoginFormValues = z.infer<typeof formSchema>;

export default function AdminLoginForm() {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<AdminLoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

  const onSubmit = (data: AdminLoginFormValues) => {
    console.log(data);
    toast({
      title: 'Admin Logged In!',
      description: 'You have successfully logged in as an admin.',
    });
    router.push('/admin');
  };

  return (
    <Card className="w-full max-w-md">
        <CardHeader className="text-center">
             <div className="flex justify-center mb-2">
                <Shield className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold font-headline">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
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
       <CardFooter className="flex flex-col gap-4 text-center">
        <p className="text-xs text-muted-foreground">
            Admin accounts are created by invitation only. Public registration is not available.
        </p>
        <Button type="button" variant="link" size="sm" asChild>
            <Link href="/login">Back to login selection</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
