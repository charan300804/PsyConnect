
import { Counselor } from "./counselor-data";

export const assessmentResultsData: { name: string; phq9: number; gad7: number; fill: string; }[] = [];

export const appointmentsData: { month: string; count: number; }[] = [];

export const forumActivityData: { name: string; value: number; fill: string; }[] = [];

export type SentimentDataPoint = {
    sentiment: 'positive' | 'negative' | 'neutral';
    severity: 'low' | 'medium' | 'high';
    date: Date;
};

// Store anonymous sentiment data. In a real app, this would be a database.
export const sentimentData: SentimentDataPoint[] = [
    // Pre-populating with some sample data for demonstration
    { sentiment: 'positive', severity: 'low', date: new Date('2024-07-20T10:00:00Z') },
    { sentiment: 'neutral', severity: 'low', date: new Date('2024-07-20T12:30:00Z') },
    { sentiment: 'negative', severity: 'medium', date: new Date('2024-07-21T15:00:00Z') },
    { sentiment: 'negative', severity: 'high', date: new Date('2024-07-21T18:45:00Z') },
    { sentiment: 'positive', severity: 'low', date: new Date('2024-07-22T09:00:00Z') },
    { sentiment: 'neutral', severity: 'low', date: new Date('2024-07-23T11:00:00Z') },
    { sentiment: 'negative', severity: 'low', date: new Date('2024-07-24T14:20:00Z') },
    { sentiment: 'positive', severity: 'medium', date: new Date('2024-07-24T16:00:00Z') },
];

export function addSentimentData(data: Omit<SentimentDataPoint, 'date'>) {
    sentimentData.push({ ...data, date: new Date() });
}

export type AppointmentRequest = {
    id: string;
    studentName: string;
    studentId: string;
    date: string;
    reason: string;
    status: 'Pending' | 'Confirmed' | 'Completed';
    counselor: Counselor;
}

export const appointmentRequestsData: AppointmentRequest[] = [];

export function addAppointmentRequest(request: Omit<AppointmentRequest, 'id' | 'status'>) {
    const newRequest: AppointmentRequest = {
        ...request,
        id: `apt-${Date.now()}`,
        status: 'Pending',
    };
    appointmentRequestsData.push(newRequest);
}


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

export const studentAssessmentData: StudentAssessmentData[] = [];

// Function to add new student data
export function addStudentAssessmentData(data: StudentAssessmentData) {
    studentAssessmentData.push(data);
}
