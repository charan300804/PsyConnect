
import CounselorAppointmentsTable from '@/components/counselor/counselor-appointments-table';
import { StudentDataTable } from '@/components/admin/student-data-table';
import { registeredCounselors } from '@/lib/counselor-data';

// This is a placeholder for the logged-in counselor. 
// In a real application, this would come from an authentication context.
const loggedInCounselor = registeredCounselors.length > 0 ? registeredCounselors[0] : null;

export default function CounselorDashboardPage() {
  if (!loggedInCounselor) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">Counselor Dashboard</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            No counselors are currently registered in the system. Please register a counselor to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Counselor Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome, {loggedInCounselor.name}. Here are your appointments and student data.
        </p>
      </div>

      <div className="space-y-8">
        <CounselorAppointmentsTable counselorId={loggedInCounselor.id} />
        <StudentDataTable />
      </div>
    </div>
  );
}
