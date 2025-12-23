
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getRegisteredCounselors, Counselor } from '@/lib/counselor-data';
import { addAppointmentRequest } from '@/lib/admin-data';
import { useTranslation } from '@/context/language-context';
import { useState, useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  studentId: z.string().min(1, { message: 'Student ID is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  counselorId: z.string({ required_error: 'Please select a counselor.' }),
  date: z.date({
    required_error: "A date for the appointment is required.",
  }),
  reason: z.string().min(10, { message: 'Please provide a brief reason for your visit (at least 10 characters).' }),
});

export type BookingFormValues = z.infer<typeof formSchema>;

export default function BookingForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const hasCounselors = counselors.length > 0;

  useEffect(() => {
    // Fetch counselors on the client side since they are stored in localStorage
    setCounselors(getRegisteredCounselors());
  }, []);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      studentId: '',
      email: '',
      counselorId: undefined,
      reason: '',
    },
    disabled: !hasCounselors,
  });

  const onSubmit = async (data: BookingFormValues) => {
    const selectedCounselor = counselors.find(c => c.id === data.counselorId);

    if (!selectedCounselor) {
      toast({
        title: t('toast_error_title'),
        description: t('toast_counselor_not_found_description'),
        variant: 'destructive',
      });
      return;
    }

    try {
      await addAppointmentRequest({
        studentName: data.name,
        studentId: data.studentId,
        date: format(data.date, 'yyyy-MM-dd'),
        reason: data.reason,
        counselor: selectedCounselor,
      });

      toast({
        title: t('toast_appointment_booked_title'),
        description: t('toast_appointment_booked_description', { date: format(data.date, 'PPP') }),
      });
      form.reset();
    } catch (error) {
      toast({
        title: t('toast_error_title'),
        description: "Failed to book appointment. Please try again later.",
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto glass border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-black/20">
      <CardHeader className="text-center pb-8 border-b border-white/10 dark:border-white/5">
        <CardTitle className="text-3xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('booking_form_title')}</CardTitle>
        <p className="text-muted-foreground mt-2">Schedule a session with our professional counselors.</p>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">{t('form_email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('form_email')} {...field} className="h-12 bg-white/40 border-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="counselorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 font-medium">{t('form_select_counselor')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!hasCounselors}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/40 border-white/20 focus:border-primary/50 focus:ring-primary/20">
                          <SelectValue placeholder={hasCounselors ? t('form_select_counselor_placeholder') : t('no_counselors_registered')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hasCounselors ? (
                          counselors.map(counselor => (
                            <SelectItem key={counselor.id} value={counselor.id}>{counselor.name}</SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground text-center">
                            No counselors available
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    {!hasCounselors && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-md">
                        ⚠️ {t('no_counselors_registered')}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-foreground/80 font-medium">{t('form_preferred_date')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left font-normal bg-white/40 border-white/20 hover:bg-white/60",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t('form_pick_date')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">{t('form_reason_for_appointment')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('form_reason_placeholder')}
                      className="resize-none min-h-[120px] bg-white/40 border-white/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!hasCounselors} className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 mt-4">
              {t('book_appointment_button')}
            </Button>
          </form>
        </Form>
      </CardContent>
      {!hasCounselors && (
        <div className="bg-amber-100/50 dark:bg-amber-900/20 p-4 text-center text-sm text-amber-800 dark:text-amber-200 border-t border-amber-200/50 dark:border-amber-800/50 rounded-b-xl">
          <p>Testing Mode: Please <a href="/login/counselor/register" className="underline font-bold hover:text-amber-900">register a counselor</a> account first to enable booking.</p>
        </div>
      )}
    </Card >
  );
}
