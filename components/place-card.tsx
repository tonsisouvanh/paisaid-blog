import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TagType } from '@/hooks/use-post';
import { getPriceSymbol } from '@/lib/utils';

interface PlaceCardProps {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  imageUrl: string;
  city: string;
  tags: TagType[];
  href: string;
}

export default function PlaceCard({
  title,
  category,
  rating,
  reviewCount,
  priceRange,
  imageUrl,
  city,
  tags,
  href,
}: PlaceCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
      <Link href={href} className="block h-full">
        <div className="relative h-40 w-full">
          <Image src={imageUrl || '/placeholder.svg'} alt={title} fill sizes="100%" priority className="object-cover" />
          <div className="absolute left-2 top-2">
            <Badge variant="secondary" className="h-5 bg-background/80 px-2 py-0 text-xs backdrop-blur-sm">
              {category}
            </Badge>
          </div>
          <div className="absolute right-2 top-2">
            <Badge variant="secondary" className="h-5 bg-background/80 px-2 py-0 text-xs backdrop-blur-sm">
              {getPriceSymbol(priceRange)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="line-clamp-1 text-base font-semibold max-sm:text-xs">{title}</h3>
          <div className="mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{city}</span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="h-4 py-0 text-[10px]">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
    // <Link href={href} className="group relative overflow-hidden rounded-lg">
    //   <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent"></div>
    //   <img
    //     src={imageUrl || '/placeholder.svg'}
    //     alt={title}
    //     className="h-64 w-full object-cover transition-transform group-hover:scale-105"
    //   />
    //   <div className="absolute bottom-4 left-4 z-20">
    //     <h3 className="text-lg font-semibold text-white">{title}</h3>
    //     <div className="flex items-center text-sm text-gray-300">
    //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
    //         <path
    //           fillRule="evenodd"
    //           d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.172 1.107-.536 1.651l3.62 3.104-1.292 4.563c-.194.681.692 1.164 1.291.801l4.083-2.283 4.083 2.283c.598.363 1.485-.12 1.291-.801l-1.292-4.563 3.62-3.104c.635-.544.297-1.584-.536-1.651l-4.752-.382-1.831-4.401z"
    //           clipRule="evenodd"
    //         />
    //       </svg>
    //       <span>
    //         {rating} ({reviewCount}) - {category}
    //       </span>
    //     </div>
    //   </div>
    // </Link>
  );
}
