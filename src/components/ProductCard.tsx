import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  BadgeCheck,
  ShoppingCart,
  Heart,
} from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  distributorName: string;
  distributorVerified: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export function ProductCard({
  name,
  brand,
  price,
  originalPrice,
  image,
  category,
  distributorName,
  distributorVerified,
  inStock,
  rating,
  reviews,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="card-clinical overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            {discount}% OFF
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="font-medium text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>

        {/* Name & Brand */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{brand}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews} reviews)
          </span>
        </div>

        {/* Distributor */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span>By {distributorName}</span>
          {distributorVerified && (
            <BadgeCheck className="h-4 w-4 text-primary" />
          )}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-lg font-bold text-foreground">
              ₹{price.toLocaleString("en-IN")}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="btn-trust gap-1.5"
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
