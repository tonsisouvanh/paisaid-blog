'use client';

import PlaceCard from '@/components/place-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { EmptyState } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetPosts } from '@/hooks/use-post';
import { getPriceSymbol } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { ArrowLeft, Filter, Grid, List, Map, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ExplorePostLoading from '../loading';
import MapView from './map-view';

// Mock data based on the schema
const categories = [
  { id: 1, name: 'Restaurants', parentId: null },
  { id: 2, name: 'Cafes', parentId: null },
  { id: 3, name: 'Hotels', parentId: null },
  { id: 4, name: 'Attractions', parentId: null },
  { id: 5, name: 'Nightlife', parentId: null },
  { id: 6, name: 'Shopping', parentId: null },
  { id: 7, name: 'Coffee Shops', parentId: 2 },
  { id: 8, name: 'Bakeries', parentId: 2 },
  { id: 9, name: 'Italian', parentId: 1 },
  { id: 10, name: 'Japanese', parentId: 1 },
];

const tags = [
  { id: 1, name: 'Outdoor Seating' },
  { id: 2, name: 'Pet Friendly' },
  { id: 3, name: 'Vegan Options' },
  { id: 4, name: 'Wifi' },
  { id: 5, name: 'Parking' },
  { id: 6, name: 'Delivery' },
  { id: 7, name: 'Takeout' },
  { id: 8, name: 'Reservations' },
  { id: 9, name: 'Wheelchair Accessible' },
  { id: 10, name: 'Family Friendly' },
];

const cities = [
  'New York',
  'San Francisco',
  'Chicago',
  'Los Angeles',
  'Miami',
  'Seattle',
  'Boston',
  'Portland',
  'Austin',
  'Denver',
];

const places = [
  {
    id: 1,
    title: 'Coastal Breeze Cafe',
    slug: 'coastal-breeze-cafe',
    category: 'Cafes',
    rating: 4.8,
    reviewCount: 124,
    priceRange: 'MEDIUM',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'San Francisco',
    tags: ['Outdoor Seating', 'Vegan Options'],
    address: '123 Ocean Ave, San Francisco, CA',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 2,
    title: 'Mountain View Resort',
    slug: 'mountain-view-resort',
    category: 'Hotels',
    rating: 4.9,
    reviewCount: 89,
    priceRange: 'LUXURY',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Aspen',
    tags: ['Spa', 'Mountain View'],
    address: '789 Mountain Rd, Aspen, CO',
    latitude: 39.1911,
    longitude: -106.8175,
  },
  {
    id: 3,
    title: 'Urban Spice Restaurant',
    slug: 'urban-spice-restaurant',
    category: 'Restaurants',
    rating: 4.6,
    reviewCount: 215,
    priceRange: 'HIGH',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'New York',
    tags: ['Fine Dining', 'Cocktails'],
    address: '456 5th Ave, New York, NY',
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: 4,
    title: 'Skyline Lounge',
    slug: 'skyline-lounge',
    category: 'Nightlife',
    rating: 4.9,
    reviewCount: 342,
    priceRange: 'HIGH',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Chicago',
    tags: ['Rooftop', 'Cocktails'],
    address: '789 Michigan Ave, Chicago, IL',
    latitude: 41.8781,
    longitude: -87.6298,
  },
  {
    id: 5,
    title: 'Green Garden Bistro',
    slug: 'green-garden-bistro',
    category: 'Restaurants',
    rating: 4.8,
    reviewCount: 187,
    priceRange: 'MEDIUM',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Portland',
    tags: ['Organic', 'Vegetarian'],
    address: '321 Rose St, Portland, OR',
    latitude: 45.5152,
    longitude: -122.6784,
  },
  {
    id: 6,
    title: 'Historic Downtown Hotel',
    slug: 'historic-downtown-hotel',
    category: 'Hotels',
    rating: 4.7,
    reviewCount: 156,
    priceRange: 'LUXURY',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Boston',
    tags: ['Historic', 'Luxury'],
    address: '100 Main St, Boston, MA',
    latitude: 42.3601,
    longitude: -71.0589,
  },
  {
    id: 7,
    title: 'Beachside Taco Shack',
    slug: 'beachside-taco-shack',
    category: 'Restaurants',
    rating: 4.5,
    reviewCount: 98,
    priceRange: 'LOW',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Miami',
    tags: ['Casual', 'Outdoor Seating'],
    address: '555 Beach Dr, Miami, FL',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  {
    id: 8,
    title: 'Tech Hub Coworking Cafe',
    slug: 'tech-hub-coworking-cafe',
    category: 'Cafes',
    rating: 4.7,
    reviewCount: 112,
    priceRange: 'MEDIUM',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Seattle',
    tags: ['Wifi', 'Coffee'],
    address: '888 Pike St, Seattle, WA',
    latitude: 47.6062,
    longitude: -122.3321,
  },
];

export default function Explore() {
  const { data: postsData, isLoading: isPostsLoading } = useGetPosts();
  const router = useRouter();

  // View state (grid, list, map)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  // Sort state
  const [sortOption, setSortOption] = useState('rating-desc');

  // Filtered places
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  // Mobile filter sheet state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply filters
  useEffect(() => {
    let result = [...places];

    // Search query filter
    if (searchQuery) {
      result = result.filter(
        place =>
          place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      const categoryNames = selectedCategories.map(id => categories.find(cat => cat.id === id)?.name);
      result = result.filter(place => categoryNames.includes(place.category));
    }

    // Tags filter
    if (selectedTags.length > 0) {
      const tagNames = selectedTags.map(id => tags.find(tag => tag.id === id)?.name);
      result = result.filter(place => place.tags.some(tag => tagNames.includes(tag)));
    }

    // City filter
    if (selectedCities.length > 0) {
      result = result.filter(place => selectedCities.includes(place.city));
    }

    // Price range filter
    if (priceRange.length > 0) {
      result = result.filter(place => priceRange.includes(place.priceRange));
    }

    // Rating filter
    if (ratingFilter > 0) {
      result = result.filter(place => place.rating >= ratingFilter);
    }

    // Apply sorting
    switch (sortOption) {
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-asc':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'reviews-desc':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'price-asc':
        const priceOrder = { LOW: 1, MEDIUM: 2, HIGH: 3, LUXURY: 4 };
        result.sort(
          (a, b) =>
            priceOrder[a.priceRange as keyof typeof priceOrder] - priceOrder[b.priceRange as keyof typeof priceOrder]
        );
        break;
      case 'price-desc':
        const priceOrderDesc = { LOW: 1, MEDIUM: 2, HIGH: 3, LUXURY: 4 };
        result.sort(
          (a, b) =>
            priceOrderDesc[b.priceRange as keyof typeof priceOrderDesc] -
            priceOrderDesc[a.priceRange as keyof typeof priceOrderDesc]
        );
        break;
    }

    setFilteredPlaces(result);
  }, [searchQuery, selectedCategories, selectedTags, selectedCities, priceRange, ratingFilter, sortOption]);

  // Handle category toggle
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  // Handle tag toggle
  const toggleTag = (tagId: number) => {
    setSelectedTags(prev => (prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]));
  };

  // Handle city toggle
  const toggleCity = (city: string) => {
    setSelectedCities(prev => (prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]));
  };

  // Handle price range toggle
  const togglePriceRange = (range: string) => {
    setPriceRange(prev => (prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedCities([]);
    setPriceRange([]);
    setRatingFilter(0);
    setSortOption('rating-desc');
  };

  // Count active filters
  const activeFilterCount =
    selectedCategories.length +
    selectedTags.length +
    selectedCities.length +
    priceRange.length +
    (ratingFilter > 0 ? 1 : 0);

  if (isPostsLoading) return <ExplorePostLoading />;

  if (!postsData || postsData.length === 0)
    return <EmptyState title="Data not found" description="Please come back next time" />;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="container flex h-14 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-lg font-semibold">Explore</h1>
          <div className="w-9"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Desktop Header */}
        <div className="mb-8 hidden md:block">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Explore Places</h1>
          <p className="text-muted-foreground">
            Discover and filter through amazing locations based on your preferences
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search places, cities, or features..."
              className="h-10 pl-9"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex h-10 gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Accordion type="multiple" defaultValue={['categories', 'tags', 'location', 'price', 'rating']}>
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {categories
                            .filter(cat => !cat.parentId)
                            .map(category => (
                              <div key={category.id} className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`category-${category.id}`}
                                    checked={selectedCategories.includes(category.id)}
                                    onCheckedChange={() => toggleCategory(category.id)}
                                  />
                                  <label
                                    htmlFor={`category-${category.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {category.name}
                                  </label>
                                </div>
                                {/* Subcategories */}
                                <div className="ml-6 space-y-1">
                                  {categories
                                    .filter(cat => cat.parentId === category.id)
                                    .map(subCategory => (
                                      <div key={subCategory.id} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`category-${subCategory.id}`}
                                          checked={selectedCategories.includes(subCategory.id)}
                                          onCheckedChange={() => toggleCategory(subCategory.id)}
                                        />
                                        <label
                                          htmlFor={`category-${subCategory.id}`}
                                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                          {subCategory.name}
                                        </label>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tags">
                      <AccordionTrigger>Features & Amenities</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                          {tags.map(tag => (
                            <div key={tag.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`tag-${tag.id}`}
                                checked={selectedTags.includes(tag.id)}
                                onCheckedChange={() => toggleTag(tag.id)}
                              />
                              <label
                                htmlFor={`tag-${tag.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {tag.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="location">
                      <AccordionTrigger>Location</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {cities.map(city => (
                            <div key={city} className="flex items-center space-x-2">
                              <Checkbox
                                id={`city-${city}`}
                                checked={selectedCities.includes(city)}
                                onCheckedChange={() => toggleCity(city)}
                              />
                              <label
                                htmlFor={`city-${city}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {city}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {['LOW', 'MEDIUM', 'HIGH', 'LUXURY'].map(range => (
                            <Badge
                              key={range}
                              variant={priceRange.includes(range) ? 'default' : 'outline'}
                              className="cursor-pointer"
                              onClick={() => togglePriceRange(range)}
                            >
                              {getPriceSymbol(range)}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rating">
                      <AccordionTrigger>Rating</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Minimum Rating</span>
                            <span className="text-sm font-medium">{ratingFilter}+ Stars</span>
                          </div>
                          <Slider
                            defaultValue={[ratingFilter]}
                            max={5}
                            step={0.5}
                            onValueChange={(value: any) => setRatingFilter(value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Any</span>
                            <span>5 Stars</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <SheetFooter className="flex-row gap-2 sm:space-x-0">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <SheetClose asChild>
                    <Button className="flex-1">Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="h-10 w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating-desc">Highest Rated</SelectItem>
                <SelectItem value="rating-asc">Lowest Rated</SelectItem>
                <SelectItem value="reviews-desc">Most Reviewed</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden rounded-md border md:flex">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="rounded-none rounded-l-md"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="icon"
                className="rounded-none rounded-r-md"
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4" />
                <span className="sr-only">Map view</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile View Tabs */}
        <div className="mb-4 md:hidden">
          <Tabs defaultValue="grid" onValueChange={value => setViewMode(value as 'grid' | 'list' | 'map')}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="grid">
                <Grid className="mr-2 h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="mr-2 h-4 w-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="map">
                <Map className="mr-2 h-4 w-4" />
                Map
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedCategories.map(catId => {
              const category = categories.find(c => c.id === catId);
              return category ? (
                <Badge key={`cat-${catId}`} variant="secondary" className="flex items-center gap-1">
                  {category.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(catId)} />
                </Badge>
              ) : null;
            })}
            {selectedTags.map(tagId => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? (
                <Badge key={`tag-${tagId}`} variant="secondary" className="flex items-center gap-1">
                  {tag.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tagId)} />
                </Badge>
              ) : null;
            })}
            {selectedCities.map(city => (
              <Badge key={`city-${city}`} variant="secondary" className="flex items-center gap-1">
                {city}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCity(city)} />
              </Badge>
            ))}
            {priceRange.map(range => (
              <Badge key={`price-${range}`} variant="secondary" className="flex items-center gap-1">
                {getPriceSymbol(range)}
                <X className="h-3 w-3 cursor-pointer" onClick={() => togglePriceRange(range)} />
              </Badge>
            ))}
            {ratingFilter > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {ratingFilter}+ Stars
                <X className="h-3 w-3 cursor-pointer" onClick={() => setRatingFilter(0)} />
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {postsData.length} {postsData.length === 1 ? 'place' : 'places'} found
        </div>

        {/* Results */}
        {viewMode === 'map' ? (
          <div className="h-[calc(100vh-220px)] min-h-[400px] overflow-hidden rounded-lg">
            <MapView places={postsData} />
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {postsData.map(post => (
              <PlaceCard
                key={post.id}
                title={upperFirst(post.title)}
                category={post.category?.name || 'N/A'}
                rating={post.avgRating || 0}
                reviewCount={post.reviewCount || 0}
                priceRange={post.priceRange || 'N/A'}
                imageUrl={post?.photos && post.photos?.length > 0 ? post.photos[0].url : ''}
                city={post.city || ''}
                tags={post.tags || []}
                href={`/place/${post.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* {places.map(place => (
              <PlaceCardHorizontal
                key={place.id}
                title={place.title}
                category={place.category}
                rating={place.rating}
                reviewCount={place.reviewCount}
                priceRange={place.priceRange}
                imageUrl={place.imageUrl}
                city={place.city}
                address={place.address}
                tags={place.tags}
                href={`/place/${place.slug}`}
              />
            ))} */}
            <EmptyState title="Empty" />
          </div>
        )}

        {/* No Results */}
        {postsData.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-medium">No places found</h3>
            <p className="mx-auto max-w-md text-muted-foreground">
              We couldn{"'"}t find any places matching your current filters. Try adjusting your search criteria or
              clearing some filters.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {postsData.length > 0 && postsData.length % 6 === 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline">Load More</Button>
          </div>
        )}
      </div>
    </div>
  );
}
