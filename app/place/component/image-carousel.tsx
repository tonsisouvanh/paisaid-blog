'use client';

import type React from 'react';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { PhotoType } from '@/hooks/use-post';

interface ImageCarouselProps {
  images: PhotoType[];
  initialIndex?: number;
  onClose?: () => void;
  className?: string;
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export function ImageCarousel({
  images,
  initialIndex = 0,
  onClose,
  className,
  fullscreen = false,
  onToggleFullscreen,
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Reset to initial index when images change
  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex, images]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeIndex) return;

    setIsTransitioning(true);
    setActiveIndex(index);

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onClose]);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-focus the carousel container for keyboard navigation
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.focus();
    }
  }, []);

  return (
    <div
      className={cn(
        'relative overflow-hidden outline-none',
        fullscreen ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-sm' : 'h-full w-full',
        className
      )}
      ref={carouselRef}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main image display */}
      <div className="relative flex h-full w-full items-center justify-center">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out',
              index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.url || '/placeholder.svg'}
                alt={'PaisaiD'}
                fill
                className={cn(
                  'object-contain transition-transform duration-300',
                  fullscreen ? 'object-contain' : 'object-cover'
                )}
                priority={index === activeIndex}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4',
          fullscreen ? 'bg-gradient-to-b from-black/50 to-transparent' : ''
        )}
      >
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-background/80 text-foreground hover:bg-background/90"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        )}

        <div className="flex items-center gap-2">
          <span className="rounded-md bg-background/80 px-2 py-1 text-xs font-medium">
            {activeIndex + 1} / {images.length}
          </span>

          {onToggleFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFullscreen}
              className="rounded-full bg-background/80 text-foreground hover:bg-background/90"
            >
              {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              <span className="sr-only">{fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 text-foreground hover:bg-background/90"
        onClick={prevSlide}
        disabled={isTransitioning}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 text-foreground hover:bg-background/90"
        onClick={nextSlide}
        disabled={isTransitioning}
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Thumbnails */}
      {images.length > 1 && !isMobile && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 px-4">
          <div className="flex max-w-full gap-2 overflow-x-auto rounded-lg bg-background/80 p-2 backdrop-blur-sm">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={cn(
                  'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md transition-all',
                  index === activeIndex ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : 'false'}
              >
                <Image src={image.url || '/placeholder.svg'} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile indicator dots */}
      {images.length > 1 && isMobile && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                index === activeIndex ? 'w-4 bg-primary' : 'bg-background/70'
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
