import React from "react";
import { ExternalLink } from "lucide-react";
import Button from "../../ui/Button";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  console.log(product);
  const hasDiscount =
    product.discount_amount &&
    typeof product.discount_amount === "number" &&
    product.discount_amount < product.price;
  console.log(`https://admin.refabry.com/storage/product/${product.image}`);

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
        <Link href={`/product/${product.slug}`}>
          <div className="h-64 w-full bg-gray-100 relative flex items-center justify-center overflow-hidden">
            <Image
              width={400}
              height={400}
              src={`https://admin.refabry.com/storage/product/${product.image}`}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              unoptimized
            />
          </div>
        </Link>
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            SALE
          </div>
        )}
        {product.status === "out_of_stock" && (
          <div className="absolute top-3 right-3 bg-gray-700 text-white px-2 py-1 text-xs font-semibold rounded">
            OUT OF STOCK
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2 h-14">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 h-10">
          {product.short_desc}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            {hasDiscount ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900">
                  ${product.discount_amount.toFixed(2)}
                </span>
                <span className="ml-2 text-sm line-through text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">SKU: {product.code}</div>
        </div>
        <div className="mt-4">
          <Link href={`/products/${product.id}`}>
            <Button
              variant="primary"
              isFullWidth
              disabled={product.status === "out_of_stock"}
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
