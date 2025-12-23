'use client';

import TestWizard from '@/components/test/test-wizard';
import { useTranslation } from '@/context/language-context';

export default function TestPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{t('test_page_title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('test_page_subtitle')}
        </p>
      </div>
      <TestWizard />
    </div>
  );
}
