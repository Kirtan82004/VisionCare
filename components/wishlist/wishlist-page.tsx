"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2, Star, ArrowLeft, Share2 } from "lucide-react"
import { useAppContext } from "@/components/providers"
import { useToast } from "@/hooks/use-toast"

const mockWishlistItems = [
  {
    id: "1",
    name: "Classic Aviator",
    brand: "RayBan",
    price: 199,
    originalPrice: 249,
    image: "/placeholder.svg?height=300&width=300",
    category: "sunglasses",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    dateAdded: "2024-01-15",
  },
  {
    id: "2",
    name: "Modern Rectangle",
    brand: "Oakley",
    price: 159,
    originalPrice: 199,
    image: "/placeholder.svg?height=300&width=300",
    category: "glasses",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    dateAdded: "2024-01-10",
  },
  {
    id: "3",
    name: "Vintage Round",
    brand: "Persol",
    price: 299,
    originalPrice: 349,
    image: "/placeholder.svg?height=300&width=300",
    category: "glasses",
    rating: 4.7,
    reviews: 156,
    inStock: false,
    dateAdded: "2024-01-05",
  },
]

export function WishlistPage() {
  const { dispatch } = useAppContext()
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const addToCart = (item: any) => {
    dispatch({ type: "ADD_TO_CART", payload: item })
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock)
    inStockItems.forEach((item) => {
      dispatch({ type: "ADD_TO_CART", payload: item })
    })
    toast({
      title: "Added to Cart",
      description: `${inStockItems.length} items have been added to your cart.`,
    })
  }

  const shareWishlist = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Wishlist Link Copied",
      description: "Share your wishlist with friends and family.",
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground">Save items you love to your wishlist and come back to them later.</p>
          <Button size="lg" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={shareWishlist}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Wishlist
          </Button>
          <Button onClick={addAllToCart} disabled={!wishlistItems.some((item) => item.inStock)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add All to Cart
          </Button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {!item.inStock && (
                    <Badge variant="secondary" className="bg-gray-500 text-white">
                      Out of Stock
                    </Badge>
                  )}
                  {item.originalPrice > item.price && (
                    <Badge variant="destructive">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">{item.brand}</div>
                  <h3 className="font-semibold text-lg leading-tight">
                    <Link href={`/product/${item.id}`} className="hover:text-primary">
                      {item.name}
                    </Link>
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">${item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                  )}
                </div>

                {/* Date Added */}
                <div className="text-xs text-muted-foreground">
                  Added on {new Date(item.dateAdded).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1" onClick={() => addToCart(item)} disabled={!item.inStock}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => removeFromWishlist(item.id)}>
                    <Heart className="h-4 w-4 fill-current text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}
