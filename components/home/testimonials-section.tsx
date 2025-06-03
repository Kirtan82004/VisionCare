import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "Excellent service and beautiful frames! The staff helped me find the perfect glasses that suit my face shape. Very professional and knowledgeable.",
    location: "New York, NY",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "Best optical store in the city. Quick service, great prices, and amazing quality. My prescription was ready in just one hour!",
    location: "San Francisco, CA",
  },
  {
    name: "Emily Rodriguez",
    role: "Teacher",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "I love my new progressive lenses! The eye exam was thorough and the optometrist explained everything clearly. Highly recommend!",
    location: "Austin, TX",
  },
  {
    name: "David Thompson",
    role: "Photographer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    content:
      "Amazing selection of sunglasses and prescription glasses. The blue light blocking lenses have really helped with my computer work.",
    location: "Los Angeles, CA",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
