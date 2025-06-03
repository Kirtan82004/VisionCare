"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart } from "lucide-react"
import { useAppContext } from "@/components/providers"

const allProducts = [
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
  // Add more products here...
]

export function ProductCatalog() {
  const { dispatch } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedShapes, setSelectedShapes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])

  const brands = [...new Set(allProducts.map((p) => p.brand))]
  const colors = [...new Set(allProducts.map((p) => p.color))]
  const shapes = [...new Set(allProducts.map((p) => p.frameShape))]

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color)
      const matchesShape = selectedShapes.length === 0 || selectedShapes.includes(product.frameShape)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesBrand && matchesColor && matchesShape && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedBrands, selectedColors, selectedShapes, priceRange, sortBy])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (product: any) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  const toggleFilter = (value: string, currentFilters: string[], setFilters: (filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter((f) => f !== value))
    } else {
      setFilters([...currentFilters, value])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of premium eyewear</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="font-semibold text-lg flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </h3>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="glasses">Prescription Glasses</SelectItem>
                    <SelectItem value="sunglasses">Sunglasses</SelectItem>
                    <SelectItem value="lenses">Contact Lenses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Brands */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Brands</label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                      />
                      <label htmlFor={brand} className="text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Colors</label>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={color}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
                      />
                      <label htmlFor={color} className="text-sm capitalize">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frame Shapes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Frame Shape</label>
                <div className="space-y-2">
                  {shapes.map((shape) => (
                    <div key={shape} className="flex items-center space-x-2">
                      <Checkbox
                        id={shape}
                        checked={selectedShapes.includes(shape)}
                        onCheckedChange={() => toggleFilter(shape, selectedShapes, setSelectedShapes)}
                      />
                      <label htmlFor={shape} className="text-sm capitalize">
                        {shape}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedBrands([])
                  setSelectedColors([])
                  setSelectedShapes([])
                  setPriceRange([0, 500])
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {allProducts.length} products
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedBrands([])
                  setSelectedColors([])
                  setSelectedShapes([])
                  setPriceRange([0, 500])
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
                        {/* Grid View */}
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                            {product.isBestseller && (
                              <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
                            )}
                            {product.originalPrice > product.price && (
                              <Badge variant="destructive">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                OFF
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
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8"
                              onClick={() => addToCart(product)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

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
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>

                          <Button className="w-full" onClick={() => addToCart(product)}>
                            Add to Cart
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className="flex p-4 space-x-4">
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {product.isNew && (
                              <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-xs">
                                New
                              </Badge>
                            )}
                          </div>

                          <div className="flex-1 space-y-2">
                            <div>
                              <div className="text-sm text-muted-foreground">{product.brand}</div>
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

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
                                {product.rating} ({product.reviews} reviews)
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold">${product.price}</span>
                                {product.originalPrice > product.price && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Button size="icon" variant="outline" onClick={() => toggleFavorite(product.id)}>
                                  <Heart
                                    className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-current text-red-500" : ""}`}
                                  />
                                </Button>
                                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
