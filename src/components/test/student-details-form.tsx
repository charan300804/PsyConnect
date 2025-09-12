
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTranslation } from '@/context/language-context';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  studentId: z.string().min(1, { message: 'Student ID is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  age: z.coerce.number().min(1, { message: 'Age is required.' }).max(120),
  gender: z.string().min(1, { message: 'Please select a gender.' }),
  school: z.string().min(2, { message: 'School name must be at least 2 characters.' }),
});

export type StudentDetailsFormValues = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: StudentDetailsFormValues) => void;
};

export default function StudentDetailsForm({ onSubmit }: Props) {
  const { t } = useTranslation();
  const form = useForm<StudentDetailsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      studentId: '',
      email: '',
      age: '' as any,
      gender: '',
      school: '',
    },
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('student_details_form_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
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
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_student_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_student_id')} {...field} />
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
                    <Input placeholder={t('form_email')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t('form_age')}</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder={t('form_age')} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t('form_gender')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={t('form_gender_placeholder')} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="male">{t('gender_male')}</SelectItem>
                        <SelectItem value="female">{t('gender_female')}</SelectItem>
                        <SelectItem value="other">{t('gender_other')}</SelectItem>
                        <SelectItem value="prefer-not-to-say">{t('gender_prefer_not_to_say')}</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form_school')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_school')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t('start_test_button')}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
