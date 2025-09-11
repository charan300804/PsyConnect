
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
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { hasAdminAccount, createAdminAccount } from '@/lib/auth-state';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type AdminRegisterFormValues = z.infer<typeof formSchema>;

export default function AdminRegisterForm() {
    const { toast } = useToast();
    const router = useRouter();
    const isRegistered = hasAdminAccount();
    
    const form = useForm<AdminRegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        disabled: isRegistered,
    });

  const onSubmit = (data: AdminRegisterFormValues) => {
    if (isRegistered) {
        toast({
            title: 'Registration Error',
            description: 'An admin account has already been registered.',
            variant: 'destructive',
        });
        return;
    }
    
    createAdminAccount();
    console.log(data);
    toast({
      title: 'Admin Registration Successful!',
      description: 'The admin account has been created. Please log in.',
    });
    router.push('/login/admin');
  };

  return (
    <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
                <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold font-headline">Admin Registration</CardTitle>
            <CardDescription>
              {isRegistered 
                ? "An admin account has already been registered. No further registrations are allowed." 
                : "Create the single administrator account for the application."
              }
            </CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
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
             <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={isRegistered}>Register Admin</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login/admin" className="text-primary hover:underline">
                Login here
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
