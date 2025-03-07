'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

export default function HeroCarousel({ items, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  // Pause auto-play when user interacts with carousel
  const handleInteraction = () => {
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div
      className="relative h-[50vh] overflow-hidden md:h-[60vh]"
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
            style={{
              backgroundImage: `url('${item.imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden={index !== currentIndex}
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black" />
            <div className="container relative z-20 flex h-full flex-col items-center justify-center px-4">
              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
                  {item.title}
                </h1>
                <p className="mx-auto max-w-[700px] text-base text-white/90 drop-shadow-md md:text-lg">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full bg-background/20 text-white hover:bg-background/40 sm:flex"
        onClick={() => {
          prevSlide();
          handleInteraction();
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full bg-background/20 text-white hover:bg-background/40 sm:flex"
        onClick={() => {
          nextSlide();
          handleInteraction();
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? 'w-4 bg-white' : 'bg-white/50'}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
}

// "use client"

// import { useState, useEffect, useCallback, useRef } from "react"
// import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { motion, AnimatePresence } from "framer-motion"
// import useKeyPress from "@/hooks/use-key-press"
// import { useSwipeable } from "react-swipeable"

// interface CarouselItem {
//   id: number
//   imageUrl: string
//   title: string
//   subtitle: string
// }

// interface HeroCarouselProps {
//   items: CarouselItem[]
//   autoPlayInterval?: number
//   className?: string
// }

// export default function HeroCarousel({ items, autoPlayInterval = 5000, className }: HeroCarouselProps) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
//   const [progress, setProgress] = useState(0)
//   const [isHovered, setIsHovered] = useState(false)
//   const progressInterval = useRef<NodeJS.Timeout>()
//   const announcer = useRef<HTMLDivElement>(null)

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
//     setProgress(0)
//   }, [items.length])

//   const prevSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
//     setProgress(0)
//   }, [items.length])

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index)
//     setProgress(0)
//     announceSlideChange(index)
//   }

//   const announceSlideChange = (index: number) => {
//     if (announcer.current) {
//       announcer.current.textContent = `Showing slide ${index + 1} of ${items.length}: ${items[index].title}`
//     }
//   }

//   // Keyboard navigation
//   useKeyPress("ArrowLeft", prevSlide)
//   useKeyPress("ArrowRight", nextSlide)
//   useKeyPress("Space", () => setIsAutoPlaying((prev) => !prev))

//   // Touch swipe handlers
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: nextSlide,
//     onSwipedRight: prevSlide,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   })

//   // Progress bar and auto-play
//   useEffect(() => {
//     if (isAutoPlaying && !isHovered) {
//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             nextSlide()
//             return 0
//           }
//           return prev + 100 / (autoPlayInterval / 100)
//         })
//       }, 100)

//       return () => clearInterval(interval)
//     }
//   }, [isAutoPlaying, nextSlide, autoPlayInterval, isHovered])

//   // Preload images
//   useEffect(() => {
//     items.forEach((item) => {
//       const img = new Image()
//       img.src = item.imageUrl
//     })
//   }, [items])

//   return (
//     <div
//       className={cn("relative h-[60vh] md:h-[80vh] overflow-hidden group", className)}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       {...swipeHandlers}
//     >
//       {/* Accessibility announcer */}
//       <div className="sr-only" role="status" ref={announcer} aria-live="polite" />

//       {/* Slides */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.7 }}
//           className="absolute inset-0"
//         >
//           <div
//             className="absolute inset-0 h-full w-full"
//             style={{
//               backgroundImage: `url('${items[currentIndex].imageUrl}')`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             {/* Gradient overlays */}
//             <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
//             <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

//             {/* Content */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//               className="container relative z-20 flex h-full flex-col items-center justify-center px-4"
//             >
//               <div className="mx-auto max-w-3xl space-y-6 text-center">
//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5, duration: 0.5 }}
//                   className="text-3xl font-bold tracking-tighter text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl"
//                 >
//                   {items[currentIndex].title}
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.7, duration: 0.5 }}
//                   className="mx-auto max-w-[700px] text-base text-white/90 drop-shadow-md md:text-lg lg:text-xl"
//                 >
//                   {items[currentIndex].subtitle}
//                 </motion.p>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Controls */}
//       <div className="absolute inset-0 z-30 flex items-center justify-between p-4">
//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-12 w-12 rounded-full bg-black/20 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/40 group-hover:opacity-100"
//           onClick={prevSlide}
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="h-6 w-6" />
//         </Button>

//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-12 w-12 rounded-full bg-black/20 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/40 group-hover:opacity-100"
//           onClick={nextSlide}
//           aria-label="Next slide"
//         >
//           <ChevronRight className="h-6 w-6" />
//         </Button>
//       </div>

//       {/* Bottom Controls */}
//       <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/60 to-transparent p-6">
//         <div className="container mx-auto flex items-center justify-between">
//           {/* Thumbnails */}
//           <div className="hidden md:flex items-center gap-2 overflow-x-auto">
//             {items.map((item, index) => (
//               <button
//                 key={item.id}
//                 onClick={() => goToSlide(index)}
//                 className={cn(
//                   "relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-all",
//                   index === currentIndex
//                     ? "border-white opacity-100 scale-110"
//                     : "border-transparent opacity-50 hover:opacity-75",
//                 )}
//                 aria-label={`Go to slide ${index + 1}`}
//                 aria-current={index === currentIndex}
//               >
//                 <img src={item.imageUrl || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
//               </button>
//             ))}
//           </div>

//           {/* Controls */}
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
//               onClick={() => setIsAutoPlaying((prev) => !prev)}
//               aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
//             >
//               {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//             </Button>

//             {/* Indicator Dots (mobile) */}
//             <div className="flex md:hidden items-center gap-2">
//               {items.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={cn(
//                     "h-2 rounded-full transition-all",
//                     index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50",
//                   )}
//                   aria-label={`Go to slide ${index + 1}`}
//                   aria-current={index === currentIndex}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
//           <motion.div className="h-full bg-white" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
//         </div>
//       </div>
//     </div>
//   )
// }
