
import AssessmentResultsChart from '@/components/admin/assessment-results-chart';
import AppointmentsChart from '@/components/admin/appointments-chart';
import ForumActivityChart from '@/components/admin/forum-activity-chart';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Anonymous analytics for monitoring student well-being trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AssessmentResultsChart />
        <AppointmentsChart />
        <div className="lg:col-span-2">
            <ForumActivityChart />
        </div>
      </div>
    </div>
  );
}
