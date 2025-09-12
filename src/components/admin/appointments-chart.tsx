
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { appointmentsData } from '@/lib/admin-data';
import { useTranslation } from '@/context/language-context';

export default function AppointmentsChart() {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('appointments_chart_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointmentsData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" name={t('appointments_chart_legend')} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
