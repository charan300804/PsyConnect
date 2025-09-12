
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartHandshake, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSelector from './language-selector';
import { useTranslation } from '@/context/language-context';

export function Header() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { href: '/test', label: t('nav_test') },
    { href: '/chat', label: t('nav_chat') },
    { href: '/resources', label: t('nav_resources') },
    { href: '/booking', label: t('nav_booking') },
    { href: '/forum', label: t('nav_forum') },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <HeartHandshake className="w-7 h-7" />
              <span className="text-xl font-bold text-foreground">
                EmotiCare
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {isClient && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
             <div className="border-l h-6 mx-2"></div>
            {isClient && (
              <>
                <LanguageSelector />
                <Link href="/login" className={cn('px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center', pathname.startsWith('/login') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground' )}>
                    <LogIn className="w-4 h-4 mr-2" />
                    {t('nav_login')}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
