'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Flag,
  Globe,
  Heart,
  Info,
  MapPin,
  MessageSquare,
  ParkingCircle,
  Phone,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
  Users,
  Utensils,
  Wifi,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for the place
const placeData = {
  id: 1,
  title: 'Coastal Breeze Cafe',
  slug: 'coastal-breeze-cafe',
  category: 'Cafes',
  rating: 4.8,
  reviewCount: 124,
  priceRange: 'MEDIUM',
  description:
    'A charming beachside cafe offering fresh, locally-sourced ingredients with a focus on seafood and vegetarian options. Enjoy stunning ocean views while savoring artisanal coffee and homemade pastries.',
  longDescription:
    "Nestled along the picturesque coastline, Coastal Breeze Cafe has been a beloved local gem since 2015. Our philosophy centers around sustainability, community, and creating memorable dining experiences. We work directly with local farmers and fishermen to bring you the freshest ingredients possible, transformed into delicious meals by our talented culinary team.\n\nOur spacious outdoor terrace offers panoramic ocean views, making it the perfect spot for a relaxing breakfast, casual lunch, or sunset dinner. Inside, our thoughtfully designed space combines coastal charm with modern comfort, featuring reclaimed wood furnishings, abundant natural light, and local artwork.\n\nWhether you're a coffee connoisseur, brunch enthusiast, or seeking a tranquil spot to enjoy the sea breeze, we welcome you to experience our unique blend of exceptional food, warm hospitality, and breathtaking scenery.",
  address: '123 Ocean Avenue, San Francisco, CA 94123',
  city: 'San Francisco',
  state: 'California',
  country: 'United States',
  latitude: 37.7749,
  longitude: -122.4194,
  phone: '+1 (415) 555-7890',
  website: 'https://coastalbreezecafe.com',
  email: 'info@coastalbreezecafe.com',
  hours: [
    { day: 'Monday', open: '7:00 AM', close: '8:00 PM' },
    { day: 'Tuesday', open: '7:00 AM', close: '8:00 PM' },
    { day: 'Wednesday', open: '7:00 AM', close: '8:00 PM' },
    { day: 'Thursday', open: '7:00 AM', close: '9:00 PM' },
    { day: 'Friday', open: '7:00 AM', close: '10:00 PM' },
    { day: 'Saturday', open: '8:00 AM', close: '10:00 PM' },
    { day: 'Sunday', open: '8:00 AM', close: '8:00 PM' },
  ],
  tags: ['Outdoor Seating', 'Ocean View', 'Vegan Options', 'Wifi', 'Pet Friendly', 'Brunch'],
  amenities: [
    { name: 'Outdoor Seating', icon: 'utensils' },
    { name: 'Free Wifi', icon: 'wifi' },
    { name: 'Parking Available', icon: 'parking-circle' },
    { name: 'Credit Cards Accepted', icon: 'credit-card' },
    { name: 'Reservations', icon: 'calendar' },
    { name: 'Group Friendly', icon: 'users' },
  ],
  images: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Coastal Breeze Cafe exterior',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1517248135467-4c7ed4e2ae98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwyfGNvYXN0YWwlMjBjYWZlJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzA4MTI1MTU2fDA&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Coastal Breeze Cafe interior',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwxfGZvb2QlMjBjYWZlfGVufDB8fHx8MTcwODEyNTIxN3ww&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Food at Coastal Breeze Cafe',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1563911302283-d2bc12959841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwxfG91dGRvb3IlMjBjYWZlJTIwc2VhdGluZyUyMGFyZWF8ZW58MHx8fHwxNzA4MTI1MjY0fDA&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Outdoor seating area',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwxfG9jZWFuJTIwdmlldyUyMGNhZmV8ZW58MHx8fHwxNzA4MTI1MzA5fDA&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Ocean view from the cafe',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY1ODh8MHwxfHNlYXJjaHwxfGNvZmZlZSUyMGFuZCUyMHBhc3RyaWVzfGVufDB8fHx8MTcwODEyNTM0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
      alt: 'Coffee and pastries',
    },
  ],
  reviews: [
    {
      id: 1,
      user: { name: 'Sarah J.', image: '/placeholder.svg?height=100&width=100', location: 'San Francisco, CA' },
      rating: 5,
      date: '2023-08-15',
      title: 'Perfect spot for breakfast with a view!',
      content:
        "I can't say enough good things about this cafe! The location is absolutely stunning with panoramic ocean views from the terrace. I had the avocado toast and a latte, both were exceptional. The staff was friendly and attentive without being intrusive. Will definitely be back next time I'm in town!",
      helpful: 24,
      photos: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'],
    },
    {
      id: 2,
      user: { name: 'Michael T.', image: '/placeholder.svg?height=100&width=100', location: 'Chicago, IL' },
      rating: 4,
      date: '2023-07-22',
      title: 'Great food, slightly pricey',
      content:
        "Visited during my vacation and really enjoyed the atmosphere and food quality. The seafood pasta was fresh and delicious, and the view can't be beat. Only giving 4 stars because I found it a bit on the expensive side, but I understand the premium location. Would still recommend!",
      helpful: 15,
      photos: [],
    },
    {
      id: 3,
      user: { name: 'Emma L.', image: '/placeholder.svg?height=100&width=100', location: 'Los Angeles, CA' },
      rating: 5,
      date: '2023-06-30',
      title: 'Dog-friendly heaven!',
      content:
        "As a dog owner, I'm always looking for pet-friendly places with good food, and Coastal Breeze exceeds expectations! They even brought water for my pup without me asking. The breakfast burrito is to die for, and their house-made hot sauce adds the perfect kick. The staff remembered me on my second visit, which was a nice touch.",
      helpful: 19,
      photos: ['/placeholder.svg?height=300&width=400'],
    },
    {
      id: 4,
      user: { name: 'David R.', image: '/placeholder.svg?height=100&width=100', location: 'New York, NY' },
      rating: 3,
      date: '2023-09-05',
      title: 'Beautiful location, slow service',
      content:
        "The cafe has an amazing location and the food was good when it finally arrived. Unfortunately, we waited over 40 minutes for our order on a weekday that wasn't particularly busy. The staff was apologetic but it did impact our experience. The coffee and pastries were excellent though.",
      helpful: 8,
      photos: [],
    },
  ],
  ratingBreakdown: {
    5: 78,
    4: 32,
    3: 10,
    2: 3,
    1: 1,
  },
  nearbyPlaces: [
    {
      id: 101,
      title: 'Oceanview Hotel',
      category: 'Hotels',
      rating: 4.7,
      reviewCount: 89,
      priceRange: 'LUXURY',
      imageUrl: '/placeholder.svg?height=400&width=600',
      city: 'San Francisco',
      tags: ['Ocean View', 'Spa'],
      href: '/place/oceanview-hotel',
    },
    {
      id: 102,
      title: 'Sunset Beach Restaurant',
      category: 'Restaurants',
      rating: 4.5,
      reviewCount: 156,
      priceRange: 'HIGH',
      imageUrl: '/placeholder.svg?height=400&width=600',
      city: 'San Francisco',
      tags: ['Seafood', 'Fine Dining'],
      href: '/place/sunset-beach-restaurant',
    },
    {
      id: 103,
      title: 'Beachside Boutique',
      category: 'Shopping',
      rating: 4.6,
      reviewCount: 67,
      priceRange: 'MEDIUM',
      imageUrl: '/placeholder.svg?height=400&width=600',
      city: 'San Francisco',
      tags: ['Clothing', 'Gifts'],
      href: '/place/beachside-boutique',
    },
  ],
};

// Helper function to get amenity icon
const getAmenityIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'utensils':
      return <Utensils className="h-4 w-4" />;
    case 'wifi':
      return <Wifi className="h-4 w-4" />;
    case 'parking-circle':
      return <ParkingCircle className="h-4 w-4" />;
    case 'credit-card':
      return <CreditCard className="h-4 w-4" />;
    case 'calendar':
      return <Calendar className="h-4 w-4" />;
    case 'users':
      return <Users className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

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

// Format date to readable string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function PlaceDetailPage({ params }: { params: { slug: string } }) {
  const [isSaved, setIsSaved] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // In a real app, you would fetch the place data based on the slug
  // For this example, we're using mock data
  const place = placeData;

  // Calculate average rating
  const calculateAverageRating = () => {
    let totalStars = 0;
    let totalReviews = 0;

    Object.entries(place.ratingBreakdown).forEach(([stars, count]) => {
      totalStars += Number(stars) * count;
      totalReviews += count;
    });

    return totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : '0.0';
  };

  // Handle image navigation in gallery
  const nextImage = () => {
    setActiveImageIndex(prev => (prev === place.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? place.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-12">
        {/* Breadcrumb */}
        <div className="container px-4 py-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link href="/explore" className="hover:text-foreground">
              Explore
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link href={`/categories/${place.category.toLowerCase()}`} className="hover:text-foreground">
              {place.category}
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-foreground">{place.title}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <section className="container mb-6 px-4">
          <div className="grid h-[300px] grid-cols-1 gap-2 md:h-[400px] md:grid-cols-2 lg:grid-cols-3">
            <div className="relative col-span-1 row-span-2 overflow-hidden rounded-lg md:col-span-1 lg:col-span-2">
              <Image
                src={place.images[0].url || '/placeholder.svg'}
                alt={place.images[0].alt}
                fill
                className="cursor-pointer object-cover"
                onClick={() => {
                  setActiveImageIndex(0);
                  setIsGalleryOpen(true);
                }}
              />
            </div>
            {place.images.slice(1, 5).map((image, index) => (
              <div key={image.id} className="relative hidden overflow-hidden rounded-lg md:block">
                <Image
                  src={image.url || '/placeholder.svg'}
                  alt={image.alt}
                  fill
                  className="cursor-pointer object-cover"
                  onClick={() => {
                    setActiveImageIndex(index + 1);
                    setIsGalleryOpen(true);
                  }}
                />
                {index === 3 && place.images.length > 5 && (
                  <div
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60"
                    onClick={() => {
                      setActiveImageIndex(4);
                      setIsGalleryOpen(true);
                    }}
                  >
                    <span className="text-lg font-medium text-white">+{place.images.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile View All Photos Button */}
          <Button
            variant="outline"
            className="mt-2 w-full md:hidden"
            onClick={() => {
              setActiveImageIndex(0);
              setIsGalleryOpen(true);
            }}
          >
            View All Photos ({place.images.length})
          </Button>

          {/* Image Gallery Dialog */}
          <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
            <DialogContent className="h-[90vh] w-[90vw] max-w-4xl p-0">
              <div className="relative flex h-full flex-col">
                <DialogHeader className="absolute left-0 right-0 top-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-white">{place.title} - Photos</DialogTitle>
                    <DialogClose className="text-white">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </DialogClose>
                  </div>
                </DialogHeader>

                <div className="flex flex-1 items-center justify-center bg-black">
                  <div className="relative h-full w-full">
                    <Image
                      src={place.images[activeImageIndex].url || '/placeholder.svg'}
                      alt={place.images[activeImageIndex].alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4">
                  <Button variant="ghost" size="icon" className="text-white" onClick={prevImage}>
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous image</span>
                  </Button>
                  <span className="text-sm text-white">
                    {activeImageIndex + 1} / {place.images.length}
                  </span>
                  <Button variant="ghost" size="icon" className="text-white" onClick={nextImage}>
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next image</span>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* Place Header */}
        <section className="container mb-8 px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Badge variant="secondary">{place.category}</Badge>
                <Badge variant="outline">{getPriceSymbol(place.priceRange)}</Badge>
              </div>
              <h1 className="mb-2 text-2xl font-bold md:text-3xl">{place.title}</h1>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="ml-1 font-medium">{place.rating}</span>
                </div>
                <span className="text-muted-foreground">({place.reviewCount} reviews)</span>
              </div>
              <div className="mb-4 flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{place.address}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row md:mt-0">
              <Button variant={isSaved ? 'default' : 'outline'} className="gap-2" onClick={() => setIsSaved(!isSaved)}>
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-primary-foreground' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Write Review
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-6 grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="mb-4 text-xl font-semibold">About {place.title}</h2>
                      <div className="space-y-4 text-muted-foreground">
                        {place.longDescription.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {place.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              {getAmenityIcon(amenity.icon)}
                            </div>
                            <span>{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews">
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex flex-col items-center justify-center md:w-1/3">
                          <div className="mb-2 text-5xl font-bold">{calculateAverageRating()}</div>
                          <div className="mb-1 flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= Math.round(Number.parseFloat(calculateAverageRating()))
                                    ? 'fill-primary text-primary'
                                    : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="mb-4 text-sm text-muted-foreground">Based on {place.reviewCount} reviews</div>
                          <Button>Write a Review</Button>
                        </div>

                        <div className="md:w-2/3">
                          <h3 className="mb-3 font-medium">Rating Distribution</h3>
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map(rating => (
                              <div key={rating} className="flex items-center gap-2">
                                <div className="w-12 text-sm">{rating} stars</div>
                                <Progress
                                  value={
                                    (place.ratingBreakdown[rating as keyof typeof place.ratingBreakdown] /
                                      place.reviewCount) *
                                    100
                                  }
                                  className="h-2 flex-1"
                                />
                                <div className="w-12 text-right text-sm">
                                  {place.ratingBreakdown[rating as keyof typeof place.ratingBreakdown]}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {place.reviews.map(review => (
                      <Card key={review.id}>
                        <CardContent className="pt-6">
                          <div className="mb-4 flex justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={review.user.image} alt={review.user.name} />
                                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.user.name}</div>
                                <div className="text-xs text-muted-foreground">{review.user.location}</div>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">{formatDate(review.date)}</div>
                          </div>

                          <div className="mb-2">
                            <div className="mb-1 flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating ? 'fill-primary text-primary' : 'text-muted'
                                  }`}
                                />
                              ))}
                            </div>
                            <h4 className="font-medium">{review.title}</h4>
                          </div>

                          <p className="mb-4 text-muted-foreground">{review.content}</p>

                          {review.photos.length > 0 && (
                            <div className="mb-4 flex gap-2">
                              {review.photos.map((photo, index) => (
                                <div key={index} className="relative h-20 w-20 overflow-hidden rounded-md">
                                  <Image
                                    src={photo || '/placeholder.svg'}
                                    alt={`Review photo ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="mr-1 h-4 w-4" />
                                Helpful ({review.helpful})
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsDown className="mr-1 h-4 w-4" />
                              Not helpful
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Flag className="mr-1 h-4 w-4" />
                              Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </TabsContent>

                <TabsContent value="photos">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="mb-4 text-xl font-semibold">Photos</h2>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                        {place.images.map((image, index) => (
                          <div
                            key={image.id}
                            className="relative aspect-square cursor-pointer overflow-hidden rounded-md"
                            onClick={() => {
                              setActiveImageIndex(index);
                              setIsGalleryOpen(true);
                            }}
                          >
                            <Image
                              src={image.url || '/placeholder.svg'}
                              alt={image.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="map">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="mb-4 text-xl font-semibold">Location</h2>
                      <div className="relative mb-4 h-[400px] overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=800&width=1200"
                          alt="Map location"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <MapPin className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 text-muted-foreground">
                        <p>{place.address}</p>
                        <p>
                          {place.city}, {place.state} {place.country}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Get Directions</Button>
                        <Button variant="outline">View Larger Map</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Info */}
            <div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="mb-4 text-xl font-semibold">Business Info</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="mb-1 font-medium">Hours</h3>
                          <div className="space-y-1 text-sm">
                            {place.hours.map((hour, index) => (
                              <div key={index} className="flex justify-between">
                                <span
                                  className={`${hour.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }) ? 'font-medium' : ''}`}
                                >
                                  {hour.day}
                                </span>
                                <span>
                                  {hour.open} - {hour.close}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="mb-1 font-medium">Contact</h3>
                          <div className="space-y-1 text-sm">
                            <div>
                              Phone:{' '}
                              <a href={`tel:${place.phone}`} className="text-primary">
                                {place.phone}
                              </a>
                            </div>
                            <div>
                              Email:{' '}
                              <a href={`mailto:${place.email}`} className="text-primary">
                                {place.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Globe className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="mb-1 font-medium">Website</h3>
                          <a
                            href={place.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary"
                          >
                            {place.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="w-full">
                      Claim This Business
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="mb-4 text-xl font-semibold">Nearby Places</h2>
                    <div className="space-y-4">
                      {place.nearbyPlaces.map(nearbyPlace => (
                        <div key={nearbyPlace.id} className="flex gap-3">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={nearbyPlace.imageUrl || '/placeholder.svg'}
                              alt={nearbyPlace.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-medium">{nearbyPlace.title}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                              <span>{nearbyPlace.rating}</span>
                              <span className="mx-1">•</span>
                              <span>{nearbyPlace.category}</span>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {nearbyPlace.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="outline" className="h-4 py-0 text-[10px]">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/explore">Explore More Nearby</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
