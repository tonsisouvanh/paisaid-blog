import type React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

export function DynamicBreadcrumb({
  items,
  className,
  separator = <ChevronRight className="mx-1 h-4 w-4 flex-shrink-0" />,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center py-5 text-sm', className)}>
      <ol className="flex flex-wrap items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className={cn('flex items-center', isLast ? 'font-medium text-foreground' : 'text-muted-foreground')}
              aria-current={isLast ? 'page' : undefined}
            >
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}

              {!isLast && <span className="flex items-center">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
