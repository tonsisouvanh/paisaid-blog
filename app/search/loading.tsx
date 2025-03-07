import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Star, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="hidden md:inline">PaiSaiD</span>
            </Link>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
          </nav>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 md:py-10">
        {/* Page Title Skeleton */}
        <div className="mb-8">
          <Skeleton className="mb-2 h-10 w-64" />
          <Skeleton className="h-5 w-full max-w-md" />
        </div>

        {/* Search and Filter Bar Skeleton */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 flex-1" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-36" />
            <div className="hidden rounded-md border md:flex">
              <Button variant="ghost" size="icon" className="rounded-none rounded-l-md" disabled>
                <Grid className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-none rounded-r-md" disabled>
                <List className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Content Skeleton - Grid of Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="overflow-hidden rounded-lg border">
                <Skeleton className="h-48 w-full" />
                <div className="space-y-3 p-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">PaiSaiD</span>
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </footer>
    </div>
  );
}
