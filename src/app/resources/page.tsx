import { resources } from '@/lib/resources';
import ResourceHub from '@/components/resources/resource-hub';

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Resource Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find guides, articles, and activities to support your well-being.
        </p>
      </div>
      <ResourceHub allResources={resources} />
    </div>
  );
}
