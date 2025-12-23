'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useTranslation } from '@/context/language-context';

const studentDetailsSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  studentId: z.string().min(1, { message: 'Student ID is required.' }),
  school: z.string().min(2, { message: 'School name is required.' }),
});

export type StudentDetailsFormValues = z.infer<typeof studentDetailsSchema>;

interface StudentDetailsFormProps {
  onSubmit: (data: StudentDetailsFormValues) => void;
}

export default function StudentDetailsForm({ onSubmit }: StudentDetailsFormProps) {
  const { t } = useTranslation();
  const form = useForm<StudentDetailsFormValues>({
    resolver: zodResolver(studentDetailsSchema),
    defaultValues: {
      name: '',
      studentId: '',
      school: '',
    },
  });

  return (
    <Card className="max-w-xl mx-auto glass border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-black/20">
      <CardHeader className="text-center pb-8 border-b border-white/10 dark:border-white/5">
        <CardTitle className="text-2xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">{t('student_details_title')}</CardTitle>
        <CardDescription className="text-base text-muted-foreground/80">{t('student_details_subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">{t('form_full_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_full_name')} {...field} className="h-12 bg-white/40 border-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">{t('form_student_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_student_id')} {...field} className="h-12 bg-white/40 border-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">{t('form_school')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_school')} {...field} className="h-12 bg-white/40 border-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 mt-2">{t('next_button')}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
