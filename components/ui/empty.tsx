'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SearchX, FileX, PackageX, AlertCircle, RefreshCw, type LucideIcon } from 'lucide-react';

export type EmptyStateAction = {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
};

export interface EmptyStateProps {
  /**
   * The title displayed in the empty state
   */
  title: string;
  /**
   * The description explaining why there are no results or what to do next
   */
  description?: string;
  /**
   * The icon to display. If not provided, defaults to SearchX
   */
  icon?: LucideIcon;
  /**
   * Actions the user can take (buttons)
   */
  actions?: EmptyStateAction[];
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
  /**
   * The size of the empty state component
   */
  size?: 'default' | 'sm' | 'lg';
  /**
   * Visual appearance of the empty state
   */
  variant?: 'default' | 'muted' | 'card';
}

/**
 * A component to display when there are no results from data fetching
 */
export function EmptyState({
  title,
  description,
  icon: Icon = SearchX,
  actions,
  className,
  size = 'default',
  variant = 'default',
}: EmptyStateProps) {
  // Determine icon size based on component size
  const iconSize = size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-16 w-16' : 'h-12 w-12';

  // Determine text sizes based on component size
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const descriptionSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  // Determine padding based on component size
  const padding = size === 'sm' ? 'py-6' : size === 'lg' ? 'py-16' : 'py-12';

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center px-4 text-center',
        padding,
        variant === 'card' && 'rounded-lg border bg-card',
        variant === 'muted' && 'rounded-lg bg-muted/50',
        className
      )}
    >
      <div
        className={cn(
          'mb-4 flex items-center justify-center rounded-full',
          variant === 'default' ? 'bg-muted' : 'bg-background',
          size === 'sm' ? 'p-2' : size === 'lg' ? 'p-4' : 'p-3'
        )}
      >
        <Icon className={cn(iconSize, 'text-muted-foreground')} />
      </div>

      <h3 className={cn('font-medium', titleSize, 'mb-2')}>{title}</h3>

      {description && <p className={cn(descriptionSize, 'mb-6 max-w-md text-muted-foreground')}>{description}</p>}

      {actions && actions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant={action.variant || 'default'}
              size={size === 'sm' ? 'sm' : 'default'}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Preset empty state for search results with no matches
 */
export function NoSearchResults({
  searchTerm,
  onReset,
  className,
}: {
  searchTerm: string;
  onReset: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="No results found"
      description={`We couldn't find any matches for "${searchTerm}". Try adjusting your search terms or filters.`}
      icon={SearchX}
      actions={[
        {
          label: 'Clear search',
          onClick: onReset,
          variant: 'outline',
        },
      ]}
      className={className}
    />
  );
}

/**
 * Preset empty state for when filters are too restrictive
 */
export function NoFilterResults({ onReset, className }: { onReset: () => void; className?: string }) {
  return (
    <EmptyState
      title="No matches found"
      description="We couldn't find any items matching your current filters. Try adjusting or clearing some filters."
      icon={FileX}
      actions={[
        {
          label: 'Reset filters',
          onClick: onReset,
          variant: 'outline',
        },
      ]}
      className={className}
    />
  );
}

/**
 * Preset empty state for when a collection is empty
 */
export function EmptyCollection({
  collectionName,
  actionLabel,
  onAction,
  className,
}: {
  collectionName: string;
  actionLabel: string;
  onAction: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title={`No ${collectionName} yet`}
      description={`You don't have any ${collectionName.toLowerCase()} yet. Start adding some!`}
      icon={PackageX}
      actions={[
        {
          label: actionLabel,
          onClick: onAction,
        },
      ]}
      className={className}
    />
  );
}

/**
 * Preset empty state for error conditions
 */
export function ErrorState({
  message,
  onRetry,
  className,
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="Something went wrong"
      description={message}
      icon={AlertCircle}
      actions={
        onRetry
          ? [
              {
                label: 'Try again',
                onClick: onRetry,
                variant: 'outline',
              },
            ]
          : undefined
      }
      className={className}
      variant="muted"
    />
  );
}

/**
 * Preset empty state for when data is loading but returns empty
 */
export function DataUnavailable({
  message = 'The requested data is currently unavailable. Please try again later.',
  onRefresh,
  className,
}: {
  message?: string;
  onRefresh?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      title="No data available"
      description={message}
      icon={RefreshCw}
      actions={
        onRefresh
          ? [
              {
                label: 'Refresh',
                onClick: onRefresh,
                variant: 'outline',
              },
            ]
          : undefined
      }
      className={className}
    />
  );
}
