
'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { AppointmentRequest } from "@/lib/admin-data"
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/language-context";
import { useEffect, useState } from "react";
import { getCollectionWhere } from "@/lib/firestore-service";
import { Skeleton } from "../ui/skeleton";

type CounselorAppointmentsTableProps = {
    counselorId: string;
};
  
export default function CounselorAppointmentsTable({ counselorId }: CounselorAppointmentsTableProps) {
    const { t } = useTranslation();
    const [filteredAppointments, setFilteredAppointments] = useState<AppointmentRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAppointments() {
            if (!counselorId) return;
            try {
                const data = await getCollectionWhere<AppointmentRequest>('appointmentRequests', 'counselor.id', '==', counselorId);
                setFilteredAppointments(data);
            } catch (error) {
                console.error("Failed to fetch counselor appointments:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAppointments();
    }, [counselorId]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('counselor_appointments_table_title')}</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : filteredAppointments.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        {t('counselor_appointments_table_no_requests')}
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>{t('table_student_name')}</TableHead>
                            <TableHead>{t('table_student_id')}</TableHead>
                            <TableHead>{t('table_requested_date')}</TableHead>
                            <TableHead>{t('table_reason')}</TableHead>
                            <TableHead>{t('table_status')}</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {filteredAppointments.map((request: AppointmentRequest) => (
                            <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.studentName}</TableCell>
                            <TableCell>{request.studentId}</TableCell>
                            <TableCell>{request.date}</TableCell>
                            <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                            <TableCell>
                                <Badge
                                className={cn({
                                    'bg-yellow-400 text-yellow-900': request.status === 'Pending',
                                    'bg-green-400 text-green-900': request.status === 'Confirmed',
                                    'bg-gray-400 text-gray-900': request.status === 'Completed',
                                })}
                                >
                                {t(`status_${request.status.toLowerCase()}`)}
                                </Badge>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}
