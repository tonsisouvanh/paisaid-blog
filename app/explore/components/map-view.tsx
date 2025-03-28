'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPriceSymbol } from '@/lib/utils';
import { PostType } from '@/hooks/use-post';

interface MapViewProps {
  places: PostType[];
}

export default function MapView({ places }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<PostType | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // This is a placeholder for actual map implementation
  // In a real app, you would use a library like Mapbox, Google Maps, or Leaflet
  useEffect(() => {
    if (!mapRef.current) return;

    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full bg-muted/30" ref={mapRef}>
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-[url('/assets/images/placeholder.png')] bg-cover bg-center opacity-50"></div>

          {/* Map pins */}
          {places.map(place => (
            <button
              key={place.id}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 transform ${
                selectedPlace?.id === place.id ? 'z-20' : 'z-10'
              }`}
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${20 + Math.random() * 60}%`,
              }}
              onClick={() => setSelectedPlace(place)}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`rounded-full p-1 ${
                    selectedPlace?.id === place.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground hover:bg-primary/80 hover:text-primary-foreground'
                  } transition-colors`}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <span
                  className={`mt-1 rounded-full px-1.5 py-0.5 text-xs font-medium ${
                    selectedPlace?.id === place.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground group-hover:bg-primary/80 group-hover:text-primary-foreground'
                  } transition-colors`}
                >
                  {place.title}
                </span>
              </div>
            </button>
          ))}

          {/* Selected place info card */}
          {selectedPlace && (
            <div className="absolute bottom-4 left-0 right-0 mx-auto w-full max-w-md px-4">
              <Card className="shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{selectedPlace.title}</h3>
                      <div className="text-xs text-muted-foreground">{selectedPlace.city}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{getPriceSymbol(selectedPlace.priceRange as string)}</Badge>
                      <Badge variant="secondary">{selectedPlace.avgRating} ★</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Map attribution */}
          <div className="absolute bottom-2 right-2 rounded bg-background/80 px-2 py-1 text-xs text-muted-foreground">
            Map data © PaiSaiD
          </div>
        </>
      )}
    </div>
  );
}
