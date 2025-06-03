import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Glasses,
  Clock,
  Shield,
  Users,
  Award,
  CheckCircle,
  Calendar,
  Microscope,
  Camera,
  Stethoscope,
  Zap,
} from "lucide-react"

const services = [
  {
    icon: Eye,
    title: "Comprehensive Eye Exams",
    description: "Complete eye health assessment with state-of-the-art diagnostic equipment",
    features: [
      "Digital retinal imaging",
      "Glaucoma screening",
      "Macular degeneration testing",
      "Vision acuity testing",
      "Color blindness testing",
    ],
    duration: "60 minutes",
    price: 89,
    popular: true,
  },
  {
    icon: Glasses,
    title: "Prescription Glasses",
    description: "Custom prescription lenses with premium frame selection from top brands",
    features: [
      "Single vision lenses",
      "Progressive lenses",
      "Blue light protection",
      "Anti-reflective coating",
      "Scratch-resistant coating",
    ],
    duration: "30 minutes consultation",
    price: 149,
    popular: false,
  },
  {
    icon: Microscope,
    title: "Contact Lens Fitting",
    description: "Professional contact lens fitting and comprehensive training session",
    features: [
      "Corneal measurements",
      "Trial lens fitting",
      "Insertion/removal training",
      "Care instruction",
      "Follow-up appointments",
    ],
    duration: "45 minutes",
    price: 75,
    popular: false,
  },
  {
    icon: Camera,
    title: "Retinal Photography",
    description: "Advanced retinal imaging for early detection of eye diseases",
    features: [
      "High-resolution imaging",
      "Diabetic retinopathy screening",
      "Macular health assessment",
      "Digital image storage",
      "Progress monitoring",
    ],
    duration: "20 minutes",
    price: 45,
    popular: false,
  },
  {
    icon: Stethoscope,
    title: "Pediatric Eye Care",
    description: "Specialized eye care services for children and teenagers",
    features: [
      "Child-friendly environment",
      "Vision development assessment",
      "Learning-related vision problems",
      "Myopia management",
      "Sports vision training",
    ],
    duration: "45 minutes",
    price: 95,
    popular: false,
  },
  {
    icon: Zap,
    title: "Emergency Eye Care",
    description: "Urgent eye care for injuries, infections, and sudden vision changes",
    features: [
      "Same-day appointments",
      "Foreign object removal",
      "Eye infection treatment",
      "Injury assessment",
      "Urgent referrals",
    ],
    duration: "30 minutes",
    price: 125,
    popular: false,
  },
]

const additionalServices = [
  {
    title: "Frame Repair & Adjustment",
    description: "Professional frame repairs and adjustments",
    price: "From $15",
  },
  {
    title: "Lens Replacement",
    description: "Replace damaged or outdated lenses",
    price: "From $89",
  },
  {
    title: "Sports Vision Training",
    description: "Enhance visual performance for athletes",
    price: "From $150",
  },
  {
    title: "Low Vision Aids",
    description: "Specialized devices for vision impairment",
    price: "Consultation required",
  },
]

const stats = [
  { icon: Users, value: "10,000+", label: "Patients Served" },
  { icon: Award, value: "25+", label: "Years Experience" },
  { icon: Shield, value: "2 Year", label: "Service Warranty" },
  { icon: Clock, value: "Same Day", label: "Emergency Care" },
]

export function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold">Professional Eye Care Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive eye care solutions with state-of-the-art technology and personalized attention
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/appointment">Book Appointment</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete eye care solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-lg transition-shadow duration-300 ${service.popular ? "ring-2 ring-primary" : ""}`}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                )}
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="text-sm font-medium">{service.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="text-lg font-bold text-primary">${service.price}</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/appointment">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Additional Services</h2>
            <p className="text-xl text-muted-foreground">Complete support for all your eyewear needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <div className="text-primary font-bold">{service.price}</div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Improve Your Vision?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Schedule your comprehensive eye exam today and take the first step towards better eye health
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/appointment">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
