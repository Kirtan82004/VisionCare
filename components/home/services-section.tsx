import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Glasses, Clock, Shield, Users, Award } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Eye,
    title: "Comprehensive Eye Exams",
    description: "Complete eye health assessment with latest diagnostic equipment",
    features: ["Digital retinal imaging", "Glaucoma screening", "Vision testing"],
    price: "From $89",
  },
  {
    icon: Glasses,
    title: "Prescription Glasses",
    description: "Custom prescription lenses with premium frame selection",
    features: ["Single vision", "Progressive lenses", "Blue light protection"],
    price: "From $149",
  },
  {
    icon: Clock,
    title: "Same Day Service",
    description: "Quick turnaround for most prescriptions and repairs",
    features: ["1-hour service", "Express repairs", "Emergency appointments"],
    price: "Available",
  },
]

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Award, value: "25+", label: "Years Experience" },
  { icon: Shield, value: "2 Year", label: "Warranty" },
  { icon: Eye, value: "500+", label: "Frame Styles" },
]

export function ServicesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional eye care services with personalized attention and expert care
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <div className="text-lg font-semibold text-primary mb-3">{service.price}</div>
                  <Button className="w-full" asChild>
                    <Link href="/appointment">Book Appointment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
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
  )
}
