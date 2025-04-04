'use client';

import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import HtmlParser from '@/components/html-parser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { placeData } from '@/data';
import { OpeningHoursType, useGetPost } from '@/hooks/use-post';
import { getPriceSymbol } from '@/lib/utils';
import { upperFirst } from 'lodash';
import {
  Clock,
  Flag,
  Globe,
  Heart,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import PlaceLoading from '../[slug]/loading';
import { ImageCarousel } from './image-carousel';
import LocationTab from './location-tab';

type Props = {
  slug: string;
};

// Format date to readable string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function PlaceDetail({ slug }: Props) {
  const { data: postData, isLoading } = useGetPost(slug);
  const photos = postData && postData.photos && postData.photos?.length > 0 ? postData.photos : [];
  const [isSaved, setIsSaved] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  // In a real app, you would fetch the place data based on the slug
  // For this example, we're using mock data
  const place = placeData;

  // Calculate average rating TODO: integrate require
  const calculateAverageRating = () => {
    let totalStars = 0;
    let totalReviews = 0;

    Object.entries(place.ratingBreakdown).forEach(([stars, count]) => {
      totalStars += Number(stars) * count;
      totalReviews += count;
    });

    return totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : '0.0';
  };

  if (isLoading) {
    return <PlaceLoading />;
  }

  // Handle image navigation in gallery
  const nextImage = () => {
    setActiveImageIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const parsedOpeningHours: OpeningHoursType = JSON.parse((postData?.openingHours as string) || '{"message":"N/A"}');

  return (
    <div className="min-h-screen bg-background">
      {!postData ? (
        <>
          <EmptyState title="No data found" />
        </>
      ) : (
        <main className="pb-12">
          {/* Breadcrumb */}
          <DynamicBreadcrumb
            className="container py-2"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Explore', href: '/explore' },
              { label: place.category, href: `/categories/${place.category.toLowerCase()}` },
              { label: place.title },
            ]}
          />

          {/* Image Gallery */}
          <section className="container mx-auto mb-6 px-4">
            {/* <div className="grid h-[300px] grid-cols-1 gap-2 md:h-[400px] md:grid-cols-2 lg:grid-cols-3">
              <div className="relative col-span-1 row-span-2 overflow-hidden rounded-lg md:col-span-1 lg:col-span-2">
                <Image
                  src={photos[0]?.url || '/placeholder.svg'}
                  alt={photos[0]?.altText || 'Paisaid'}
                  fill
                  quality={100}
                  className="cursor-pointer object-cover"
                  onClick={() => {
                    setActiveImageIndex(0);
                    setIsGalleryOpen(true);
                  }}
                />
              </div>
              {photos?.slice(1, 5).map((image, index) => (
                <div key={image.id} className="relative hidden overflow-hidden rounded-lg md:block">
                  <Image
                    src={image?.url || '/placeholder.svg'}
                    alt={image?.altText || 'Paisaid'}
                    fill
                    className="cursor-pointer object-cover"
                    onClick={() => {
                      setActiveImageIndex(index + 1);
                      setIsGalleryOpen(true);
                    }}
                  />
                  {index === 3 && photos.length > 5 && (
                    <div
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60"
                      onClick={() => {
                        setActiveImageIndex(4);
                        setIsGalleryOpen(true);
                      }}
                    >
                      <span className="text-lg font-medium text-white">+{photos.length - 5} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div> */}
            <div className="relative flex h-[300px] flex-col gap-2 md:h-[400px] md:flex-row">
              {/* Main Image with Navigation Arrows */}
              <div className="relative h-full w-full overflow-hidden rounded-lg md:w-1/2">
                <Image
                  src={photos[activeImageIndex]?.url || '/placeholder.svg'}
                  alt={photos[activeImageIndex]?.altText || 'Main Image'}
                  fill
                  quality={100}
                  className="cursor-pointer object-cover"
                  onClick={() => {
                    setActiveImageIndex(activeImageIndex);
                    setIsGalleryOpen(true);
                  }}
                />
                {/* Navigation Arrows */}
                <button
                  onClick={() => setActiveImageIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 hover:bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImageIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 hover:bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* Image Counter */}
                <div className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                  {activeImageIndex + 1} / {photos.length}
                </div>
              </div>

              {/* Thumbnails on the Right */}
              <div className="grid h-full w-full grid-cols-2 gap-2 md:w-1/2">
                {photos?.slice(0, 4).map((image, index) => (
                  <div key={image.id} className="relative overflow-hidden rounded-lg">
                    <Image
                      src={image?.url || '/placeholder.svg'}
                      alt={image?.altText || 'Thumbnail'}
                      fill
                      className="cursor-pointer object-cover"
                      onClick={() => {
                        setActiveImageIndex(index);
                        setIsGalleryOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
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
              View All Photos ({photos.length})
            </Button>

            {/* Image Gallery Dialog */}
            {/* Image Carousel for Gallery View */}
            {isGalleryOpen && (
              <div className={isFullscreen ? 'fixed inset-0 z-50' : 'fixed inset-0 z-50 p-4 md:p-12'}>
                <ImageCarousel
                  images={postData?.photos || []}
                  initialIndex={activeImageIndex}
                  onClose={() => {
                    setIsGalleryOpen(false);
                    setIsFullscreen(false);
                  }}
                  fullscreen={isFullscreen}
                  onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                />
              </div>
            )}
          </section>

          {/* Place Header */}
          <section className="container mx-auto mb-8 px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="secondary">{postData.category?.name}</Badge>
                  <Badge variant="outline">{getPriceSymbol(postData.priceRange || '')}</Badge>
                </div>
                <h1 className="mb-2 text-2xl font-bold md:text-3xl">{upperFirst(postData.title)}</h1>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="ml-1 font-medium">{postData.avgRating}</span>
                  </div>
                  <span className="text-muted-foreground">({postData.reviewCount} reviews)</span>
                </div>
                <div className="mb-4 flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{postData.address}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {postData.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row md:mt-0">
                <Button
                  variant={isSaved ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setIsSaved(!isSaved)}
                >
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
          <section className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column - Details */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="about">
                  <TabsList className="mb-6 grid w-full grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger className="hidden" value="reviews">
                      Reviews
                    </TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="map">Map</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-6">
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="mb-4 text-xl font-semibold">About {upperFirst(postData.title)}</h2>
                        <div className="space-y-4 overflow-hidden text-muted-foreground">
                          <HtmlParser html={postData.content} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                          {postData.tags?.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              {getAmenityIcon(amenity.icon)}
                            </div> */}
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
                            <div className="mb-4 text-sm text-muted-foreground">
                              Based on {postData.reviewCount || 0} reviews
                            </div>
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
                                        (postData.reviewCount || 0)) *
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

                    <div className="hidden space-y-4">
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
                          {photos?.map((image, index) => (
                            <div
                              key={image.id}
                              className="relative aspect-square cursor-pointer overflow-hidden rounded-md"
                              onClick={() => {
                                setActiveImageIndex(index);
                                setIsGalleryOpen(true);
                              }}
                            >
                              <Image
                                src={image?.url || '/placeholder.svg'}
                                alt={image?.altText || 'Paisaid'}
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
                    <LocationTab postData={postData} />
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
                              {Object.entries(parsedOpeningHours).map(([day, value]) => (
                                <div key={day} className="flex justify-between gap-5">
                                  <span className={day === today ? 'font-medium text-primary' : ''}>{day}</span>
                                  <span>{value.hours}</span>
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
                                <a href={`tel:${postData.phone}`} className="text-primary">
                                  {postData.phone}
                                </a>
                              </div>
                              <div>
                                Email:{' '}
                                <a href={`mailto:${postData.email}`} className="text-primary">
                                  {postData.email}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 overflow-hidden">
                          <Globe className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="mb-1 font-medium">Website</h3>
                            <a
                              href={place.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate text-sm text-primary"
                            >
                              {postData.website?.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hidden">
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
      )}
    </div>
  );
}
