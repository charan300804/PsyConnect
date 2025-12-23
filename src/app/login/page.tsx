
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Briefcase } from 'lucide-react';
import { useTranslation } from '@/context/language-context';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-slate-900 animate-gradient-xy">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md glass border-white/40 dark:border-white/10 relative z-10 shadow-xl backdrop-blur-md">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg mb-4 transform transition-transform hover:scale-105">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t('welcome_title')}
          </CardTitle>
          <CardDescription className="text-lg">
            {t('welcome_subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-6 pt-0">
          <Button asChild size="lg" className="h-14 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 group">
            <Link href="/login/student" className="flex items-center justify-center">
              <User className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('login_student')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-14 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 bg-teal-500 hover:bg-teal-600 text-white border-none group">
            <Link href="/login/counselor" className="flex items-center justify-center">
              <Briefcase className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('login_counselor')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 text-lg font-medium hover:bg-secondary/5 transition-all duration-300 border-2 group">
            <Link href="/login/admin" className="flex items-center justify-center">
              <Shield className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('login_admin')}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
