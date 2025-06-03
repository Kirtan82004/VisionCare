import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { ServicesSection } from "@/components/home/services-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <ServicesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
