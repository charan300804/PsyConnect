
'use client';

import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const publicPaths = [
    '/login',
    '/login/student',
    '/login/counselor',
    '/login/admin',
    '/login/student/register',
    '/login/counselor/register',
    '/login/admin/register',
];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    if (!authState.isAuthenticated && !isPublicPath) {
      router.push('/login');
    }
  }, [authState.isAuthenticated, pathname, router]);

  return <>{children}</>;
}
