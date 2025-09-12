
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Briefcase } from 'lucide-react';
import { useTranslation } from '@/context/language-context';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold font-headline">{t('welcome_title')}</CardTitle>
          <CardDescription>{t('welcome_subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild size="lg">
            <Link href="/login/student">
              <User className="mr-2" />
              {t('login_student')}
            </Link>
          </Button>
           <Button asChild size="lg" variant="secondary">
            <Link href="/login/counselor">
              <Briefcase className="mr-2" />
              {t('login_counselor')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login/admin">
              <Shield className="mr-2" />
              {t('login_admin')}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
