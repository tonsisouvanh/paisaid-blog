'use client';
import { PhotoType } from '@/hooks/use-post';
import React, { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

type Props = {
  photos: PhotoType[];
};

const ImageCarousel = ({ photos }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);

      // Auto-scroll the active thumbnail into view
      const activeThumb = thumbnailRefs.current[current - 1];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    });
  }, [api, current]);

  return (
    <div className="relative w-full">
      {/* Main Image Carousel */}
      <Carousel setApi={setApi} className="relative w-full overflow-hidden rounded-lg">
        <CarouselContent className="flex items-center">
          {photos.map((photo, index) => (
            <CarouselItem key={index} className="relative h-full">
              <Image
                width={500}
                height={500}
                priority
                src={photo.url}
                alt={`Image ${index + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-5 top-[50%] -translate-y-1/2 transform" />
        <CarouselNext className="absolute right-5 top-[50%] -translate-y-1/2 transform" />
      </Carousel>

      {/* Pagination Dots */}
      <div className="mt-4 flex justify-center space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              current - 1 === index ? 'scale-125 bg-primary' : 'bg-gray-300'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>

      {/* Thumbnails - Auto Scroll to Active Image */}
      <div className="scrollbar-hide mt-4 flex space-x-2 overflow-x-auto px-4 py-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            ref={(el: any) => (thumbnailRefs.current[index] = el)}
            onClick={() => api?.scrollTo(index)}
            className="shrink-0 focus:outline-none"
          >
            <Image
              width={60}
              height={60}
              src={photo.url}
              alt={`Thumbnail ${index + 1}`}
              className={`h-16 w-16 rounded-md border-2 object-cover transition ${
                current - 1 === index ? 'scale-110 border-primary' : 'border-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
