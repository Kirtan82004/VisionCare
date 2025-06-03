import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Bell, Percent } from "lucide-react"

export function NewsletterSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-background/10 backdrop-blur-sm border-primary-foreground/20">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-8 w-8" />
                      <h2 className="text-3xl lg:text-4xl font-bold">Stay Updated</h2>
                    </div>
                    <p className="text-lg text-primary-foreground/80">
                      Subscribe to our newsletter and get exclusive offers, eye care tips, and early access to new
                      collections.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm">Exclusive Offers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm">New Arrivals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Percent className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm">Special Discounts</span>
                    </div>
                  </div>
                </div>

                {/* Right Content - Newsletter Form */}
                <div className="space-y-4">
                  <div className="bg-background/20 backdrop-blur-sm rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Get 10% Off Your First Order</h3>
                    <p className="text-sm text-primary-foreground/80">
                      Join our newsletter and receive a welcome discount code
                    </p>

                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="bg-background/50 border-primary-foreground/30 text-foreground placeholder:text-muted-foreground"
                      />
                      <Button className="w-full bg-background text-primary hover:bg-background/90" size="lg">
                        Subscribe & Get 10% Off
                      </Button>
                    </div>

                    <p className="text-xs text-primary-foreground/60 text-center">
                      By subscribing, you agree to our Privacy Policy and Terms of Service
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
