'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Filter, Grid, List, Search, X, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { categories, cities, topRatedPlaces } from './data';
import { getPriceSymbol } from '@/lib/utils';

export default function TopRatedPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(4.5);
  const [sortOption, setSortOption] = useState('rating-desc');
  const [filteredPlaces, setFilteredPlaces] = useState(topRatedPlaces);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply filters
  useEffect(() => {
    let result = [...topRatedPlaces];

    // Search query filter
    if (searchQuery) {
      result = result.filter(
        place =>
          place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          place.description.toLowerCase().includes(searchQuery.toLowerCase())
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
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedCities([]);
    setPriceRange([]);
    setMinRating(4.5);
    setSortOption('rating-desc');
  };

  // Count active filters
  const activeFilterCount =
    selectedCategories.length + selectedCities.length + priceRange.length + (minRating > 4.5 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-6 md:py-10">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Top Rated Places</h1>
          <p className="text-muted-foreground">
            Discover the highest-rated destinations loved by our community of travelers
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search top rated places..."
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
                <div className="py-4">
                  <h2 className="mb-4 text-lg font-semibold">Filter Top Rated Places</h2>
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
                            min={4}
                            max={5}
                            step={0.1}
                            onValueChange={value => setMinRating(value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>4.0</span>
                            <span>4.5</span>
                            <span>5.0</span>
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
            {minRating > 4.5 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {minRating}+ Stars
                <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRating(4.5)} />
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'} found
        </div>

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
                tags={[]}
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
              We couldn&apos;t find any top-rated places matching your current filters. Try adjusting your search
              criteria or clearing some filters.
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
      </main>
    </div>
  );
}
