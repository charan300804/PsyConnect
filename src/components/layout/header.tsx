
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartHandshake, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/test', label: 'Test' },
    { href: '/chat', label: 'Chat' },
    { href: '/resources', label: 'Resources' },
    { href: '/booking', label: 'Booking' },
    { href: '/forum', label: 'Forum' },
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
            {navItems.map((item) => (
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
             <Link href="/login" className={cn('px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center', pathname.startsWith('/login') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground' )}>
                <LogIn className="w-4 h-4 mr-2" />
                Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
