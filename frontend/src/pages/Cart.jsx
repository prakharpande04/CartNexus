import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getCookie } from '../utils/cookie';
import axios from 'axios';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import Loader from '../components/Loader'; // Assuming you have a Loader component

function Cart() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useCart();
  const userId = getCookie('userId');

  const [cartItems, setCartItems] = useState([]);

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`);
        const cart = res.data;

        if (!cart || !cart.items) {
          setCartItems([]);
          setCartCount(0);
          return;
        }

        const allItems = cart.items.map((item) => {
          const product = item.productId || {};
          return {
            id: item._id || product._id,
            name: item.name || product.name || 'Unnamed product',
            price: item.price ?? product.price ?? 0,
            quantity: item.quantity ?? 1,
            image: product.image || '',
          };
        });

        setCartItems(allItems);

        const totalQuantity = allItems.reduce(
          (acc, item) => acc + (item.quantity ?? 0),
          0
        );
        setCartCount(totalQuantity);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, setCartCount]);

  const handleQuantityChange = async(id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    // send to backend
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}/${id}/${newQuantity}`
    );

    if (response.status !== 200) {
      console.error('Error updating cart item:', response.data);
    }

    const currentItem = cartItems.find((item) => item.id === id);
    if (!currentItem) return;
    const diff = newQuantity - currentItem.quantity;
    setCartCount(cartCount + diff);
  };

  const handleRemoveItem = async(productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (!itemToRemove) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}/${productId}`
      );

      if (response.status === 200) {
        setCartCount(cartCount - itemToRemove.quantity);
        setCartItems(cartItems.filter((item) => item.id !== productId));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const goToMain = () => {
    navigate('/dashboard');
  };

  return (
    loading ? <Loader /> :
    <div className="min-h-screen min-w-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          🛒 Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Add some items to your cart to see them here.</p>
            <button
              onClick={goToMain}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-6 border p-4 rounded-xl shadow-sm bg-white"
                >
                  <div className="flex items-center gap-5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                        No Image
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                    >
                      <MinusIcon className="h-5 w-5 text-gray-700" />
                    </button>
                    <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                    >
                      <PlusIcon className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>

                  <div className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remove ${item.name}`}
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-inner">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
              <div className="space-y-4 text-gray-600 text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between text-xl font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition font-medium text-lg">
                Proceed to Checkout
              </button>
              <button
                onClick={goToMain}
                className="mt-3 w-full text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
