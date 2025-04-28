import React from "react";
import { ShoppingBag } from "lucide-react";
import ProductGrid from "../../components/ProductGrid/ProductGrid.jsx.js";
import { useProducts } from "./../../hooks/useProducts.js";

const HomePage = () => {
  const { products, loading, error } = useProducts();
  console.log(products, loading, error);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-xl mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Discover Amazing Products
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Explore our curated collection of high-quality products designed
                to enhance your lifestyle.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#products"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Shop Now
                </a>
                <a
                  href="#"
                  className="border border-white hover:bg-white hover:text-indigo-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-xl">
                <ShoppingBag className="h-36 w-36 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path
              fill="#F9FAFB"
              fillOpacity="1"
              d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,75C1120,75,1280,53,1360,42.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-gray-600">
              Browse our selection of high-quality products. Each item has been
              carefully selected for quality and value.
            </p>
          </div>

          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
