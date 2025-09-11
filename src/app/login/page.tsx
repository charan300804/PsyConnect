
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold font-headline">Welcome to EmotiCare</CardTitle>
          <CardDescription>Please select your login type.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild size="lg">
            <Link href="/login/student">
              <User className="mr-2" />
              Login as Student
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login/admin">
              <Shield className="mr-2" />
              Login as Admin
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
