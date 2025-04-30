"use client";

import React from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
const CartPage = () => {
  const { items } = useSelector((state) => state.cart);
  console.log(items);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-gray-600">
            Add some items to your cart to continue shopping.
          </p>
          <Button
            variant="primary"
            className="mt-6 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 cursor-pointer">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item, id) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 mb-4"
            >
              <div className="flex items-center">
                <Image
                  width={80}
                  height={80}
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 border-r hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.totalQuantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 border-l hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {items.reduce((total, item) => total + item.totalAmount, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>$80.00</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {(
                      items.reduce(
                        (total, item) => total + item.totalAmount,
                        0
                      ) + 80
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              isFullWidth
              className="mt-6 cursor-pointer"
              onClick={() => router.push("/order")}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
