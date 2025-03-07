import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function SignInLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="hidden md:inline">PaiSaiD</span>
          </Link>
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

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-6">
          <div className="space-y-2">
            <Skeleton className="mx-auto h-8 w-3/4" />
            <Skeleton className="mx-auto h-4 w-full" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>

            <Skeleton className="h-10 w-full" />

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <Skeleton className="h-px w-full" />
              </div>
              <div className="relative flex justify-center">
                <Skeleton className="h-4 w-32 bg-background" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="mx-auto h-4 w-full" />
            <Skeleton className="mx-auto h-4 w-48" />
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
