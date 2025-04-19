"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ProductFiltersProps {
  categories: string[];
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: string) => void;
}

export function ProductFilters({
  categories,
  onSearchChange,
  onCategoryChange,
  onPriceRangeChange,
}: ProductFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  // Maximum price in USD
  const MAX_PRICE = 1000;

  useEffect(() => {
    onSearchChange(search);
  }, [search, onSearchChange]);

  useEffect(() => {
    // Convert the slider values to the format expected by the parent component
    const rangeString = `${priceRange[0]}-${priceRange[1]}`;
    onPriceRangeChange(rangeString);
  }, [priceRange, onPriceRangeChange]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Format price to USD
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 sticky top-18 w-full">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            className="space-y-1.5"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="category-all" />
              <Label htmlFor="category-all">All Categories</Label>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={`category-${category}`} />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Price Range Slider */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              defaultValue={[0, MAX_PRICE]}
              max={MAX_PRICE}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {formatPrice(priceRange[0])}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatPrice(priceRange[1])}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}