import Link from 'next/link';
import { MapPin, Search, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 items-center justify-center">
        <div className="container px-4 py-16 text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-6 flex justify-center">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-16 w-16 text-primary" />
                </div>
                <div className="absolute right-0 top-0 rounded-full bg-muted p-2">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight">Page Not Found</h1>
            <p className="mb-8 text-muted-foreground">
              Oops! It seems like you&apos;ve ventured off the map. The page you&apos;re looking for doesn&apos;t exist
              or has been moved.
            </p>

            <div className="mb-8">
              <div className="relative mx-auto max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search for places..." className="w-full py-2 pl-9 pr-4" />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Link>
              </Button>
              <Button asChild className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Return Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/explore">Explore Places</Link>
              </Button>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
              <p>
                If you believe this is an error, please{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  contact our support team
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
