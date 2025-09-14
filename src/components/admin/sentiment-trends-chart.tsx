
'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { sentimentData, SentimentDataPoint } from '@/lib/admin-data';
import { useTranslation } from '@/context/language-context';
import { subDays, format, startOfDay } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type AggregatedSentiment = {
    date: string;
    positive: number;
    negative: number;
    neutral: number;
};

export default function SentimentTrendsChart() {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('7'); // Default to last 7 days

  const aggregatedData = useMemo(() => {
    const now = new Date();
    const startDate = subDays(now, parseInt(timeRange));
    
    const filteredData = sentimentData.filter(d => d.date >= startDate);

    const dailyCounts: Record<string, { positive: number; negative: number; neutral: number }> = {};

    filteredData.forEach(item => {
      const day = format(item.date, 'yyyy-MM-dd');
      if (!dailyCounts[day]) {
        dailyCounts[day] = { positive: 0, negative: 0, neutral: 0 };
      }
      dailyCounts[day][item.sentiment]++;
    });

    // Ensure all days in the range are present, even if they have no data
    for (let i = 0; i < parseInt(timeRange); i++) {
        const date = format(subDays(now, i), 'yyyy-MM-dd');
        if (!dailyCounts[date]) {
            dailyCounts[date] = { positive: 0, negative: 0, neutral: 0 };
        }
    }

    return Object.keys(dailyCounts)
      .map(date => ({
        date: format(new Date(date), 'MMM d'),
        ...dailyCounts[date],
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [timeRange]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>{t('sentiment_trends_chart_title')}</CardTitle>
                <CardDescription>{t('sentiment_trends_chart_subtitle')}</CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7">{t('last_7_days')}</SelectItem>
                    <SelectItem value="30">{t('last_30_days')}</SelectItem>
                    <SelectItem value="90">{t('last_90_days')}</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        {aggregatedData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                    }}
                />
                <Legend />
                <Bar dataKey="positive" stackId="a" fill="hsl(var(--primary))" name={t('sentiment_positive')} />
                <Bar dataKey="neutral" stackId="a" fill="hsl(var(--secondary-foreground))" name={t('sentiment_neutral')} />
                <Bar dataKey="negative" stackId="a" fill="hsl(var(--destructive))" name={t('sentiment_negative')} />
            </BarChart>
            </ResponsiveContainer>
        ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <p>{t('sentiment_trends_no_data')}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
