import Link from "next/link"
import { Eye, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">VisionCare</span>
            </div>
            <p className="text-muted-foreground">
              Your trusted optical store providing premium eyewear and professional eye care services since 1995.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                All Products
              </Link>
              <Link
                href="/products?category=glasses"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Prescription Glasses
              </Link>
              <Link
                href="/products?category=sunglasses"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Sunglasses
              </Link>
              <Link
                href="/products?category=lenses"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Lenses
              </Link>
              <Link href="/appointment" className="text-muted-foreground hover:text-primary transition-colors">
                Book Appointment
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                Eye Exam Services
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                Returns & Exchanges
              </Link>
              <Link href="/warranty" className="text-muted-foreground hover:text-primary transition-colors">
                Warranty
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Vision Street, Eye City, EC 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@visioncare.com</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <p className="text-sm text-muted-foreground">Subscribe for exclusive offers and eye care tips</p>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 VisionCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
