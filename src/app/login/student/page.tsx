
import StudentLoginForm from '@/components/auth/student-login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StudentLoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
       <StudentLoginForm />
    </div>
  );
}
