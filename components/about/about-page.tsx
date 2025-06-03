import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, Lightbulb, Shield, Calendar, MapPin, Phone, Mail } from "lucide-react"

const team = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Optometrist",
    experience: "15+ years",
    specialization: "Pediatric Eye Care",
    image: "/placeholder.svg?height=300&width=300",
    credentials: ["OD", "FAAO"],
    description: "Specialized in children's vision development and myopia management",
  },
  {
    name: "Dr. Michael Chen",
    role: "Senior Optometrist",
    experience: "12+ years",
    specialization: "Contact Lens Fitting",
    image: "/placeholder.svg?height=300&width=300",
    credentials: ["OD", "FSLS"],
    description: "Expert in specialty contact lenses and corneal health",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Optometrist",
    experience: "8+ years",
    specialization: "Low Vision Rehabilitation",
    image: "/placeholder.svg?height=300&width=300",
    credentials: ["OD", "CLVT"],
    description: "Helping patients with vision impairment maximize their remaining vision",
  },
  {
    name: "Lisa Thompson",
    role: "Licensed Optician",
    experience: "10+ years",
    specialization: "Frame Styling",
    image: "/placeholder.svg?height=300&width=300",
    credentials: ["ABO", "NCLE"],
    description: "Expert in frame selection and lens technology",
  },
]

const values = [
  {
    icon: Eye,
    title: "Vision Excellence",
    description:
      "We are committed to providing the highest quality eye care with cutting-edge technology and personalized attention.",
  },
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Every patient is unique, and we tailor our services to meet individual needs and preferences.",
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "We build lasting relationships based on trust, transparency, and honest communication.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously invest in the latest technology and techniques to provide the best possible care.",
  },
]

const milestones = [
  { year: "1995", event: "VisionCare founded by Dr. Robert Smith" },
  { year: "2000", event: "Expanded to include contact lens services" },
  { year: "2005", event: "Introduced digital retinal imaging" },
  { year: "2010", event: "Added pediatric eye care specialty" },
  { year: "2015", event: "Opened second location downtown" },
  { year: "2020", event: "Launched telehealth consultations" },
  { year: "2024", event: "Celebrating 29 years of service" },
]

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                Since 1995
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold">Your Vision, Our Mission</h1>
              <p className="text-xl text-muted-foreground">
                For nearly three decades, VisionCare has been dedicated to providing exceptional eye care services and
                premium eyewear to our community. We combine traditional values with modern technology to deliver
                personalized care for every patient.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/appointment">Schedule Visit</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src="/placeholder.svg?height=500&width=600" alt="VisionCare Team" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">29+</div>
              <div className="text-sm text-muted-foreground">Years of Service</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Patients</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Frame Styles</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Patient Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Story</h2>
              <p className="text-xl text-muted-foreground">A legacy of excellence in eye care</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Founded on Excellence</h3>
                <p className="text-muted-foreground">
                  VisionCare was founded in 1995 by Dr. Robert Smith with a simple mission: to provide exceptional eye
                  care that combines the latest technology with personalized attention. What started as a small practice
                  has grown into a trusted name in the community.
                </p>
                <p className="text-muted-foreground">
                  Today, we continue to uphold those founding principles while embracing innovation and expanding our
                  services to meet the evolving needs of our patients. Our commitment to excellence has earned us the
                  trust of thousands of families throughout the region.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="VisionCare History"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-center">Our Journey</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Badge variant="outline" className="min-w-fit">
                      {milestone.year}
                    </Badge>
                    <p className="text-muted-foreground">{milestone.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your eye health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="text-xs">{member.experience}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <div className="flex justify-center space-x-1">
                      {member.credentials.map((cred, credIndex) => (
                        <Badge key={credIndex} variant="outline" className="text-xs">
                          {cred}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.specialization}</p>
                    <p className="text-xs text-muted-foreground">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">Visit Our Practice</h2>
              <p className="text-xl opacity-90">
                We'd love to meet you and help you achieve your best vision. Schedule an appointment or stop by for a
                consultation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span>123 Vision Street, Eye City, EC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>info@visioncare.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5" />
                  <span>Mon-Sat: 9AM-7PM | Sun: 11AM-5PM</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/appointment">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Appointment
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
