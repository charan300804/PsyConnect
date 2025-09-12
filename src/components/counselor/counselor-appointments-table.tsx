
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
import { appointmentRequestsData, AppointmentRequest } from "@/lib/admin-data"
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/language-context";

type CounselorAppointmentsTableProps = {
    counselorId: string;
};
  
export default function CounselorAppointmentsTable({ counselorId }: CounselorAppointmentsTableProps) {
    const { t } = useTranslation();
    const filteredAppointments = appointmentRequestsData.filter(
        (request) => request.counselor.id === counselorId
    );
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('counselor_appointments_table_title')}</CardTitle>
            </CardHeader>
            <CardContent>
                {filteredAppointments.length === 0 ? (
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
