import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ArrowLeft,
  Coffee,
  Utensils,
  Bed,
  Landmark,
  Moon,
  ShoppingBag,
  MapPin,
  Music,
  Plane,
  Bike,
  Camera,
  Palmtree,
  Waves,
  Mountain,
  Building,
  UtensilsCrossed,
  Wine,
  Dumbbell,
  Gamepad2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for categories (same as in categories/page.tsx)
const mainCategories = [
  {
    id: 1,
    name: 'Restaurants',
    icon: 'utensils',
    count: 1240,
    description: 'Discover local and international cuisine',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-orange-100 dark:bg-orange-950',
    textColor: 'text-orange-600 dark:text-orange-400',
    subcategories: [
      { id: 101, name: 'Italian', count: 245, description: 'Pasta, pizza, and authentic Italian dishes' },
      { id: 102, name: 'Japanese', count: 187, description: 'Sushi, ramen, and traditional Japanese cuisine' },
      { id: 103, name: 'Mexican', count: 156, description: 'Tacos, burritos, and spicy Mexican flavors' },
      { id: 104, name: 'Indian', count: 132, description: 'Curry, tandoori, and aromatic Indian dishes' },
      { id: 105, name: 'Vegetarian', count: 98, description: 'Meat-free dishes and plant-based options' },
      { id: 106, name: 'Seafood', count: 87, description: 'Fresh fish and ocean delicacies' },
      { id: 107, name: 'Chinese', count: 156, description: 'Authentic Chinese cuisine from various regions' },
      { id: 108, name: 'Thai', count: 98, description: 'Spicy, sweet, and sour Thai specialties' },
      { id: 109, name: 'French', count: 76, description: 'Elegant French cuisine and pastries' },
      { id: 110, name: 'Mediterranean', count: 112, description: 'Healthy dishes from Mediterranean countries' },
      { id: 111, name: 'Steakhouses', count: 65, description: 'Premium cuts and grilled specialties' },
      { id: 112, name: 'Fast Food', count: 187, description: 'Quick service and familiar favorites' },
    ],
  },
  {
    id: 2,
    name: 'Cafes',
    icon: 'coffee',
    count: 856,
    description: 'Coffee shops, bakeries, and tea houses',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-amber-100 dark:bg-amber-950',
    textColor: 'text-amber-600 dark:text-amber-400',
    subcategories: [
      { id: 201, name: 'Coffee Shops', count: 412, description: 'Specialty coffee and cozy atmospheres' },
      { id: 202, name: 'Bakeries', count: 187, description: 'Fresh bread, pastries, and baked goods' },
      { id: 203, name: 'Tea Houses', count: 98, description: 'Specialty teas and relaxing environments' },
      { id: 204, name: 'Dessert Shops', count: 159, description: 'Sweet treats and indulgent desserts' },
      { id: 205, name: 'Breakfast Spots', count: 132, description: 'Morning meals and brunch favorites' },
      { id: 206, name: 'Juice Bars', count: 87, description: 'Fresh juices, smoothies, and healthy options' },
    ],
  },
  // Other categories would be here...
  {
    id: 3,
    name: 'Hotels',
    icon: 'bed',
    count: 932,
    description: 'Luxury hotels, boutique stays, and budget options',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-blue-100 dark:bg-blue-950',
    textColor: 'text-blue-600 dark:text-blue-400',
    subcategories: [],
  },
  {
    id: 4,
    name: 'Attractions',
    icon: 'landmark',
    count: 654,
    description: 'Museums, parks, historical sites, and more',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-green-100 dark:bg-green-950',
    textColor: 'text-green-600 dark:text-green-400',
    subcategories: [],
  },
];

// Helper function to get the icon component
const getCategoryIcon = (iconName: string, className = 'h-6 w-6') => {
  const iconProps = { className };

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
    case 'palmtree':
      return <Palmtree {...iconProps} />;
    case 'waves':
      return <Waves {...iconProps} />;
    case 'mountain':
      return <Mountain {...iconProps} />;
    case 'building':
      return <Building {...iconProps} />;
    case 'utensils-crossed':
      return <UtensilsCrossed {...iconProps} />;
    case 'wine':
      return <Wine {...iconProps} />;
    case 'dumbbell':
      return <Dumbbell {...iconProps} />;
    case 'gamepad2':
      return <Gamepad2 {...iconProps} />;
    default:
      return <MapPin {...iconProps} />;
  }
};

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  // Find the category by ID
  const categoryId = Number.parseInt(params.id);
  const category = mainCategories.find(cat => cat.id === categoryId);

  // If category not found, we could redirect or show an error
  if (!category) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Category not found</h1>
        <p className="mb-6 text-muted-foreground">
          The category you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/categories">Back to Categories</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-6 md:py-10">
        {/* Category Header */}
        <div className={`rounded-lg ${category.color} mb-8 flex flex-col items-center gap-6 p-6 md:flex-row`}>
          <div className={`rounded-full bg-white/90 p-4 ${category.textColor}`}>
            {getCategoryIcon(category.icon, 'h-10 w-10')}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
          <Button asChild>
            <Link href={`/explore?category=${category.id}`}>Browse All {category.count} Places</Link>
          </Button>
        </div>

        {/* Subcategories */}
        <section>
          <h2 className="mb-6 text-xl font-semibold">Subcategories</h2>

          {category.subcategories.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {category.subcategories.map(subcategory => (
                <Card key={subcategory.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{subcategory.name}</h3>
                        <p className="mb-3 mt-1 text-sm text-muted-foreground">
                          {subcategory.description || `Browse ${subcategory.count} places in this category`}
                        </p>
                      </div>
                      <Badge variant="outline">{subcategory.count}</Badge>
                    </div>
                    <Button asChild variant="outline" className="mt-2 w-full">
                      <Link href={`/explore?subcategory=${subcategory.id}`}>
                        Browse Places
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-muted/30 py-12 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <MapPin className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">No subcategories available</h3>
              <p className="mx-auto mb-4 max-w-md text-muted-foreground">
                This category doesn&apos;t have any subcategories yet. You can still browse all places in this category.
              </p>
              <Button asChild>
                <Link href={`/explore?category=${category.id}`}>Browse All Places</Link>
              </Button>
            </div>
          )}
        </section>

        {/* Popular Places in this Category */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold">Popular in {category.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <Link
                key={i}
                href={`/place/sample-${category.id}-${i}`}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt={`Popular ${category.name} ${i}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-semibold">
                    Sample {category.name} {i}
                  </h3>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-xs text-white/80">4.{7 + i} ★</span>
                    <span className="text-xs text-white/80">({50 + i * 10} reviews)</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href={`/explore?category=${category.id}&sort=rating-desc`}>View More Popular Places</Link>
            </Button>
          </div>
        </section>

        {/* Related Categories */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold">Related Categories</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {mainCategories
              .filter(cat => cat.id !== category.id)
              .slice(0, 4)
              .map(relatedCategory => (
                <Link
                  key={relatedCategory.id}
                  href={`/categories/${relatedCategory.id}`}
                  className="flex h-full flex-col items-center justify-center rounded-lg border bg-muted/50 p-4 text-center transition-colors hover:border-primary"
                >
                  <div className={`rounded-full p-2 ${relatedCategory.color} ${relatedCategory.textColor} mb-2`}>
                    {getCategoryIcon(relatedCategory.icon, 'h-5 w-5')}
                  </div>
                  <h3 className="text-sm font-medium">{relatedCategory.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{relatedCategory.count} places</p>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
