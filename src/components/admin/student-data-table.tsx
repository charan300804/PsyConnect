
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
import { StudentAssessmentData } from "@/lib/admin-data"
import { Badge } from "../ui/badge";
import { useTranslation } from "@/context/language-context";
import { useEffect, useState } from "react";
import { getCollection } from "@/lib/firestore-service";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
  
export function StudentDataTable() {
    const { t } = useTranslation();
    const [assessments, setAssessments] = useState<StudentAssessmentData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAssessments() {
            try {
                const data = await getCollection<any>('studentAssessments');
                const formattedData = data.map(item => ({
                    ...item,
                    assessmentDate: format(new Date(item.assessmentDate), 'yyyy-MM-dd')
                }));
                setAssessments(formattedData);
            } catch (error) {
                console.error("Failed to fetch student assessments:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAssessments();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('student_data_table_title')}</CardTitle>
            </CardHeader>
            <CardContent>
                 {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                 ) : assessments.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        {t('student_data_table_no_data')}
                    </div>
                 ) : (
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>{t('table_student_name')}</TableHead>
                            <TableHead>{t('table_student_id')}</TableHead>
                            <TableHead>{t('table_school')}</TableHead>
                            <TableHead>{t('table_assessment_date')}</TableHead>
                            <TableHead>PHQ-9</TableHead>
                            <TableHead>GAD-7</TableHead>
                            <TableHead>GHQ-12</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {assessments.map((student: StudentAssessmentData) => (
                            <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.studentName}</TableCell>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.school}</TableCell>
                            <TableCell>{student.assessmentDate}</TableCell>
                            <TableCell>
                                <Badge variant={student.phq9Score >= 10 ? 'destructive' : 'secondary'}>
                                    {student.phq9Score}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={student.gad7Score >= 10 ? 'destructive' : 'secondary'}>
                                    {student.gad7Score}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">
                                    {student.ghq12Score}
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
