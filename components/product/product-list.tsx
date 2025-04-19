"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skeleton";
import { ProductFilters } from "./product-filters";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/types";

// Add this debounce function at the top of your file
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

interface ProductListProps {
  title?: string;
}

export function ProductList({ title = "Produk Kami" }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((product: Product) => product.category.name))];
        setCategories(uniqueCategories as string[]);
        
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data produk");
        setLoading(false);
        console.error(err);
      }
    };

    getProducts();
  }, []);

  // Create a debounced version of the filter function
  const debouncedFilter = useCallback(
    debounce(() => {
      let result = [...products];
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          product => 
            product.title.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );
      }
      
      // Apply category filter
      if (selectedCategory !== "all") {
        result = result.filter(product => product.category.name === selectedCategory);
      }
      
      // Apply price filter
      if (priceRange !== "all") {
        const [minStr, maxStr] = priceRange.split("-");
        const min = Number(minStr);
        const max = Number(maxStr);
        
        result = result.filter(product => {
          return product.price >= min && product.price <= max;
        });
      }
      
      setFilteredProducts(result);
    }, 300), // 300ms debounce time
    [products, searchQuery, selectedCategory, priceRange]
  );

  // Replace your existing filter useEffect with this
  useEffect(() => {
    debouncedFilter();
  }, [debouncedFilter]);

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <Card className="mx-auto max-w-md">
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-32">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Filters column */}
        <div className="md:col-span-1">
          <ProductFilters 
            categories={categories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
        </div>
        
        {/* Products column - Add min-height to prevent layout shifts */}
        <div className="md:col-span-3 min-h-[800px]">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Tidak ada produk yang sesuai dengan filter Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}