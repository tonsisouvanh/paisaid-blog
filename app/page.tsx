import CategoryCard from '@/components/category-card';
import HeroCarousel from '@/components/hero-carousel';
import PlaceCard from '@/components/place-card';
import QuickSearch from '@/components/quick-search';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ChevronRight, Filter, MapPin, Search, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const carouselItems = [
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1739609579483-00b49437cc45?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Discover Amazing Places',
      subtitle: 'Find and review the best local spots, restaurants, cafes, and attractions',
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Explore Luxury Hotels',
      subtitle: 'Experience the finest accommodations with authentic reviews from real travelers',
    },
    {
      id: 3,
      imageUrl:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Find Local Restaurants',
      subtitle: 'Discover hidden culinary gems and popular eateries in your area',
    },
  ];
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroCarousel items={carouselItems} />

        <section className="bg-cyan-500/10 px-4 py-6 md:py-8">
          <QuickSearch />
        </section>

        <section className="py-6 md:py-8">
          <div className="container px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">Popular Categories</h2>
              <Link href="/categories" className="flex items-center text-sm font-medium text-primary">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <ScrollArea className="pb-4">
              <div className="flex space-x-3 pb-2">
                <CategoryCard name="Restaurants" icon="utensils" count={1240} href="/explore?category=restaurants" />
                <CategoryCard name="Cafes" icon="coffee" count={856} href="/explore?category=cafes" />
                <CategoryCard name="Hotels" icon="bed" count={932} href="/explore?category=hotels" />
                <CategoryCard name="Attractions" icon="landmark" count={654} href="/explore?category=attractions" />
                <CategoryCard name="Nightlife" icon="moon" count={423} href="/explore?category=nightlife" />
                <CategoryCard name="Shopping" icon="shopping-bag" count={789} href="/explore?category=shopping" />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </section>

        <section className="py-6 md:py-8">
          <div className="container px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">Near You</h2>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <PlaceCard
                title="Coastal Breeze Cafe"
                category="Cafes"
                rating={4.8}
                reviewCount={124}
                priceRange="MEDIUM"
                imageUrl="https://images.unsplash.com/photo-1739609579483-00b49437cc45?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                city="San Francisco"
                tags={[]}
                href="/place/coastal-breeze-cafe"
              />
              <PlaceCard
                title="Mountain View Resort"
                category="Hotels"
                rating={4.9}
                reviewCount={89}
                priceRange="LUXURY"
                imageUrl="https://images.unsplash.com/photo-1739609579483-00b49437cc45?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                city="Aspen"
                tags={[]}
                href="/place/mountain-view-resort"
              />
              <PlaceCard
                title="Urban Spice Restaurant"
                category="Restaurants"
                rating={4.6}
                reviewCount={215}
                priceRange="HIGH"
                imageUrl="https://images.unsplash.com/photo-1739609579483-00b49437cc45?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                city="New York"
                tags={[]}
                href="/place/urban-spice-restaurant"
              />
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-6 md:py-8">
          <div className="container px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">Top Rated</h2>
              <Link href="/top-rated" className="flex items-center text-sm font-medium text-primary">
                See all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <PlaceCard
                title="Skyline Lounge"
                category="Nightlife"
                rating={4.9}
                reviewCount={342}
                priceRange="HIGH"
                imageUrl="https://plus.unsplash.com/premium_photo-1663932464937-e677ddfc1d55?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                city="Chicago"
                tags={[]}
                href="/place/skyline-lounge"
              />
              <PlaceCard
                title="Green Garden Bistro"
                category="Restaurants"
                rating={4.8}
                reviewCount={187}
                priceRange="MEDIUM"
                imageUrl="https://plus.unsplash.com/premium_photo-1663932464937-e677ddfc1d55?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                city="Portland"
                tags={[]}
                href="/place/green-garden-bistro"
              />
              <PlaceCard
                title="Historic Downtown Hotel"
                category="Hotels"
                rating={4.7}
                reviewCount={156}
                priceRange="LUXURY"
                imageUrl="https://plus.unsplash.com/premium_photo-1663932464937-e677ddfc1d55?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                city="Boston"
                tags={[]}
                href="/place/historic-downtown-hotel"
              />
            </div>
          </div>
        </section>

        <section className="py-6 md:py-8">
          <div className="container px-4">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-xl font-bold tracking-tight md:text-2xl">How It Works</h2>
              <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
                Discover, review, and share your favorite places with our easy-to-use platform
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-muted/30 p-4 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Discover Places</h3>
                <p className="text-sm text-muted-foreground">
                  Search for places by category, location, or specific features
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-muted/30 p-4 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Read & Write Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Share your experiences and help others make informed decisions
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-muted/30 p-4 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Save Favorites</h3>
                <p className="text-sm text-muted-foreground">Bookmark places you love or want to visit in the future</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-8 text-primary-foreground md:py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-md text-center">
              <h2 className="mb-3 text-xl font-bold tracking-tight md:text-2xl">Join Our Community Today</h2>
              <p className="mb-5 text-sm md:text-base">
                Sign up to discover amazing places, share your experiences, and connect with other travelers
              </p>
              <Button asChild size="lg" variant="secondary" className="w-full md:w-auto">
                <Link href="/signup">Get Started — It{"'"}s Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
