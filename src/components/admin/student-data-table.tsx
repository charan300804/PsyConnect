
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
import { studentAssessmentData, StudentAssessmentData } from "@/lib/admin-data"
import { Badge } from "../ui/badge";
import { useTranslation } from "@/context/language-context";
  
export function StudentDataTable() {
    const { t } = useTranslation();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('student_data_table_title')}</CardTitle>
            </CardHeader>
            <CardContent>
                 {studentAssessmentData.length === 0 ? (
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
                        {studentAssessmentData.map((student: StudentAssessmentData) => (
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
