
'use client';

import CounselorAppointmentsTable from '@/components/counselor/counselor-appointments-table';
import { StudentDataTable } from '@/components/admin/student-data-table';
import { getRegisteredCounselors, Counselor } from '@/lib/counselor-data';
import { useTranslation } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';

export default function CounselorDashboardPage() {
  const { t } = useTranslation();
  const { authState } = useAuth();
  const [loggedInCounselor, setLoggedInCounselor] = useState<Counselor | null>(null);
  const [counselorsExist, setCounselorsExist] = useState(true);

  useEffect(() => {
    // In a real application, you'd get the logged-in user's info more securely.
    // For this prototype, we find the counselor from the list stored on the client.
    const counselors = getRegisteredCounselors();
    if (counselors.length === 0) {
      setCounselorsExist(false);
    }
    
    if (authState.userRole === 'counselor' && authState.userName) {
        // The 'id' for a counselor is their email address.
        const counselor = counselors.find(c => c.name === authState.userName);
        setLoggedInCounselor(counselor || null);
    }
  }, [authState]);


  if (!counselorsExist) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{t('counselor_dashboard_title')}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('no_counselors_registered')}
          </p>
        </div>
      </div>
    );
  }

  if (!loggedInCounselor) {
     return (
       <div className="container mx-auto flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
          <p>{t('loading_counselor_data') || 'Loading counselor data...'}</p>
       </div>
     )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{t('counselor_dashboard_title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('counselor_dashboard_welcome', { name: loggedInCounselor.name })}
        </p>
      </div>

      <div className="space-y-8">
        <CounselorAppointmentsTable counselorId={loggedInCounselor.id} />
        <StudentDataTable />
      </div>
    </div>
  );
}
