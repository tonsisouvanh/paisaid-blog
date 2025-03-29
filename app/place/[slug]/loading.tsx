import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PlaceLoading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-12">
        {/* Breadcrumb */}
        <div className="container px-4 py-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link href="/explore" className="hover:text-foreground">
              Explore
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Skeleton className="h-4 w-20" />
            <ChevronRight className="mx-1 h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Image Gallery Skeleton */}
        <section className="container mb-6 px-4">
          <div className="grid h-[300px] grid-cols-1 gap-2 md:h-[400px] md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="col-span-1 row-span-2 rounded-lg md:col-span-1 lg:col-span-2" />
            <Skeleton className="hidden rounded-lg md:block" />
            <Skeleton className="hidden rounded-lg md:block" />
            <Skeleton className="hidden rounded-lg md:block" />
            <Skeleton className="hidden rounded-lg md:block" />
          </div>
        </section>

        {/* Place Header Skeleton */}
        <section className="container mb-8 px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="mb-2 h-9 w-64" />
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-muted" />
                  <Skeleton className="ml-1 h-5 w-12" />
                </div>
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="mb-4 flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-32 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-28 rounded-full" />
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row md:mt-0">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </section>

        {/* Main Content Skeleton */}
        <section className="container px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex border-b">
                  <Skeleton className="mx-2 h-10 w-20" />
                  <Skeleton className="mx-2 h-10 w-20" />
                  <Skeleton className="mx-2 h-10 w-20" />
                  <Skeleton className="mx-2 h-10 w-20" />
                </div>
              </div>

              <div className="space-y-6">
                <Skeleton className="h-[300px] rounded-lg" />
                <Skeleton className="h-[200px] rounded-lg" />
              </div>
            </div>

            {/* Right Column - Info */}
            <div>
              <div className="space-y-6">
                <Skeleton className="h-[400px] rounded-lg" />
                <Skeleton className="h-[300px] rounded-lg" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">TravelSpot</span>
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </footer>
    </div>
  );
}
