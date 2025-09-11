
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { assessmentResultsData } from '@/lib/admin-data';

export default function AssessmentResultsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Results Overview (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={assessmentResultsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="phq9" fill="hsl(var(--primary))" name="PHQ-9 (Depression)" />
            <Bar dataKey="gad7" fill="hsl(var(--accent))" name="GAD-7 (Anxiety)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
