'use client';

import { HeroCarousel } from '@/components/hero-carousel';
import { FeaturedServices } from '@/components/featured-services';
import { Testimonials } from '@/components/testimonials';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookingModal } from '@/components/booking-modal/booking-modal';
import { AuthModal } from '@/components/auth-modal';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { PopularServices } from '@/components/popular-services';
import { BrandsWeService } from '@/components/brands-we-service';
import { WhyChooseUs } from '@/components/why-choose-us';
import { CouponsOffers } from '@/components/coupons-offers';
import { CityAvailability } from '@/components/city-availability';
import { FAQSection } from '@/components/faq-section';
import { StatsCounter } from '@/components/StatsCounter';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroCarousel />
        <StatsCounter/>
        <PopularServices />
        <BrandsWeService />
        <FeaturedServices />
        <WhyChooseUs />
        <CouponsOffers />
        <Testimonials />
        {/* <CityAvailability /> */}
        <FAQSection />
      </main>
      <Footer />
      <BookingModal />
      <AuthModal />
      <WhatsAppFloat />
    </div>
  );
}