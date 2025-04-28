"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use useRouter from next/navigation
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import { useSelector } from "react-redux";
const PlaceOrderPage = () => {
  const router = useRouter();
  const { items, total } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    c_name: "",
    c_phone: "",
    address: "",
    courier: "steadfast",
  });

  // Redirect to the cart page if the cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        product_ids: items.map((item) => item.product.id).join(","),
        s_product_qty: items.map((item) => item.quantity).join(","),
        c_phone: formData.c_phone,
        c_name: formData.c_name,
        courier: formData.courier,
        address: formData.address,
        advance: null,
        cod_amount: total.toFixed(2),
        discount_amount: null,
        delivery_charge: "80",
      };

      // Simulate placing an order
      await placeOrder(orderData);
      dispatch(clearCart());
      router.push("/order-success"); // Navigate to the success page
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering the form if the cart is empty
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Place Order</h1>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="c_name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="c_name"
              name="c_name"
              required
              value={formData.c_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="c_phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="c_phone"
              name="c_phone"
              required
              value={formData.c_phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="courier"
              className="block text-sm font-medium text-gray-700"
            >
              Courier Service
            </label>
            <select
              id="courier"
              name="courier"
              value={formData.courier}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="steadfast">Steadfast</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {items
                    .reduce((total, sum) => total + sum.price, 0)
                    .toFixed(2)}
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
                    $
                    {items
                      .reduce((total, sum) => total + sum.price + 80, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            isFullWidth
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
