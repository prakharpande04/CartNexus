import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getCookie } from '../utils/cookie';
import axios from 'axios';

function Cart() {
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useCart();
  const userId = getCookie('userId');

  const [cartItems, setCartItems] = useState([]);

  // Calculate subtotal from cartItems
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        const cart = res.data;

        if (!cart || !cart.items) {
          setCartItems([]);
          setCartCount(0);
          return;
        }

        // Map cart.items to extract necessary product details
        const allItems = cart.items.map((item) => {
          const product = item.productId || {};
          return {
            id: item._id || product._id, // unique id for react keys
            name: item.name || product.name || 'Unnamed product',
            price: item.price ?? product.price ?? 0,
            quantity: item.quantity ?? 1,
            image: product.image || '', // product image if available
          };
        });

        setCartItems(allItems);

        // Sum total quantity
        const totalQuantity = allItems.reduce(
          (acc, item) => acc + (item.quantity ?? 0),
          0
        );
        setCartCount(totalQuantity);

        console.log('Cart items:', allItems);
        console.log('Total cart quantity:', totalQuantity);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };

    fetchCartItems();
  }, [userId, setCartCount]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update cartCount as well
    const currentItem = cartItems.find((item) => item.id === id);
    if (!currentItem) return;
    const diff = newQuantity - currentItem.quantity;
    setCartCount(cartCount + diff);
  };

  const handleRemoveItem = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (!itemToRemove) return;

    setCartCount(cartCount - itemToRemove.quantity);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const goToMain = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 py-10 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Add some items to your cart to see them here</p>
            <button
              onClick={goToMain}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
                >
                  <div className="flex items-center gap-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded text-gray-500">
                        No Image
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                    >
                      −
                    </button>
                    <span className="font-semibold text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-gray-800 font-semibold text-lg mt-4 sm:mt-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-2xl"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">Order Summary</h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition">
                Proceed to Checkout
              </button>
              <button
                onClick={goToMain}
                className="mt-3 w-full text-blue-600 hover:text-blue-800 underline"
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
