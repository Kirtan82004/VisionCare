import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Shield, Truck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                ✨ New Collection Available
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                See the World
                <span className="text-primary block">Clearly</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover our premium collection of glasses, sunglasses, and contact lenses. Professional eye care
                services with style and comfort.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/appointment">Book Eye Exam</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Premium Eyewear Collection"
                className="w-full h-auto rounded-lg"
              />

              {/* Floating Cards */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-sm font-medium">Premium Brands</div>
                <div className="text-2xl font-bold text-primary">500+</div>
              </div>

              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-sm font-medium">Happy Customers</div>
                <div className="text-2xl font-bold text-primary">10K+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
