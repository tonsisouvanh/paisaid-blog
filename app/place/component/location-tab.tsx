import Image from 'next/image';
import { MapPin, ExternalLink } from 'lucide-react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PostType } from '@/hooks/use-post';

type Props = {
  postData: PostType;
};

const LocationTab = ({ postData }: Props) => {
  // Extract values from postData
  const { address, city, country, latitude, longitude, photos } = postData;

  // Get the first available photo or fallback image
  const imageUrl = photos && photos?.length > 0 ? photos[0].url : '/assets/images/placeholder.png';

  // Google Maps links
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <TabsContent value="map">
      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">Location</h2>
          <div className="relative mb-4 h-[400px] overflow-hidden rounded-lg">
            {/* Background Image */}
            <Image src={imageUrl} alt="Map location" fill className="object-cover" />

            {/* Black Overlay with 50% Opacity */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Centered Map Pin Icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
            </div>

            {/* Title at Bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-lg font-semibold text-white">
              Map Location
            </div>
          </div>

          <div className="mb-4 text-muted-foreground">
            <p>{address}</p>
            <p>
              {city}, {country}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                View Larger Map <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default LocationTab;
