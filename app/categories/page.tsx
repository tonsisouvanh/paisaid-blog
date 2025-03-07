import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for categories
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
      { id: 101, name: 'Italian', count: 245 },
      { id: 102, name: 'Japanese', count: 187 },
      { id: 103, name: 'Mexican', count: 156 },
      { id: 104, name: 'Indian', count: 132 },
      { id: 105, name: 'Vegetarian', count: 98 },
      { id: 106, name: 'Seafood', count: 87 },
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
      { id: 201, name: 'Coffee Shops', count: 412 },
      { id: 202, name: 'Bakeries', count: 187 },
      { id: 203, name: 'Tea Houses', count: 98 },
      { id: 204, name: 'Dessert Shops', count: 159 },
    ],
  },
  {
    id: 3,
    name: 'Hotels',
    icon: 'bed',
    count: 932,
    description: 'Luxury hotels, boutique stays, and budget options',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-blue-100 dark:bg-blue-950',
    textColor: 'text-blue-600 dark:text-blue-400',
    subcategories: [
      { id: 301, name: 'Luxury', count: 156 },
      { id: 302, name: 'Boutique', count: 187 },
      { id: 303, name: 'Budget', count: 245 },
      { id: 304, name: 'Resorts', count: 132 },
      { id: 305, name: 'B&Bs', count: 212 },
    ],
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
    subcategories: [
      { id: 401, name: 'Museums', count: 132 },
      { id: 402, name: 'Parks', count: 187 },
      { id: 403, name: 'Historical Sites', count: 98 },
      { id: 404, name: 'Theme Parks', count: 45 },
      { id: 405, name: 'Tours', count: 192 },
    ],
  },
  {
    id: 5,
    name: 'Nightlife',
    icon: 'moon',
    count: 423,
    description: 'Bars, clubs, lounges, and entertainment venues',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-purple-100 dark:bg-purple-950',
    textColor: 'text-purple-600 dark:text-purple-400',
    subcategories: [
      { id: 501, name: 'Bars', count: 187 },
      { id: 502, name: 'Clubs', count: 98 },
      { id: 503, name: 'Lounges', count: 76 },
      { id: 504, name: 'Live Music', count: 62 },
    ],
  },
  {
    id: 6,
    name: 'Shopping',
    icon: 'shopping-bag',
    count: 789,
    description: 'Malls, boutiques, markets, and specialty stores',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-pink-100 dark:bg-pink-950',
    textColor: 'text-pink-600 dark:text-pink-400',
    subcategories: [
      { id: 601, name: 'Malls', count: 87 },
      { id: 602, name: 'Boutiques', count: 156 },
      { id: 603, name: 'Markets', count: 132 },
      { id: 604, name: 'Specialty Stores', count: 414 },
    ],
  },
  {
    id: 7,
    name: 'Beaches',
    icon: 'waves',
    count: 312,
    description: 'Sandy shores, beach clubs, and coastal spots',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-cyan-100 dark:bg-cyan-950',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    subcategories: [
      { id: 701, name: 'Public Beaches', count: 156 },
      { id: 702, name: 'Beach Clubs', count: 87 },
      { id: 703, name: 'Surfing Spots', count: 69 },
    ],
  },
  {
    id: 8,
    name: 'Outdoor Activities',
    icon: 'mountain',
    count: 478,
    description: 'Hiking, biking, water sports, and adventure',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-emerald-100 dark:bg-emerald-950',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    subcategories: [
      { id: 801, name: 'Hiking Trails', count: 187 },
      { id: 802, name: 'Biking Routes', count: 132 },
      { id: 803, name: 'Water Sports', count: 98 },
      { id: 804, name: 'Adventure Tours', count: 61 },
    ],
  },
  {
    id: 9,
    name: 'Wellness',
    icon: 'dumbbell',
    count: 345,
    description: 'Spas, fitness centers, and wellness retreats',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-teal-100 dark:bg-teal-950',
    textColor: 'text-teal-600 dark:text-teal-400',
    subcategories: [
      { id: 901, name: 'Spas', count: 156 },
      { id: 902, name: 'Fitness Centers', count: 132 },
      { id: 903, name: 'Yoga Studios', count: 57 },
    ],
  },
  {
    id: 10,
    name: 'Entertainment',
    icon: 'gamepad2',
    count: 567,
    description: 'Theaters, cinemas, gaming, and events',
    image: '/placeholder.svg?height=400&width=600',
    color: 'bg-red-100 dark:bg-red-950',
    textColor: 'text-red-600 dark:text-red-400',
    subcategories: [
      { id: 1001, name: 'Theaters', count: 87 },
      { id: 1002, name: 'Cinemas', count: 132 },
      { id: 1003, name: 'Gaming', count: 98 },
      { id: 1004, name: 'Events', count: 250 },
    ],
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

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-6 md:py-10">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Browse places by category to find exactly what you&apos;re looking for
          </p>
        </div>

        {/* Featured Categories */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-semibold">Featured Categories</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {mainCategories.slice(0, 4).map(category => (
              <Link
                key={category.id}
                href={`/explore?category=${category.id}`}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="mb-1 flex items-center gap-2">
                    {getCategoryIcon(category.icon, 'h-5 w-5')}
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                  <p className="text-xs text-white/80">{category.count} places</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <h2 className="mb-6 text-xl font-semibold">All Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mainCategories.map(category => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className={`p-4 ${category.color}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full bg-white/90 p-2 ${category.textColor}`}>
                        {getCategoryIcon(category.icon)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription className="text-muted-foreground/80">{category.count} places</CardDescription>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="h-8 rounded-full bg-white/90 px-3 hover:bg-white"
                    >
                      <Link href={`/explore?category=${category.id}`}>
                        <span className="sr-only md:not-sr-only md:mr-1">View</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="mb-3 text-sm text-muted-foreground">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 5).map(subcategory => (
                      <Badge key={subcategory.id} variant="outline" className="cursor-pointer hover:bg-accent">
                        <Link href={`/explore?subcategory=${subcategory.id}`}>
                          {subcategory.name} ({subcategory.count})
                        </Link>
                      </Badge>
                    ))}
                    {category.subcategories.length > 5 && (
                      <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                        <Link href={`/categories/${category.id}`}>+{category.subcategories.length - 5} more</Link>
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <Link href={`/categories/${category.id}`} className="text-xs text-primary hover:underline">
                    View all subcategories
                  </Link>
                  <Link href={`/explore?category=${category.id}`} className="text-xs text-primary hover:underline">
                    Browse places
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Subcategories */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold">Popular Subcategories</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {mainCategories.flatMap(category =>
              category.subcategories
                .filter(sub => sub.count > 100)
                .slice(0, 2)
                .map(subcategory => (
                  <Link
                    key={subcategory.id}
                    href={`/explore?subcategory=${subcategory.id}`}
                    className="flex h-full flex-col items-center justify-center rounded-lg border bg-muted/50 p-4 text-center transition-colors hover:border-primary"
                  >
                    <h3 className="text-sm font-medium">{subcategory.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{subcategory.count} places</p>
                  </Link>
                ))
            )}
          </div>
        </section>

        {/* Browse by Category CTA */}
        <section className="mb-8 mt-16">
          <div className="rounded-lg bg-muted p-6 md:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-3 text-2xl font-bold">Can&apos;t find what you&apos;re looking for?</h2>
              <p className="mb-6 text-muted-foreground">
                Use our advanced search to filter by multiple categories, locations, and features
              </p>
              <Button asChild size="lg">
                <Link href="/explore">Explore All Places</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
