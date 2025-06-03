"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, Truck, Shield, Tag } from "lucide-react"
import { useAppContext } from "@/components/providers"
import { useToast } from "@/hooks/use-toast"

export function CartPage() {
  const { state, dispatch } = useAppContext()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId })
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      })
    } else {
      dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id: productId, quantity: newQuantity } })
    }
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    })
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo("WELCOME10")
      toast({
        title: "Promo Code Applied!",
        description: "You saved 10% on your order.",
      })
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
    setPromoCode("")
  }

  const subtotal = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const discount = appliedPromo === "WELCOME10" ? subtotal * 0.1 : 0
  const shipping = subtotal > 100 ? 0 : 15
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">
            Looks like you haven't added any items to your cart yet. Start shopping to find your perfect eyewear!
          </p>
          <Button size="lg" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-muted-foreground">Review your items and proceed to checkout when ready</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cart Items ({state.cart.length})</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {state.cart.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {item.product.color}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.product.frameShape}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 1)}
                      className="w-16 text-center"
                      min="1"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">${item.product.price} each</div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Promo Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                Promo Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={applyPromoCode} disabled={!promoCode}>
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-medium">Promo code "{appliedPromo}" applied</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setAppliedPromo(null)}
                      className="text-green-800 hover:text-green-900"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
              <div className="mt-3 text-sm text-muted-foreground">Try: WELCOME10 for 10% off your first order</div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Truck className="h-4 w-4" />
                    <span className="text-sm">Add ${(100 - subtotal).toFixed(2)} more for free shipping</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Link>
                </Button>

                <div className="text-center">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
