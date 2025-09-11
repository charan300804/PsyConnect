import BookingForm from '@/components/booking/booking-form';

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Book an Appointment</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Schedule a confidential session with an on-campus counsellor.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}
