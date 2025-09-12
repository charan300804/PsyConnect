
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HeartHandshake, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSelector from './language-selector';
import { useTranslation } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { Button } from '../ui/button';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();
  const { authState, logout } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/test', label: t('nav_test'), roles: ['student'] },
    { href: '/chat', label: t('nav_chat'), roles: ['student'] },
    { href: '/resources', label: t('nav_resources'), roles: ['student'] },
    { href: '/booking', label: t('nav_booking'), roles: ['student'] },
    { href: '/forum', label: t('nav_forum'), roles: ['student', 'counselor', 'admin'] },
    { href: '/admin', label: t('nav_admin'), roles: ['admin'] },
    { href: '/counselor', label: t('nav_counselor'), roles: ['counselor'] },
  ];

  const filteredNavItems = navItems.filter(item => authState.userRole && item.roles.includes(authState.userRole));

  const isLoginPage = pathname.startsWith('/login');

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
            {isClient && authState.isAuthenticated && filteredNavItems.map((item) => (
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
                {authState.isAuthenticated ? (
                  <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav_logout')}
                  </Button>
                ) : (
                  <Link href="/login" className={cn('px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center', isLoginPage ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground' )}>
                      <LogIn className="w-4 h-4 mr-2" />
                      {t('nav_login')}
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
