"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsToShow = 3; // Number of testimonials to display at once

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % (reviews.length - testimonialsToShow + 1)
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % (reviews.length - testimonialsToShow + 1)
    );
  };

  const prevReview = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (reviews.length - testimonialsToShow + 1)) %
        (reviews.length - testimonialsToShow + 1)
    );
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + testimonialsToShow
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read reviews from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic flex-grow">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {review.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            disabled={currentIndex >= reviews.length - testimonialsToShow}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3bae15c220bc5641:0xe126f669310075b7!12e1?source=g.page.m.dd._&laa=lu-desktop-reviews-dialog-review-solicitation",
                  "_blank"
                )
              }
              variant="outline"
              className="px-8 py-6 text-lg"
            >
              Add Testimonial
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "https://www.google.com/search?cs=0&hl=en-US&output=search&q=Tweak7+-+Silk+board+%7C+Multi+Brand+Car+%26+Bike+Service&ludocid=16223925639302903223&gsas=1&client=ms-android-oneplus-rvo3&lsig=AB86z5UMXjF7Ye3Bo7XVJNz34pFa&kgs=ccc7b8a79351f727&shndl=-1&source=sh/x/kp/local/4",
                  "_blank"
                )
              }
              variant="outline"
              className="px-8 py-6 text-lg mx-2"
            >
              View Testimonial
            </Button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({
              length: reviews.length - testimonialsToShow + 1,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
