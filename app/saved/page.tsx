'use client';
import { EmptyState } from '@/components/ui/empty';
import { Heart, MapPin } from 'lucide-react';

export default function SavedPage() {
  // This is a placeholder page to demonstrate the bottom navigation
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="container flex-1 py-8">
        <h1 className="mb-6 text-2xl font-bold">Saved Places</h1>

        <EmptyState
          title="No saved places yet"
          description="Places you save will appear here so you can easily find them later."
          icon={Heart}
          actions={[
            {
              label: 'Explore places',
              onClick: () => {},
              variant: 'default',
            },
            {
              label: 'Learn how it works',
              onClick: () => {},
              variant: 'outline',
            },
          ]}
          variant="card"
        />
      </main>

      <footer className="hidden border-t py-6 md:block md:py-8">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">TravelSpot</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} TravelSpot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
