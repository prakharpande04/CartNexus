import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { getCookie } from "../utils/cookie"
import axios from "axios"

function Cart() {
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [updatingItem, setUpdatingItem] = useState(null)
  const [removingItem, setRemovingItem] = useState(null)
  const navigate = useNavigate()
  const { cartCount, setCartCount } = useCart()
  const userId = getCookie("userId")

  const subtotal = cartItems.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 0), 0)
  const shipping = 40
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`)
        const cart = res.data

        if (!cart || !cart.items) {
          setCartItems([])
          setCartCount(0)
          return
        }

        const allItems = cart.items.map((item) => {
          const product = item.productId || {}
          return {
            id: item.productId,
            name: item.name || product.name || "Unnamed product",
            price: item.price ?? product.price ?? 0,
            quantity: item.quantity ?? 1,
            image: product.image || "",
          }
        })

        setCartItems(allItems)

        const totalQuantity = allItems.reduce((acc, item) => acc + (item.quantity ?? 0), 0)
        setCartCount(totalQuantity)
      } catch (err) {
        console.error("Error fetching cart items:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [userId, setCartCount])

  useEffect(() => {
    console.log(cartItems);
  },
  [cartItems]);

  const handleClearCart = async() => {
    setCartItems([]);
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/clear/${userId}`)
    console.log(response);
    setCartCount(0);
  }

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return
    setUpdatingItem(id)

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))

    try {
      // send to backend
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}/${id}/${newQuantity}`)

      if (response.status !== 200) {
        console.error("Error updating cart item:", response.data)
      }

      const currentItem = cartItems.find((item) => item.id === id)
      if (!currentItem) return
      const diff = newQuantity - currentItem.quantity
      setCartCount(cartCount + diff)
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setUpdatingItem(null)
    }
  }

  const handleRemoveItem = async (productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId)
    if (!itemToRemove) return

    setRemovingItem(productId)

    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}/${productId}`)

      if (response.status === 200) {
        setCartCount(cartCount - itemToRemove.quantity)
        setCartItems(cartItems.filter((item) => item.id !== productId))
      }
    } catch (error) {
      console.error("Error removing item from cart:", error)
    } finally {
      setRemovingItem(null)
    }
  }

  const goToMain = () => {
    navigate("/dashboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-gray-400 text-lg">
            {cartItems.length === 0
              ? "Your cart is empty"
              : `You have ${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} in your cart`}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-12 max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <button
              onClick={goToMain}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Cart Items
                  </h2>
                  <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                    {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                  </div>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg
                              className="w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">{item.name}</h3>
                          <p className="text-gray-400 text-sm">Unit Price: ₹{item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={updatingItem === item.id}
                            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 disabled:opacity-50"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-white font-medium w-6 text-center">
                            {updatingItem === item.id ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={updatingItem === item.id}
                            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 disabled:opacity-50"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <div className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removingItem === item.id}
                          className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                          aria-label={`Remove ${item.name}`}
                        >
                          {removingItem === item.id ? (
                            <div className="w-4 h-4 border-2 border-red-300/30 border-t-red-300 rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={goToMain}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleClearCart}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Shipping</span>
                    <span className="font-medium">₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Tax (18%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    Proceed to Checkout
                  </button>
                </div>

                {/* Secure Checkout Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 bg-white/5 rounded-lg p-3 border border-white/10">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-sm text-gray-300">Secure Checkout</span>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="w-10 h-6 bg-white/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-white/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-white/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AMEX</span>
                  </div>
                  <div className="w-10 h-6 bg-white/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">UPI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #2563eb);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}

export default Cart

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { getCookie } from '../utils/cookie';
// import axios from 'axios';
// import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
// import Loader from '../components/Loader'; // Assuming you have a Loader component

// function Cart() {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { cartCount, setCartCount } = useCart();
//   const userId = getCookie('userId');

//   const [cartItems, setCartItems] = useState([]);

//   const subtotal = cartItems.reduce(
//     (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
//     0
//   );
//   const shipping = 10;
//   const tax = subtotal * 0.18;
//   const total = subtotal + shipping + tax;

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`);
//         const cart = res.data;

//         if (!cart || !cart.items) {
//           setCartItems([]);
//           setCartCount(0);
//           return;
//         }

//         const allItems = cart.items.map((item) => {
//           const product = item.productId || {};
//           return {
//             id: item._id || product._id,
//             name: item.name || product.name || 'Unnamed product',
//             price: item.price ?? product.price ?? 0,
//             quantity: item.quantity ?? 1,
//             image: product.image || '',
//           };
//         });

//         setCartItems(allItems);

//         const totalQuantity = allItems.reduce(
//           (acc, item) => acc + (item.quantity ?? 0),
//           0
//         );
//         setCartCount(totalQuantity);
//       } catch (err) {
//         console.error('Error fetching cart items:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, [userId, setCartCount]);

//   const handleQuantityChange = async(id, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );

//     // send to backend
//     const response = await axios.put(
//       `${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}/${id}/${newQuantity}`
//     );

//     if (response.status !== 200) {
//       console.error('Error updating cart item:', response.data);
//     }

//     const currentItem = cartItems.find((item) => item.id === id);
//     if (!currentItem) return;
//     const diff = newQuantity - currentItem.quantity;
//     setCartCount(cartCount + diff);
//   };

//   const handleRemoveItem = async(productId) => {
//     const itemToRemove = cartItems.find((item) => item.id === productId);
//     if (!itemToRemove) return;

//     try {
//       const response = await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}/${productId}`
//       );

//       if (response.status === 200) {
//         setCartCount(cartCount - itemToRemove.quantity);
//         setCartItems(cartItems.filter((item) => item.id !== productId));
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   const goToMain = () => {
//     navigate('/dashboard');
//   };

//   return (
//     loading ? <Loader /> :
//     <div className="min-h-screen min-w-screen bg-gray-50 py-10 px-4 sm:px-8">
//       <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
//         <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
//           🛒 Your Shopping Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <div className="text-center py-20">
//             <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
//             <p className="text-gray-500 mt-2">Add some items to your cart to see them here.</p>
//             <button
//               onClick={goToMain}
//               className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-6">
//               {cartItems.map((item) => (
//                 <div
//                   className="flex flex-col sm:flex-row items-center justify-between gap-6 border p-4 rounded-xl shadow-sm bg-white"
//                 >
//                   <div className="flex items-center gap-5">
//                     {item.image ? (
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-24 h-24 object-cover rounded-xl border"
//                       />
//                     ) : (
//                       <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
//                         No Image
//                       </div>
//                     )}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                       <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                       className="bg-gray-200 p-2 rounded hover:bg-gray-300"
//                     >
//                       <MinusIcon className="h-5 w-5 text-gray-700" />
//                     </button>
//                     <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                       className="bg-gray-200 p-2 rounded hover:bg-gray-300"
//                     >
//                       <PlusIcon className="h-5 w-5 text-gray-700" />
//                     </button>
//                   </div>

//                   <div className="text-lg font-semibold text-gray-900">
//                     ₹{(item.price * item.quantity).toFixed(2)}
//                   </div>

//                   <button
//                     onClick={() => handleRemoveItem(item.id)}
//                     className="text-red-500 hover:text-red-700"
//                     aria-label={`Remove ${item.name}`}
//                   >
//                     <TrashIcon className="h-6 w-6" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Summary */}
//             <div className="bg-gray-100 p-6 rounded-2xl shadow-inner">
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
//               <div className="space-y-4 text-gray-600 text-base">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>₹{shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Tax (18%)</span>
//                   <span>₹{tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-4 mt-4 flex justify-between text-xl font-semibold text-gray-900">
//                   <span>Total</span>
//                   <span>₹{total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition font-medium text-lg"
//                 onClick={() => navigate('/checkout')}
//               >
//                 Proceed to Checkout
//               </button>
//               <button
//                 onClick={goToMain}
//                 className="mt-3 w-full text-blue-600 hover:text-blue-800 text-sm underline"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cart;
