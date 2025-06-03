"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Camera,
  Ruler,
  Eye,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useAppContext } from "@/components/providers"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailPageProps {
  productId: string
}

const mockProduct = {
  id: "1",
  name: "Classic Aviator Sunglasses",
  brand: "RayBan",
  price: 199,
  originalPrice: 249,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  category: "sunglasses" as const,
  frameShape: "aviator",
  color: "gold",
  rating: 4.8,
  reviews: 124,
  description:
    "Timeless aviator sunglasses with premium UV protection and classic styling that never goes out of fashion.",
  features: [
    "100% UV protection",
    "Polarized lenses",
    "Lightweight metal frame",
    "Adjustable nose pads",
    "Premium case included",
    "2-year warranty",
  ],
  specifications: {
    "Frame Material": "Metal",
    "Lens Material": "Glass",
    "Frame Width": "140mm",
    "Bridge Width": "14mm",
    "Temple Length": "135mm",
    "Lens Width": "58mm",
    "Lens Height": "52mm",
    Weight: "31g",
  },
  colors: ["Gold", "Silver", "Black", "Rose Gold"],
  sizes: ["Small", "Medium", "Large"],
  inStock: true,
  stockCount: 15,
}

const mockReviews = [
  {
    id: "1",
    user: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    title: "Perfect fit and style!",
    content:
      "These sunglasses are exactly what I was looking for. Great quality and the classic aviator style looks amazing.",
    verified: true,
    helpful: 12,
  },
  {
    id: "2",
    user: "Mike R.",
    rating: 4,
    date: "2024-01-10",
    title: "Good quality, fast shipping",
    content: "Very happy with the purchase. The frame feels solid and the lenses are crystal clear.",
    verified: true,
    helpful: 8,
  },
  {
    id: "3",
    user: "Emma L.",
    rating: 5,
    date: "2024-01-05",
    title: "Love them!",
    content: "These are my new favorite sunglasses. They're comfortable and look great with everything.",
    verified: false,
    helpful: 5,
  },
]

const relatedProducts = [
  {
    id: "2",
    name: "Modern Rectangle",
    brand: "Oakley",
    price: 159,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Vintage Round",
    brand: "Persol",
    price: 299,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Sport Wrap",
    brand: "Nike",
    price: 129,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
  },
]

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const { dispatch } = useAppContext()
  const { toast } = useToast()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0])
  const [selectedSize, setSelectedSize] = useState(mockProduct.sizes[1])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false)

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: mockProduct })
    toast({
      title: "Added to Cart",
      description: `${mockProduct.name} has been added to your cart.`,
    })
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from Wishlist" : "Added to Wishlist",
      description: isFavorite ? "Item removed from your wishlist." : "Item added to your wishlist.",
    })
  }

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <span>/</span>
        <Link href={`/products?category=${mockProduct.category}`} className="hover:text-primary">
          {mockProduct.category === "sunglasses" ? "Sunglasses" : "Glasses"}
        </Link>
        <span>/</span>
        <span className="text-foreground">{mockProduct.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={mockProduct.images[selectedImage] || "/placeholder.svg"}
              alt={mockProduct.name}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            <Button
              size="icon"
              variant="outline"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : mockProduct.images.length - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setSelectedImage(selectedImage < mockProduct.images.length - 1 ? selectedImage + 1 : 0)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Virtual Try-On Button */}
            <Button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              onClick={() => setShowVirtualTryOn(true)}
            >
              <Camera className="mr-2 h-4 w-4" />
              Virtual Try-On
            </Button>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {mockProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${mockProduct.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{mockProduct.brand}</Badge>
              {mockProduct.originalPrice > mockProduct.price && (
                <Badge variant="destructive">
                  {Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{mockProduct.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({mockProduct.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold">${mockProduct.price}</span>
            {mockProduct.originalPrice > mockProduct.price && (
              <span className="text-xl text-muted-foreground line-through">${mockProduct.originalPrice}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{mockProduct.description}</p>

          {/* Options */}
          <div className="space-y-4">
            {/* Color Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Color: {selectedColor}</Label>
              <div className="flex space-x-2">
                {mockProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? "border-primary" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Size: {selectedSize}</Label>
              <div className="flex space-x-2">
                {mockProduct.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Quantity</Label>
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.min(mockProduct.stockCount, quantity + 1))}
                  disabled={quantity >= mockProduct.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{mockProduct.stockCount} items in stock</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              <Button onClick={addToCart} className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={toggleFavorite}
                className={isFavorite ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="outline" className="w-full" size="lg" asChild>
              <Link href="/appointment">
                <Eye className="mr-2 h-5 w-5" />
                Try In Store
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-medium">Key Features</h3>
            <ul className="space-y-2">
              {mockProduct.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center space-y-1">
              <Truck className="h-6 w-6 text-primary mx-auto" />
              <p className="text-xs font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $100</p>
            </div>
            <div className="text-center space-y-1">
              <RotateCcw className="h-6 w-6 text-primary mx-auto" />
              <p className="text-xs font-medium">30-Day Returns</p>
              <p className="text-xs text-muted-foreground">Easy returns</p>
            </div>
            <div className="text-center space-y-1">
              <Shield className="h-6 w-6 text-primary mx-auto" />
              <p className="text-xs font-medium">2-Year Warranty</p>
              <p className="text-xs text-muted-foreground">Quality guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({mockProduct.reviews})</TabsTrigger>
          <TabsTrigger value="sizing">Sizing Guide</TabsTrigger>
          <TabsTrigger value="care">Care Instructions</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(mockProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{averageRating.toFixed(1)} out of 5</span>
                </div>
                <span className="text-muted-foreground">Based on {mockProduct.reviews} reviews</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="space-y-3 pb-6 border-b last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.user}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{review.title}</h4>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="text-muted-foreground hover:text-primary">Helpful ({review.helpful})</button>
                    <button className="text-muted-foreground hover:text-primary">Report</button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                Load More Reviews
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sizing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ruler className="mr-2 h-5 w-5" />
                Sizing Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Frame Measurements</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Lens Width:</span>
                      <span>58mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bridge Width:</span>
                      <span>14mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temple Length:</span>
                      <span>135mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frame Width:</span>
                      <span>140mm</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Size Guide</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Small:</strong> Best for narrow faces
                    </div>
                    <div>
                      <strong>Medium:</strong> Most popular, fits average faces
                    </div>
                    <div>
                      <strong>Large:</strong> Best for wider faces
                    </div>
                  </div>
                </div>
              </div>

              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Ruler className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Frame measurement diagram</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="care" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Care Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">Cleaning</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use only lens cleaning solution or mild soap and water</li>
                  <li>• Clean with a microfiber cloth in circular motions</li>
                  <li>• Avoid paper towels or clothing which can scratch lenses</li>
                  <li>• Rinse thoroughly and dry completely</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Storage</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Always store in the provided case when not in use</li>
                  <li>• Keep away from extreme temperatures</li>
                  <li>• Avoid leaving in direct sunlight for extended periods</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Handling</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use both hands when putting on or removing glasses</li>
                  <li>• Hold by the frame, not the lenses</li>
                  <li>• Avoid placing face-down on surfaces</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 space-y-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                  <p className="font-bold">${product.price}</p>
                </div>
                <Button className="w-full" size="sm" asChild>
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function Label({ children, className, ...props }: any) {
  return (
    <label className={`text-sm font-medium ${className}`} {...props}>
      {children}
    </label>
  )
}
