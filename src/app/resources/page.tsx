
'use client';

import { resources } from '@/lib/resources';
import ResourceHub from '@/components/resources/resource-hub';
import { useTranslation } from '@/context/language-context';

export default function ResourcesPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{t('resources_page_title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('resources_page_subtitle')}
        </p>
      </div>
      <ResourceHub allResources={resources} />
    </div>
  );
}
