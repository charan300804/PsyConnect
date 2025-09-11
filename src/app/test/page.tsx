
import TestWizard from '@/components/test/test-wizard';

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Well-Being Assessment</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Complete the following steps to help us understand your well-being.
        </p>
      </div>
      <TestWizard />
    </div>
  );
}
