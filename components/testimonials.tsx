"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  RefreshCw,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Review {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  language?: string;
}

interface PlaceDetails {
  name: string;
  rating: number;
  total_ratings: number;
  address: string;
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: [0, 0, 0, 0, 0],
  });
  const [mounted, setMounted] = useState(false);

  const testimonialsToShow = 3;
  const PLACE_ID = "ChIJH1RWm7QUrjsRYX8Z7aH1ZDU"; // Tweak7 Place ID

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate rating statistics
  const calculateStats = useCallback((reviewsList: Review[]) => {
    if (reviewsList.length === 0) return;

    const total = reviewsList.length;
    const sum = reviewsList.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / total;

    const distribution = [0, 0, 0, 0, 0];
    reviewsList.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1]++;
      }
    });

    setStats({
      averageRating: parseFloat(average.toFixed(1)),
      totalReviews: total,
      ratingDistribution: distribution,
    });
  }, []);

  // Fetch reviews from Google Maps
  const fetchReviews = useCallback(async () => {
    try {
      setError(null);

      // Using a proxy to avoid CORS issues in development
      // Uncomment this for production
      /*
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,formatted_address,reviews&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "OK" && data.result) {
        // Set place details
        setPlaceDetails({
          name: data.result.name || "Tweak7",
          rating: data.result.rating || 0,
          total_ratings: data.result.user_ratings_total || 0,
          address: data.result.formatted_address || "",
        });

        // Process and set reviews
        const reviewsData = data.result.reviews || [];
        const formattedReviews = reviewsData.map(
          (review: any, index: number) => ({
            id: `review-${index}-${review.time || Date.now()}`,
            author_name: review.author_name,
            author_url: review.author_url,
            profile_photo_url: review.profile_photo_url,
            rating: review.rating,
            relative_time_description: review.relative_time_description,
            text: review.text,
            time: review.time,
            language: review.language,
          })
        );

        setReviews(formattedReviews);
        calculateStats(formattedReviews);
      } else {
        throw new Error(data.error_message || "Failed to fetch reviews");
      }
      */

      // Fallback to mock data - use this for development
      // Use static data that doesn't change between server and client
      const mockReviews = [
        {
          id: "1",
          author_name: "Rahul Sharma",
          profile_photo_url: "",
          rating: 5,
          relative_time_description: "a week ago",
          text: "Excellent service! My car was ready sooner than expected. Professional staff and reasonable pricing. Highly recommended!",
          time: 1734987600000, // Fixed timestamp
        },
        {
          id: "2",
          author_name: "Priya Patel",
          profile_photo_url: "",
          rating: 4,
          relative_time_description: "2 weeks ago",
          text: "Good experience overall. The team was knowledgeable and explained everything clearly. Will visit again for regular service.",
          time: 1734382800000, // Fixed timestamp
        },
        {
          id: "3",
          author_name: "Ankit Verma",
          profile_photo_url: "",
          rating: 5,
          relative_time_description: "3 days ago",
          text: "Best car service in Bangalore! They fixed issues that other shops couldn't identify. Quality work at fair prices.",
          time: 1734896400000, // Fixed timestamp
        },
        {
          id: "4",
          author_name: "Sneha Reddy",
          profile_photo_url: "",
          rating: 5,
          relative_time_description: "1 month ago",
          text: "Reliable service with transparent pricing. Will definitely come back for regular maintenance. Staff is very cooperative.",
          time: 1732482000000, // Fixed timestamp
        },
        {
          id: "5",
          author_name: "Vikram Singh",
          profile_photo_url: "",
          rating: 4,
          relative_time_description: "2 days ago",
          text: "Prompt service and good attention to detail. The car feels brand new after service. Pricing could be more competitive.",
          time: 1734973200000, // Fixed timestamp
        },
        {
          id: "6",
          author_name: "Neha Gupta",
          profile_photo_url: "",
          rating: 5,
          relative_time_description: "5 hours ago",
          text: "Amazing experience! They went above and beyond to fix my car's issues. Very professional and courteous staff.",
          time: 1735002000000, // Fixed timestamp
        },
      ];

      setReviews(mockReviews);
      calculateStats(mockReviews);
      setPlaceDetails({
        name: "Tweak7 - Silk Board | Multi Brand Car & Bike Service",
        rating: 4.8,
        total_ratings: 127,
        address: "Bangalore, Karnataka",
      });
    } catch (err: any) {
      console.error("Error fetching reviews:", err);
      setError(
        err.message || "Unable to load reviews. Showing sample reviews."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [calculateStats]);

  useEffect(() => {
    if (mounted) {
      fetchReviews();
    }
  }, [fetchReviews, mounted]);

  useEffect(() => {
    if (mounted && reviews.length > testimonialsToShow) {
      const timer = setInterval(() => {
        setCurrentIndex(
          (prev) => (prev + 1) % (reviews.length - testimonialsToShow + 1)
        );
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [reviews, mounted]);

  const nextReview = () => {
    if (reviews.length <= testimonialsToShow) return;
    setCurrentIndex(
      (prev) => (prev + 1) % (reviews.length - testimonialsToShow + 1)
    );
  };

  const prevReview = () => {
    if (reviews.length <= testimonialsToShow) return;
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (reviews.length - testimonialsToShow + 1)) %
        (reviews.length - testimonialsToShow + 1)
    );
  };

  const refreshReviews = () => {
    setRefreshing(true);
    fetchReviews();
  };

  const visibleReviews =
    reviews.length <= testimonialsToShow
      ? reviews
      : reviews.slice(
          currentIndex,
          Math.min(currentIndex + testimonialsToShow, reviews.length)
        );

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // If not mounted yet, render simple static content
  if (!mounted) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Simple static header for SSR */}
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-100 text-blue-700 hover:bg-blue-100">
              <MapPin className="h-3 w-3 mr-1" />
              LIVE GOOGLE REVIEWS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Customer Testimonials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from our valued customers on Google Maps
            </p>
          </div>

          {/* Simple loading skeletons for SSR */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-1.5 text-sm bg-blue-100 text-blue-700 hover:bg-blue-100">
            <MapPin className="h-3 w-3 mr-1" />
            LIVE GOOGLE REVIEWS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Customer Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real feedback from our valued customers on Google Maps
          </p>

          {/* Place Details Card */}
          {placeDetails && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 inline-block"
            >
              <Card className="inline-block">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="text-center sm:text-left">
                      <h3 className="font-bold text-lg">{placeDetails.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {placeDetails.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="text-2xl font-bold">
                            {placeDetails.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {placeDetails.total_ratings} reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Loading State */}
        {/* {loading && !refreshing && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )} */}

        {/* Reviews Grid - Only render when mounted and loaded */}
        {!loading && reviews.length > 0 && (
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            {reviews.length > testimonialsToShow && (
              <>
                <button
                  onClick={prevReview}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={nextReview}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={currentIndex >= reviews.length - testimonialsToShow}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border hover:border-blue-200">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Rating and Time */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex">
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
                          <span className="text-sm font-semibold text-gray-700">
                            {review.rating}.0
                          </span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center text-xs text-muted-foreground cursor-help">
                                <Clock className="h-3 w-3 mr-1" />
                                {review.relative_time_description}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reviewed {review.relative_time_description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {/* Review Text */}
                      <div className="flex-grow mb-6">
                        <p className="text-muted-foreground italic line-clamp-5">
                          "{review.text}"
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-4 border-t">
                        <Avatar className="h-12 w-12 border-2 border-white shadow">
                          <AvatarImage
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            // Remove onError handler for SSR compatibility
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
                            {review.author_name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">
                            {review.author_name}
                          </h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">Google Local Guide</span>
                          </div>
                        </div>
                        {review.author_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              window.open(review.author_url, "_blank")
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination Dots */}
            {reviews.length > testimonialsToShow && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({
                  length: Math.ceil(reviews.length / testimonialsToShow),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * testimonialsToShow)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex >= index * testimonialsToShow &&
                      currentIndex < (index + 1) * testimonialsToShow
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        {!loading && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Rating Distribution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = stats.ratingDistribution[rating - 1] || 0;
                      const percentage =
                        stats.totalReviews > 0
                          ? (count / stats.totalReviews) * 100
                          : 0;

                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-20">
                            <span className="text-sm font-medium w-4">
                              {rating}
                            </span>
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">
                        {stats.averageRating}
                      </div>
                      <div className="flex justify-center mb-3">
                        {renderStars(stats.averageRating)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {stats.totalReviews} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3bae15c220bc5641:0xe126f669310075b7!12e1?source=g.page.m.dd._&laa=lu-desktop-reviews-dialog-review-solicitation",
                  "_blank"
                )
              }
              className="gap-2 px-8"
            >
              <Star className="h-5 w-5" />
              Write a Review
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Tweak7+-+Silk+Board+%7C+Multi+Brand+Car+%26+Bike+Service/@12.9572257,77.7012913,17z/data=!4m8!3m7!1s0x3bae15c220bc5641:0xe126f669310075b7!8m2!3d12.9572257!4d77.7038662!9m1!1b1!16s%2Fg%2F11tyf42nqy?entry=ttu",
                  "_blank"
                )
              }
              className="gap-2 px-8"
            >
              <MapPin className="h-5 w-5" />
              View on Google Maps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
