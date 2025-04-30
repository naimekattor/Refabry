"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import Loader from "../../ui/Loader";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

const ProductDetail = () => {
  const params = useParams();
  const id = params?.id;
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { products } = useProducts();
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(id);

  const handleAddToCart = () => {
    if (quantity > 0 && productDetail) {
      dispatch(addToCart({ product: productDetail, quantity }));
    }
  };

  useEffect(() => {
    const fetchProduct = () => {
      try {
        if (!id || products.length === 0) return;
        const product = products.find((item) => item.id === parseInt(id));
        if (!product) {
          setError("Product not found");
        } else {
          setProductDetail(product);
        }
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, products]);

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !productDetail) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ErrorMessage message={error || "Product not found"} />
        <div className="mt-8">
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-6">
        <Button onClick={handleGoBack} variant="outline" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                width={400}
                height={400}
                src={productDetail.image}
                alt={productDetail.title}
                className="w-full h-full object-contain object-center"
                unoptimized
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">
              {productDetail.title}
            </h1>

            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">
                ${productDetail.price.toFixed(2)}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-base text-gray-700">
                {productDetail.description}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Category</h3>
              <p className="mt-1 text-sm text-gray-500 capitalize">
                {productDetail.category}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 focus:outline-none focus:text-gray-600 p-1 rounded-md border border-gray-300"
                >
                  <span className="sr-only">Decrease quantity</span>-
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 0) {
                      setQuantity(value);
                    }
                  }}
                  className="mx-2 border text-center w-16 rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 focus:outline-none focus:text-gray-600 p-1 rounded-md border border-gray-300"
                >
                  <span className="sr-only">Increase quantity</span>+
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="primary"
                isFullWidth
                className="flex items-center justify-center cursor-pointer"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                isFullWidth
                className="flex items-center justify-center"
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>

              <Button
                variant="outline"
                size="md"
                className="hidden sm:flex items-center justify-center"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
