
import { Counselor, registeredCounselors } from "./counselor-data";

export const assessmentResultsData: { name: string; phq9: number; gad7: number; fill: string; }[] = [];

export const appointmentsData: { month: string; count: number; }[] = [];

export const forumActivityData: { name: string; value: number; fill: string; }[] = [];

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
