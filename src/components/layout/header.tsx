
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HeartHandshake, LogIn, LogOut, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSelector from './language-selector';
import { useTranslation } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const { authState, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
    setMobileMenuOpen(false);
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

  const renderNavLinks = (isMobile = false) => (
    <>
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
             isMobile && 'w-full text-left',
            pathname === item.href
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {authState.isAuthenticated && renderNavLinks()}
            <div className="border-l h-6 mx-2"></div>
            <LanguageSelector />
            {authState.isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                <LogOut className="w-4 h-4 mr-2" />
                {t('nav_logout')}
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild className={cn(isLoginPage && 'bg-primary/10 text-primary')}>
                <Link href="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('nav_login')}
                </Link>
              </Button>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
             <LanguageSelector />
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PanelLeft />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="p-4">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-primary mb-6">
                    <HeartHandshake className="w-7 h-7" />
                    <span className="text-xl font-bold text-foreground">
                      EmotiCare
                    </span>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    {authState.isAuthenticated ? (
                      <>
                        {renderNavLinks(true)}
                        <div className="border-t my-2"></div>
                        <Button variant="ghost" onClick={handleLogout} className="justify-start">
                          <LogOut className="mr-2" />
                          {t('nav_logout')}
                        </Button>
                      </>
                    ) : (
                      <Button asChild variant={isLoginPage ? 'secondary' : 'ghost'} onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/login" className="justify-start">
                          <LogIn className="mr-2" />
                          {t('nav_login')}
                        </Link>
                      </Button>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
