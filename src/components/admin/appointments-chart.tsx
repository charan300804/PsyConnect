
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { appointmentsData } from '@/lib/admin-data';

export default function AppointmentsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments Booked (Last 6 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointmentsData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" name="Appointments" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
