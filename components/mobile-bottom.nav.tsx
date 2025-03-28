'use client';

import type React from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Home, Search, Compass, Heart, User } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  exact?: boolean;
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Home',
      icon: <Home className="h-6 w-6" />,
      activeIcon: <Home className="h-6 w-6 fill-primary text-primary" />,
      exact: true,
    },
    {
      href: '/search',
      label: 'Search',
      icon: <Search className="h-6 w-6" />,
      activeIcon: <Search className="h-6 w-6 fill-primary text-primary" />,
    },
    {
      href: '/explore',
      label: 'Explore',
      icon: <Compass className="h-6 w-6" />,
      activeIcon: <Compass className="h-6 w-6 fill-primary text-primary" />,
    },
    {
      href: '/saved',
      label: 'Saved',
      icon: <Heart className="h-6 w-6" />,
      activeIcon: <Heart className="h-6 w-6 fill-primary text-primary" />,
    },
    {
      href: '/account',
      label: 'Account',
      icon: <User className="h-6 w-6" />,
      activeIcon: <User className="h-6 w-6 fill-primary text-primary" />,
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background px-4 py-2 md:hidden">
      <nav className="flex items-center justify-between">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center rounded-md px-2 py-1 transition-colors',
              isActive(item) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
            aria-current={isActive(item) ? 'page' : undefined}
          >
            <div className="mb-1 h-6 w-6">{isActive(item) ? item.activeIcon : item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Safe area spacing for modern mobile devices */}
      <div className="h-safe-area-bottom" />
    </div>
  );
}
