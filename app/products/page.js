"use client";
import ProductGrid from "@/components/ProductGrid/ProductGrid.jsx";
import { useProducts } from "@/hooks/useProducts";
import React from "react";

export const dynamic = "force-dynamic";

const Products = () => {
  const { products, loading, error } = useProducts();

  return (
    <div>
      <ProductGrid products={products} loading={loading} error={error} />
    </div>
  );
};

export default Products;
