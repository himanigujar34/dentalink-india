import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Package,
  ShoppingCart,
} from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Dental Composite Kit - A3 Shade",
    brand: "3M ESPE",
    price: 4500,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop",
    category: "Restorative",
    distributorName: "MedSupply India",
    distributorVerified: true,
    inStock: true,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    name: "Rotary Endodontic Files - ProTaper Gold",
    brand: "Dentsply Sirona",
    price: 8900,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    category: "Endodontics",
    distributorName: "DentalMart",
    distributorVerified: true,
    inStock: true,
    rating: 4.8,
    reviews: 256,
  },
  {
    id: "3",
    name: "LED Curing Light - Wireless",
    brand: "Woodpecker",
    price: 12500,
    originalPrice: 15000,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    category: "Equipment",
    distributorName: "DentEquip Pro",
    distributorVerified: false,
    inStock: true,
    rating: 4.2,
    reviews: 89,
  },
  {
    id: "4",
    name: "Alginate Impression Material - 500g",
    brand: "GC Corporation",
    price: 850,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
    category: "Impression",
    distributorName: "MedSupply India",
    distributorVerified: true,
    inStock: false,
    rating: 4.6,
    reviews: 312,
  },
  {
    id: "5",
    name: "Orthodontic Brackets - MBT Prescription",
    brand: "American Orthodontics",
    price: 6200,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop",
    category: "Orthodontics",
    distributorName: "OrthoSupplies",
    distributorVerified: true,
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "6",
    name: "Surgical Extraction Forceps Set",
    brand: "GDC",
    price: 3800,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    category: "Surgery",
    distributorName: "DentEquip Pro",
    distributorVerified: false,
    inStock: true,
    rating: 4.4,
    reviews: 94,
  },
];

const categories = [
  "All Categories",
  "Restorative",
  "Endodontics",
  "Equipment",
  "Impression",
  "Orthodontics",
  "Surgery",
  "Consumables",
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Sort By</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <Input type="number" placeholder="Min" className="input-clinical" />
          <span className="text-muted-foreground">to</span>
          <Input type="number" placeholder="Max" className="input-clinical" />
        </div>
      </div>

      <Button className="w-full btn-trust">Apply Filters</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              Dental Marketplace
            </h1>
            <p className="text-muted-foreground mt-1">
              Quality dental supplies from verified distributors
            </p>
          </div>
          <Button className="btn-trust gap-2">
            <Plus className="h-4 w-4" />
            Sell Products
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="card-clinical p-6 sticky top-24">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </h2>
              <FiltersContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Mobile Filter */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-clinical pl-10"
                />
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="card-clinical p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  No Products Found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
