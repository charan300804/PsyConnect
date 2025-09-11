
export const assessmentResultsData = [
    { name: 'Minimal', phq9: 45, gad7: 60, fill: 'hsl(var(--chart-1))' },
    { name: 'Mild', phq9: 30, gad7: 25, fill: 'hsl(var(--chart-2))' },
    { name: 'Moderate', phq9: 15, gad7: 10, fill: 'hsl(var(--chart-3))' },
    { name: 'Mod. Severe', phq9: 8, gad7: 3, fill: 'hsl(var(--chart-4))' },
    { name: 'Severe', phq9: 2, gad7: 2, fill: 'hsl(var(--chart-5))' },
];

export const appointmentsData = [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 18 },
    { month: 'Mar', count: 25 },
    { month: 'Apr', count: 32 },
    { month: 'May', count: 28 },
    { month: 'Jun', count: 40 },
];

export const forumActivityData = [
    { name: 'Exams & Stress', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Social & Friends', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Anxiety', value: 250, fill: 'hsl(var(--chart-3))' },
    { name: 'Resources', value: 150, fill: 'hsl(var(--chart-4))' },
    { name: 'Other', value: 100, fill: 'hsl(var(--chart-5))' },
];

export type AppointmentRequest = {
    id: string;
    studentName: string;
    studentId: string;
    date: string;
    reason: string;
    status: 'Pending' | 'Confirmed' | 'Completed';
}

export const appointmentRequestsData: AppointmentRequest[] = [
    { id: '1', studentName: 'John Doe', studentId: '123456', date: '2024-07-20', reason: 'Feeling anxious about exams.', status: 'Pending' },
    { id: '2', studentName: 'Jane Smith', studentId: '654321', date: '2024-07-21', reason: 'Struggling with coursework and motivation.', status: 'Confirmed' },
    { id: '3', studentName: 'Peter Jones', studentId: '789012', date: '2024-07-22', reason: 'General well-being check-in.', status: 'Pending' },
    { id: '4', studentName: 'Emily White', studentId: '210987', date: '2024-07-18', reason: 'Follow-up session.', status: 'Completed' },
];

export type StudentAssessmentData = {
    id: string;
    studentName: string;
    studentId: string;
    school: string;
    phq9Score: number;
    gad7Score: number;
    ghq12Score: number;
    assessmentDate: string;
}

export const studentAssessmentData: StudentAssessmentData[] = [
    { id: '1', studentName: 'John Doe', studentId: '123456', school: 'Springfield University', phq9Score: 16, gad7Score: 12, ghq12Score: 20, assessmentDate: '2024-07-15' },
    { id: '2', studentName: 'Jane Smith', studentId: '654321', school: 'Springfield University', phq9Score: 8, gad7Score: 5, ghq12Score: 10, assessmentDate: '2024-07-14' },
    { id: '3', studentName: 'Peter Jones', studentId: '789012', school: 'Shelbyville College', phq9Score: 3, gad7Score: 2, ghq12Score: 5, assessmentDate: '2024-07-16' },
    { id: '4', studentName: 'Emily White', studentId: '210987', school: 'Springfield University', phq9Score: 11, gad7Score: 15, ghq12Score: 18, assessmentDate: '2024-07-12' },
];
