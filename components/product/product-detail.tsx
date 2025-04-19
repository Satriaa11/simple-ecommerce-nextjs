"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { ProductSkeleton } from "./product-skeleton";
import { fetchProductById } from "@/lib/api";
import { Product } from "@/types/types";

interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(parseInt(productId));
        setProduct(data);
        setSelectedImage(data.images[0] || "");
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data produk");
        setLoading(false);
        console.error(err);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Format price to USD
  const formattedPrice = product
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(product.price)
    : "";

  if (loading) {
    return (
      <div className="container max-w-5xl mx-auto p-4">
        <ProductSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container max-w-5xl mx-auto p-4">
        <Card className="mx-auto max-w-md">
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-32">
              <p className="text-lg text-red-500">
                {error || "Product not found"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto p-4">
      <Card className="overflow-hidden border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Images - Left Column */}
            <div className="p-4">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-50 mb-3">
                <Image
                  src={selectedImage || "/placeholder.png"}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.images.slice(0, 5).map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square relative rounded-md overflow-hidden bg-gray-50 cursor-pointer transition-all ${
                      selectedImage === image ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image || "/placeholder.png"}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info - Right Column */}
            <div className="p-6 flex flex-col">
              <div className="mb-auto">
                <p className="text-sm text-muted-foreground mb-1">{product.category.name}</p>
                <h1 className="text-2xl font-medium mb-3">{product.title}</h1>
                <p className="text-xl font-semibold mb-4">{formattedPrice}</p>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-4">{product.description}</p>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Quantity</span>
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none"
                      onClick={incrementQuantity}
                    >
                      <PlusIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Button size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}