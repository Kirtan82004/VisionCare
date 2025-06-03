"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, Mail, Phone, Calendar, Download, Share2, ArrowRight } from "lucide-react"

export function OrderConfirmationPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center space-y-6 mb-12">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-green-600">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            <Package className="mr-2 h-5 w-5" />
            Track Your Order
          </Button>
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download Receipt
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Details</span>
                <Badge variant="secondary">#{orderNumber}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Order Date</p>
                  <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-muted-foreground">{estimatedDelivery}</p>
                </div>
                <div>
                  <p className="font-medium">Order Total</p>
                  <p className="text-muted-foreground font-bold">$199.00</p>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div className="space-y-4">
                <h4 className="font-medium">Items Ordered</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Classic Aviator"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium">Classic Aviator Sunglasses</h5>
                      <p className="text-sm text-muted-foreground">RayBan • Gold • Medium</p>
                      <p className="text-sm">Quantity: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$199.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Shipping Method</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Standard Shipping</p>
                    <p>5-7 business days</p>
                    <p>Tracking number will be provided</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">{new Date().toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">Processing</p>
                    <p className="text-sm text-muted-foreground">1-2 business days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">Shipped</p>
                    <p className="text-sm text-muted-foreground">2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-muted-foreground">Delivered</p>
                    <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@visioncare.com</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Order
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Confirmation Email</p>
                    <p className="text-muted-foreground">You'll receive an email confirmation shortly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Package className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-muted-foreground">We'll prepare your order for shipping</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Shipping Updates</p>
                    <p className="text-muted-foreground">Track your package with real-time updates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/products">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/appointment">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Eye Exam
                </Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/profile">View Order History</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
