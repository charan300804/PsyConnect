
'use client';

import AssessmentResultsChart from '@/components/admin/assessment-results-chart';
import AppointmentsChart from '@/components/admin/appointments-chart';
import ForumActivityChart from '@/components/admin/forum-activity-chart';
import { AppointmentsTable } from '@/components/admin/appointments-table';
import { StudentDataTable } from '@/components/admin/student-data-table';
import { useTranslation } from '@/context/language-context';
import SentimentTrendsChart from '@/components/admin/sentiment-trends-chart';

export default function AdminPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{t('admin_dashboard_title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('admin_dashboard_subtitle')}
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <SentimentTrendsChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AssessmentResultsChart />
          <AppointmentsChart />
          <div className="lg:col-span-2">
            <ForumActivityChart />
          </div>
        </div>

        <AppointmentsTable />
        <StudentDataTable />
      </div>
    </div>
  );
}
