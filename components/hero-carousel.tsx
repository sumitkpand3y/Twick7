"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/data";
import { useBookingStore } from "@/store/booking-store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setModalOpen } = useBookingStore();

  const currentSlideData = heroSlides[currentSlide];
  const isVideo = currentSlideData.type === "video";

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = () => {
      heroSlides.forEach((slide, index) => {
        if (slide.type === "image") {
          const img = new window.Image();
          img.src = slide.mediaUrl;
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, index]));
          };
        }
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((currentSlide + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      setIsVideoPlaying(false);
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [currentSlide, isVideo]);

  const goToSlide = (index: number) => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  const renderMedia = () => {
    if (isVideo) {
      return (
        <motion.video
          key={`video-${currentSlide}`}
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onEnded={handleVideoEnd}
        >
          <source src={currentSlideData.mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      );
    } else {
      const isLoaded = loadedImages.has(currentSlide);
      const nextIndex = (currentSlide + 1) % heroSlides.length;
      const nextSlideData = heroSlides[nextIndex];
      const isNextLoaded =
        nextSlideData.type === "image" && loadedImages.has(nextIndex);

      return (
        <>
          {/* Current Slide */}
          <motion.div
            key={`current-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlideData.mediaUrl}
              alt={currentSlideData.title}
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="object-cover"
              style={{ opacity: isLoaded ? 1 : 0 }}
              onLoad={() =>
                setLoadedImages((prev) => new Set([...prev, currentSlide]))
              }
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Preload next slide (hidden) */}
          {!isVideo && isNextLoaded === false && (
            <div className="hidden">
              <Image
                src={nextSlideData.mediaUrl}
                alt="preload"
                fill
                sizes="100vw"
                onLoad={() =>
                  setLoadedImages((prev) => new Set([...prev, nextIndex]))
                }
              />
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[80vh] overflow-hidden">
      {/* Black background to prevent white flash */}
      <div className="absolute inset-0 bg-black z-0" />

      <AnimatePresence mode="wait">{renderMedia()}</AnimatePresence>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10 px-4">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            {currentSlideData.title}
          </motion.h1>
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            {currentSlideData.subtitle}
          </motion.p>
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {currentSlideData.cta}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all duration-300 z-20 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all duration-300 z-20 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-3 rounded-lg bg-white"
                : "w-3 h-3 rounded-full bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Video play/pause indicator */}
      {isVideo && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            {isVideoPlaying ? "▶️ Playing" : "⏸️ Paused"}
          </div>
        </div>
      )}
    </div>
  );
}
