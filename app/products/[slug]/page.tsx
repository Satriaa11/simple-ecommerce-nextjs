"use client";

import { ProductDetail } from "@/components/product/product-detail";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  console.log("Full params object:", params); // Debug the entire params object
  
  const productId = Array.isArray(params.slug) ? params.slug[0] : params.slug as string;
  console.log("Product ID from params:", productId);
  
  return <ProductDetail productId={productId} />;
}