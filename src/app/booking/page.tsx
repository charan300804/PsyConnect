
'use client';

import BookingForm from '@/components/booking/booking-form';
import { useTranslation } from '@/context/language-context';

export default function BookingPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{t('booking_page_title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('booking_page_subtitle')}
        </p>
      </div>
      <BookingForm />
    </div>
  );
}
