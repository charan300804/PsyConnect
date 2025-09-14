
import { addDocument } from './firestore-service';
import type { Counselor } from "./counselor-data";

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

// This is now a wrapper around the Firestore service
export async function addAppointmentRequest(request: Omit<AppointmentRequest, 'id' | 'status'>) {
    const newRequest = {
        ...request,
        status: 'Pending',
    };
    return await addDocument('appointmentRequests', newRequest);
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


// This is now a wrapper around the Firestore service
export async function addStudentAssessmentData(data: Omit<StudentAssessmentData, 'id'>) {
    return await addDocument('studentAssessments', data);
}

