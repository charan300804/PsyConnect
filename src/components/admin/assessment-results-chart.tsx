
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { assessmentResultsData } from '@/lib/admin-data';
import { useTranslation } from '@/context/language-context';

export default function AssessmentResultsChart() {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('assessment_results_chart_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={assessmentResultsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="phq9" fill="hsl(var(--primary))" name={t('assessment_results_phq9')} />
            <Bar dataKey="gad7" fill="hsl(var(--accent))" name={t('assessment_results_gad7')} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
