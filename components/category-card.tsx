import Link from 'next/link';
import { Coffee, Utensils, Bed, Landmark, Moon, ShoppingBag, MapPin, Music, Plane, Bike, Camera } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: string;
  count: number;
  href: string;
}

export default function CategoryCard({ name, icon, count, href }: CategoryCardProps) {
  const getIcon = (iconName: string) => {
    const iconProps = { className: 'h-5 w-5 mb-1' };

    switch (iconName.toLowerCase()) {
      case 'coffee':
        return <Coffee {...iconProps} />;
      case 'utensils':
        return <Utensils {...iconProps} />;
      case 'bed':
        return <Bed {...iconProps} />;
      case 'landmark':
        return <Landmark {...iconProps} />;
      case 'moon':
        return <Moon {...iconProps} />;
      case 'shopping-bag':
        return <ShoppingBag {...iconProps} />;
      case 'map-pin':
        return <MapPin {...iconProps} />;
      case 'music':
        return <Music {...iconProps} />;
      case 'plane':
        return <Plane {...iconProps} />;
      case 'bike':
        return <Bike {...iconProps} />;
      case 'camera':
        return <Camera {...iconProps} />;
      default:
        return <MapPin {...iconProps} />;
    }
  };

  return (
    <Link href={href}>
      <div className="flex h-full min-w-[100px] flex-col items-center justify-center rounded-lg border bg-background p-3 text-center transition-colors hover:border-primary">
        {getIcon(icon)}
        <h3 className="text-xs font-medium">{name}</h3>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{count}</p>
      </div>
    </Link>
  );
}
