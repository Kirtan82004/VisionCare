"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { useAppContext } from "@/components/providers"

const featuredProducts = [
  {
    id: "1",
    name: "Classic Aviator",
    brand: "RayBan",
    price: 199,
    originalPrice: 249,
    image: "/placeholder.svg?height=300&width=300",
    category: "sunglasses" as const,
    frameShape: "aviator",
    color: "gold",
    rating: 4.8,
    reviews: 124,
    description: "Timeless aviator sunglasses with premium UV protection",
    specifications: {
      "Frame Material": "Metal",
      "Lens Material": "Glass",
      "UV Protection": "100%",
      "Frame Width": "140mm",
    },
    isNew: false,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Modern Rectangle",
    brand: "Oakley",
    price: 159,
    originalPrice: 199,
    image: "/placeholder.svg?height=300&width=300",
    category: "glasses" as const,
    frameShape: "rectangle",
    color: "black",
    rating: 4.9,
    reviews: 89,
    description: "Contemporary rectangle frames for everyday wear",
    specifications: {
      "Frame Material": "Acetate",
      "Lens Material": "Polycarbonate",
      "Frame Width": "135mm",
      "Temple Length": "145mm",
    },
    isNew: true,
    isBestseller: false,
  },
  {
    id: "3",
    name: "Vintage Round",
    brand: "Persol",
    price: 299,
    originalPrice: 349,
    image: "/placeholder.svg?height=300&width=300",
    category: "glasses" as const,
    frameShape: "round",
    color: "tortoise",
    rating: 4.7,
    reviews: 156,
    description: "Vintage-inspired round frames with Italian craftsmanship",
    specifications: {
      "Frame Material": "Acetate",
      "Lens Material": "CR-39",
      "Frame Width": "130mm",
      "Bridge Width": "20mm",
    },
    isNew: false,
    isBestseller: true,
  },
  {
    id: "4",
    name: "Sport Wrap",
    brand: "Nike",
    price: 129,
    originalPrice: 159,
    image: "/placeholder.svg?height=300&width=300",
    category: "sunglasses" as const,
    frameShape: "wrap",
    color: "blue",
    rating: 4.6,
    reviews: 203,
    description: "High-performance sport sunglasses for active lifestyle",
    specifications: {
      "Frame Material": "TR90",
      "Lens Material": "Polycarbonate",
      "UV Protection": "100%",
      Weight: "28g",
    },
    isNew: true,
    isBestseller: false,
  },
]

export function FeaturedProducts() {
  const { dispatch } = useAppContext()
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", payload: featuredProducts })
  }, [dispatch])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (product: any) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium eyewear from top brands
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                    {product.isBestseller && <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>}
                    {product.originalPrice > product.price && (
                      <Badge variant="destructive">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-current text-red-500" : ""}`}
                      />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">{product.brand}</div>
                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <Button className="w-full" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
