import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface PlaceCardHorizontalProps {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  imageUrl: string;
  city: string;
  address: string;
  tags: string[];
  href: string;
}

export default function PlaceCardHorizontal({
  title,
  category,
  rating,
  reviewCount,
  priceRange,
  imageUrl,
  city,
  address,
  tags,
  href,
}: PlaceCardHorizontalProps) {
  const getPriceSymbol = (range: string) => {
    switch (range) {
      case 'LOW':
        return '$';
      case 'MEDIUM':
        return '$$';
      case 'HIGH':
        return '$$$';
      case 'LUXURY':
        return '$$$$';
      default:
        return '$$';
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link href={href} className="flex flex-col sm:flex-row">
        <div className="relative h-48 sm:h-auto sm:w-1/3 md:w-1/4">
          <Image src={imageUrl || '/placeholder.svg'} alt={title} fill className="object-cover" />
          <div className="absolute left-2 top-2">
            <Badge variant="secondary" className="h-5 bg-background/80 px-2 py-0 text-xs backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="mt-1 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{address}</span>
              </div>
            </div>
            <Badge variant="outline" className="h-5 px-2 py-0 text-xs">
              {getPriceSymbol(priceRange)}
            </Badge>
          </div>

          <div className="mt-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="h-5 py-0 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

// import Link from 'next/link';
// import Image from 'next/image';
// import { Star, MapPin } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
// import { getPriceSymbol } from '@/lib/utils';

// interface PlaceCardHorizontalProps {
//   title: string;
//   category: string;
//   rating: number;
//   reviewCount: number;
//   priceRange: string;
//   imageUrl: string;
//   city: string;
//   address: string;
//   tags: string[];
//   href: string;
// }

// export default function PlaceCardHorizontal({
//   title,
//   category,
//   rating,
//   reviewCount,
//   priceRange,
//   imageUrl,
//   city,
//   address,
//   tags,
//   href,
// }: PlaceCardHorizontalProps) {
//   return (
//     <Card className="overflow-hidden transition-shadow hover:shadow-md">
//       <Link href={href} className="flex flex-col sm:flex-row">
//         <div className="relative h-48 sm:h-auto sm:w-1/3 md:w-1/4">
//           <Image src={imageUrl || '/placeholder.svg'} alt={title} fill className="object-cover" />
//           <div className="absolute left-2 top-2">
//             <Badge variant="secondary" className="h-5 bg-background/80 px-2 py-0 text-xs backdrop-blur-sm">
//               {category}
//             </Badge>
//           </div>
//         </div>
//         <CardContent className="flex-1 p-4">
//           <div className="flex items-start justify-between">
//             <div>
//               <h3 className="text-lg font-semibold">{title}</h3>
//               <div className="mt-1 flex items-center gap-1">
//                 <MapPin className="h-3 w-3 text-muted-foreground" />
//                 <span className="text-xs text-muted-foreground">{address}</span>
//               </div>
//             </div>
//             <Badge variant="outline" className="h-5 px-2 py-0 text-xs">
//               {getPriceSymbol(priceRange)}
//             </Badge>
//           </div>

//           <div className="mt-2 flex items-center gap-1">
//             <Star className="h-4 w-4 fill-primary text-primary" />
//             <span className="text-sm font-medium">{rating}</span>
//             <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
//           </div>

//           <div className="mt-3 flex flex-wrap gap-1">
//             {tags.map((tag, index) => (
//               <Badge key={index} variant="outline" className="h-5 py-0 text-xs">
//                 {tag}
//               </Badge>
//             ))}
//           </div>
//         </CardContent>
//       </Link>
//     </Card>
//   );
// }
