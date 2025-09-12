
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-context';
import { AuthProvider } from '@/context/auth-context';
import RouteGuard from '@/components/auth/route-guard';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'EmotiCare',
  description: 'Your friendly AI for psychological first-aid.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          'flex flex-col'
        )}
      >
        <LanguageProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1 flex flex-col">
              <RouteGuard>{children}</RouteGuard>
            </main>
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
