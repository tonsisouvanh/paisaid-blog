'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Search, Filter, Grid, List, X, Menu, ChevronLeft, ChevronRight, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import PlaceCard from '@/components/place-card';
import PlaceCardHorizontal from '../explore/components/place-card-horizal';

// Mock data for search results
const allPlaces = [
  {
    id: 1,
    title: 'Skyline Lounge',
    slug: 'skyline-lounge',
    category: 'Nightlife',
    rating: 4.9,
    reviewCount: 342,
    priceRange: 'HIGH',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Chicago',
    tags: ['Rooftop', 'Cocktails', 'City View'],
    address: '789 Michigan Ave, Chicago, IL',
    description:
      'Enjoy breathtaking city views from this upscale rooftop lounge featuring craft cocktails and small plates.',
    relevanceScore: 95,
  },
  {
    id: 2,
    title: 'Green Garden Bistro',
    slug: 'green-garden-bistro',
    category: 'Restaurants',
    rating: 4.8,
    reviewCount: 187,
    priceRange: 'MEDIUM',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Portland',
    tags: ['Organic', 'Vegetarian', 'Garden'],
    address: '321 Rose St, Portland, OR',
    description:
      'Farm-to-table restaurant specializing in organic, locally-sourced vegetarian and vegan cuisine in a garden setting.',
    relevanceScore: 88,
  },
  {
    id: 3,
    title: 'Historic Downtown Hotel',
    slug: 'historic-downtown-hotel',
    category: 'Hotels',
    rating: 4.7,
    reviewCount: 156,
    priceRange: 'LUXURY',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Boston',
    tags: ['Historic', 'Luxury', 'Downtown'],
    address: '100 Main St, Boston, MA',
    description:
      'Elegant hotel in a beautifully restored 19th-century building, offering luxury accommodations in the heart of downtown.',
    relevanceScore: 72,
  },
  {
    id: 4,
    title: 'Coastal Breeze Cafe',
    slug: 'coastal-breeze-cafe',
    category: 'Cafes',
    rating: 4.8,
    reviewCount: 124,
    priceRange: 'MEDIUM',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'San Francisco',
    tags: ['Outdoor Seating', 'Vegan Options', 'Ocean View'],
    address: '123 Ocean Ave, San Francisco, CA',
    description:
      'Beachside cafe with panoramic ocean views, serving artisanal coffee, fresh pastries, and healthy breakfast options.',
    relevanceScore: 91,
  },
  {
    id: 5,
    title: 'Mountain View Resort',
    slug: 'mountain-view-resort',
    category: 'Hotels',
    rating: 4.9,
    reviewCount: 89,
    priceRange: 'LUXURY',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Aspen',
    tags: ['Spa', 'Mountain View', 'Skiing'],
    address: '789 Mountain Rd, Aspen, CO',
    description:
      'Luxury mountain resort with stunning views, world-class spa facilities, and easy access to ski slopes and hiking trails.',
    relevanceScore: 85,
  },
  {
    id: 6,
    title: 'Urban Spice Restaurant',
    slug: 'urban-spice-restaurant',
    category: 'Restaurants',
    rating: 4.6,
    reviewCount: 215,
    priceRange: 'HIGH',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'New York',
    tags: ['Fine Dining', 'Cocktails', 'Spicy Food'],
    address: '456 5th Ave, New York, NY',
    description:
      'Upscale dining experience featuring innovative fusion cuisine, craft cocktails, and an elegant atmosphere in the heart of the city.',
    relevanceScore: 78,
  },
  {
    id: 7,
    title: 'Sunset Beach Club',
    slug: 'sunset-beach-club',
    category: 'Nightlife',
    rating: 4.7,
    reviewCount: 178,
    priceRange: 'HIGH',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Miami',
    tags: ['Beach', 'DJ', 'Sunset Views'],
    address: '555 Ocean Dr, Miami, FL',
    description:
      'Vibrant beachfront club with international DJs, signature cocktails, and stunning sunset views over the ocean.',
    relevanceScore: 82,
  },
  {
    id: 8,
    title: 'Artisan Coffee House',
    slug: 'artisan-coffee-house',
    category: 'Cafes',
    rating: 4.8,
    reviewCount: 143,
    priceRange: 'MEDIUM',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Seattle',
    tags: ['Coffee', 'Pastries', 'Artisanal'],
    address: '222 Pike St, Seattle, WA',
    description:
      'Cozy cafe specializing in single-origin coffee, house-roasted beans, and artisanal pastries made fresh daily.',
    relevanceScore: 94,
  },
  {
    id: 9,
    title: 'Crystal Clear Aquarium',
    slug: 'crystal-clear-aquarium',
    category: 'Attractions',
    rating: 4.7,
    reviewCount: 267,
    priceRange: 'MEDIUM',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'San Diego',
    tags: ['Family Friendly', 'Educational', 'Marine Life'],
    address: '400 Aquarium Way, San Diego, CA',
    description:
      'World-class aquarium featuring thousands of marine species, interactive exhibits, and educational programs for all ages.',
    relevanceScore: 76,
  },
  {
    id: 10,
    title: 'Lakeside Retreat',
    slug: 'lakeside-retreat',
    category: 'Hotels',
    rating: 4.8,
    reviewCount: 112,
    priceRange: 'HIGH',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Lake Tahoe',
    tags: ['Lakefront', 'Peaceful', 'Nature'],
    address: '888 Lakeshore Dr, Lake Tahoe, CA',
    description:
      'Tranquil lakefront accommodations with private beach access, water sports, and stunning natural surroundings.',
    relevanceScore: 81,
  },
  {
    id: 11,
    title: 'The Vintage Winery',
    slug: 'the-vintage-winery',
    category: 'Attractions',
    rating: 4.9,
    reviewCount: 98,
    priceRange: 'HIGH',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Napa Valley',
    tags: ['Wine Tasting', 'Tours', 'Vintage'],
    address: '777 Vineyard Ln, Napa, CA',
    description:
      'Historic winery offering premium wine tastings, guided vineyard tours, and gourmet food pairings in a picturesque setting.',
    relevanceScore: 89,
  },
  {
    id: 12,
    title: 'Fusion Sushi Bar',
    slug: 'fusion-sushi-bar',
    category: 'Restaurants',
    rating: 4.7,
    reviewCount: 165,
    priceRange: 'HIGH',
    imageUrl: '/placeholder.svg?height=400&width=600',
    city: 'Los Angeles',
    tags: ['Sushi', 'Fusion', 'Japanese'],
    address: '555 Sunset Blvd, Los Angeles, CA',
    description:
      'Innovative sushi restaurant combining traditional Japanese techniques with global flavors in a sleek, modern atmosphere.',
    relevanceScore: 87,
  },
];

// Categories for filtering
const categories = [
  { id: 1, name: 'Restaurants' },
  { id: 2, name: 'Cafes' },
  { id: 3, name: 'Hotels' },
  { id: 4, name: 'Attractions' },
  { id: 5, name: 'Nightlife' },
  { id: 6, name: 'Shopping' },
];

// Cities for filtering
const cities = [
  'New York',
  'San Francisco',
  'Chicago',
  'Los Angeles',
  'Miami',
  'Seattle',
  'Boston',
  'Portland',
  'Aspen',
  'Lake Tahoe',
  'Napa Valley',
  'San Diego',
];

// Helper function to get price symbol
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

// Mock search history
const recentSearches = ['best restaurants', 'hotels with pool', 'family friendly', 'rooftop bars', 'beach access'];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState('relevance');
  const [filteredPlaces, setFilteredPlaces] = useState(allPlaces);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  // Filter places based on search query and other filters
  useEffect(() => {
    let result = [...allPlaces];

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        place =>
          place.title.toLowerCase().includes(query) ||
          place.city.toLowerCase().includes(query) ||
          place.description.toLowerCase().includes(query) ||
          place.tags.some(tag => tag.toLowerCase().includes(query)) ||
          place.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      const categoryNames = selectedCategories.map(id => categories.find(cat => cat.id === id)?.name);
      result = result.filter(place => categoryNames.includes(place.category));
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
    if (minRating > 0) {
      result = result.filter(place => place.rating >= minRating);
    }

    // Apply sorting
    switch (sortOption) {
      case 'relevance':
        result.sort((a, b) => b.relevanceScore - a.relevanceScore);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
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
  }, [searchQuery, selectedCategories, selectedCities, priceRange, minRating, sortOption]);

  // Toggle category selection
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  // Toggle city selection
  const toggleCity = (city: string) => {
    setSelectedCities(prev => (prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]));
  };

  // Toggle price range selection
  const togglePriceRange = (range: string) => {
    setPriceRange(prev => (prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery(queryParam);
    setSelectedCategories([]);
    setSelectedCities([]);
    setPriceRange([]);
    setMinRating(0);
    setSortOption('relevance');
  };

  // Count active filters
  const activeFilterCount =
    selectedCategories.length + selectedCities.length + priceRange.length + (minRating > 0 ? 1 : 0);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the URL with the search query
    // window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`)
  };

  // Select a recent search
  const selectRecentSearch = (search: string) => {
    setSearchQuery(search);
    setShowRecentSearches(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-6 md:py-10">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Search Results {queryParam && <span>for &quot;{queryParam}&quot;</span>}
          </h1>
          <p className="text-muted-foreground">
            {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'} found
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search places, cities, or features..."
                className="h-10 pl-9 pr-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setShowRecentSearches(true)}
                onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                  type="button"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </form>

            {/* Recent Searches Dropdown */}
            {showRecentSearches && recentSearches.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border bg-background shadow-md">
                <div className="border-b p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Recent Searches</span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      Clear All
                    </Button>
                  </div>
                </div>
                <ul className="py-1">
                  {recentSearches.map((search, index) => (
                    <li key={index}>
                      <Button
                        variant="ghost"
                        className="h-8 w-full justify-start px-3 text-sm"
                        onClick={() => selectRecentSearch(search)}
                      >
                        <History className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        {search}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
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
                <div className="py-4">
                  <h2 className="mb-4 text-lg font-semibold">Filter Search Results</h2>
                  <Accordion type="multiple" defaultValue={['categories', 'cities', 'price', 'rating']}>
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {categories.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
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
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="cities">
                      <AccordionTrigger>Cities</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
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
                      <AccordionTrigger>Minimum Rating</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Minimum Rating</span>
                            <span className="text-sm font-medium">{minRating}+ Stars</span>
                          </div>
                          <Slider
                            defaultValue={[minRating]}
                            min={0}
                            max={5}
                            step={0.5}
                            onValueChange={value => setMinRating(value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Any</span>
                            <span>5 Stars</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="mt-6 flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={clearFilters}>
                      Clear All
                    </Button>
                    <Button className="flex-1" onClick={() => setIsFilterOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="h-10 w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="rating-desc">Highest Rated</SelectItem>
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
                className="rounded-none rounded-r-md"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile View Tabs */}
        <div className="mb-4 md:hidden">
          <Tabs defaultValue="grid" onValueChange={value => setViewMode(value as 'grid' | 'list')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">
                <Grid className="mr-2 h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="mr-2 h-4 w-4" />
                List
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
            {minRating > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {minRating}+ Stars
                <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRating(0)} />
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Results */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map(place => (
              <PlaceCard
                key={place.id}
                title={place.title}
                category={place.category}
                rating={place.rating}
                reviewCount={place.reviewCount}
                priceRange={place.priceRange}
                imageUrl={place.imageUrl}
                city={place.city}
                tags={place.tags}
                href={`/place/${place.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlaces.map(place => (
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
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredPlaces.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-medium">No places found</h3>
            <p className="mx-auto max-w-md text-muted-foreground">
              We couldn&apos;t find any places matching &quot;{searchQuery}&quot;. Try adjusting your search terms or
              filters.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredPlaces.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        )}

        {/* Related Searches */}
        {filteredPlaces.length > 0 && queryParam && (
          <div className="mt-12 border-t pt-8">
            <h2 className="mb-4 text-xl font-semibold">Related Searches</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'best ' + queryParam,
                queryParam + ' near me',
                'top rated ' + queryParam,
                queryParam + ' with views',
                'affordable ' + queryParam,
              ].map((term, index) => (
                <Button key={index} variant="outline" size="sm" className="rounded-full">
                  <Search className="mr-2 h-3.5 w-3.5" />
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
