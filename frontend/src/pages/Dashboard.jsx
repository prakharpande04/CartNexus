import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const { setCartCount, cartCount } = useCart()
  const navigate = useNavigate()
  const { user } = useAuth0()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [addingToCart, setAddingToCart] = useState(null)

  const links = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-and-conditions" },
    { name: "Support", path: "/support" },
  ];

  useEffect(() => {
    const checkUserLogin = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/login/${user.sub}`)
        console.log("Backend response:", response.data)
        navigate("/dashboard")
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            navigate("/create-account")
          } else {
            console.error("Server error:", error.response.data.message)
          }
        } else {
          console.error("Network or unexpected error:", error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const productsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
        setProducts(productsResponse.data)
        console.log("Products fetched:", productsResponse.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user && user.sub) {
      checkUserLogin()
    }
    fetchProducts()
  }, [user, navigate])

  const categories = [
    { id: 1, name: "Electronics", count: 120, icon: "💻", color: "from-blue-500 to-cyan-500" },
    { id: 2, name: "Clothes", count: 80, icon: "👗", color: "from-pink-500 to-rose-500" },
    { id: 3, name: "Home & Kitchen", count: 100, icon: "🏠", color: "from-green-500 to-emerald-500" },
    { id: 4, name: "Sports", count: 60, icon: "⚽", color: "from-orange-500 to-red-500" },
  ]

  const features = [
    { icon: "🚚", title: "Free Shipping", desc: "On orders over ₹499", color: "from-blue-500 to-blue-600" },
    { icon: "↩️", title: "Easy Returns", desc: "30 days return policy", color: "from-green-500 to-green-600" },
    { icon: "🔒", title: "Secure Payment", desc: "100% secure checkout", color: "from-purple-500 to-purple-600" },
    { icon: "🎧", title: "24/7 Support", desc: "Dedicated support team", color: "from-orange-500 to-orange-600" },
  ]

  const handleAddToCart = async (product) => {
    setAddingToCart(product.productId)
    setCartCount(cartCount + 1)
    console.log("product : ", product)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/`, {
        userId: user.sub,
        product: product,
      })
      console.log("Product added to cart:", response.data)
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error)
    } finally {
      setAddingToCart(null)
      // toast("Product added to cart !!");
      // alert("Product added to cart successfully!")
    }
  }

  const handleRegister = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/payment-success", { state: { orderId: "ORD123456" } })
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading amazing products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Or "light" or "colored"
      />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 animate-bounce"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg opacity-25 animate-bounce delay-1000"></div>

          {/* Main Content */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              ShopNexus
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products at unbeatable prices. Your ultimate shopping destination with premium quality and
            exceptional service.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button
              onClick={handleRegister}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Shop Now
              </span>
            </button>
            <button className="group inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Learn More
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Premium Products" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Explore our wide range of premium products</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => navigate(`/search?query=${encodeURIComponent(category.name)}`)}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <div
                      className={`w-24 h-24 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-4xl`}
                    >
                      {category.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                    <p className="text-gray-400 text-sm">{category.count} Products</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Handpicked premium products just for you</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.productId}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">(4.8)</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.productId}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {addingToCart === product.productId ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                            />
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-md rounded-3xl border border-white/20 p-12 text-center shadow-2xl">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Special Offer
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get 20% off on your first purchase! Limited time offer. Don't miss out on this amazing deal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-8 py-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Claim Offer
              </button>
              <div className="text-gray-400">
                <span className="text-sm">Offer expires in:</span>
                <div className="text-2xl font-bold text-white">24:59:59</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-400 mb-8 text-lg">Get the latest updates on new products and upcoming sales</p>
            <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Brands
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((brand, index) => (
              <div
                key={brand}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-white">B{brand}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-md border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">ShopNexus</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted online shopping destination with quality products and excellent service.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "Products", "About", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Categories</h3>
              <ul className="space-y-3">
                {["Electronics", "Fashion", "Home & Living", "Beauty"].map((category) => (
                  <li key={category}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>info@shopnexus.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 sm:mb-0">© 2024 ShopNexus. All rights reserved.</div>
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard


// import React, {useState , useEffect} from 'react';
// import { motion } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from 'axios';
// import Loader from '../components/Loader';

// function Dashboard() {
//   const { setCartCount, cartCount } = useCart();
//   const navigate = useNavigate();
//   const { user } = useAuth0();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const checkUserLogin = async () => {
//       setLoading(true);
//       try{
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/login/${user.sub}`);
//         console.log('Backend response:', response.data);
//         navigate('/dashboard');
//       } 
//       catch (error) {
//           if (error.response) {
//               if (error.response.status === 404) {
//                   navigate('/create-account');
//               } else {
//                   console.error("Server error:", error.response.data.message);
//               }
//           } else {
//               console.error("Network or unexpected error:", error.message);
//           }
//         } finally {
//           setLoading(false);
//         }
//     };

//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const productsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
//         setProducts(productsResponse.data);
//         console.log('Products fetched:', productsResponse.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user && user.sub) {
//       checkUserLogin();
//     }
//     fetchProducts();
//   }, [user]);

//   const categories = [
//     { id: 1, name: "Electronics", count: 120, image: "https://via.placeholder.com/300x200" },
//     { id: 2, name: "Fashion", count: 80, image: "https://via.placeholder.com/300x200" },
//     { id: 3, name: "Home & Kitchen", count: 100, image: "https://via.placeholder.com/300x200" },
//     { id: 4, name: "Sports", count: 60, image: "https://via.placeholder.com/300x200" },
//   ];

//   const handleAddToCart = async(product) => {
//     setCartCount(cartCount + 1);
//     console.log("product : ",product);

//     try{
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/`, {
//         userId: user.sub,
//         product: product
//       });
//       console.log('Product added to cart:', response.data);
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//     } finally {
//       alert("Product added to cart successfully!");
//     }
//   };

//   const handleRegister = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       navigate('/payment-success', { state: { orderId: "ORD123456" } });
//       // navigate('/create-account');
//     }, 2000);
//   };


//   const fadeInUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   return (
//     loading ? <Loader /> :
//     <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white font-sans min-w-screen">
      
//       {/* Hero Section */}
//       <motion.section
//         className="py-20 text-center bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700 shadow-2xl"
//         initial="hidden"
//         animate="visible"
//         variants={fadeInUp}
//       >
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
//             Welcome to ShopNexus
//           </motion.h1>
//           <p className="mt-4 text-lg text-gray-300">Discover Amazing Products at Unbeatable Prices</p>
//           <div className="mt-6 space-x-4" onClick={handleRegister}>
//             <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-purple-100 transition">
//               Shop Now
//             </motion.button>
//             <motion.button whileHover={{ scale: 1.05 }} className="bg-transparent text-white px-6 py-2 border border-white rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition">
//               Learn More
//             </motion.button>
//           </div>
//         </div>
//       </motion.section>

//       {/* Features Section */}
//       <section className="py-16 text-center">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4">
//           {[
//             { icon: "🚚", title: "Free Shipping", desc: "On orders over ₹499" },
//             { icon: "↩️", title: "Easy Returns", desc: "30 days return policy" },
//             { icon: "🔒", title: "Secure Payment", desc: "100% secure checkout" },
//             { icon: "🎧", title: "24/7 Support", desc: "Dedicated support team" }
//           ].map((feature, index) => (
//             <motion.div
//               key={index}
//               className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
//               whileInView={{ opacity: 1, y: 0 }}
//               initial={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//             >
//               <div className="text-5xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
//               <p className="text-sm text-gray-300">{feature.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Categories Section */}
//       <motion.section
//         className="py-16 bg-gradient-to-r from-gray-800 to-gray-900"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeInUp}
//       >
//         <h2 className="text-4xl text-center font-bold text-cyan-300 mb-10">Shop by Category</h2>
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
//           {categories.map((category) => (
//             <motion.div
//               key={category.id}
//               className="bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
//               whileHover={{ scale: 1.02 }}
//             >
//               <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold text-white">{category.name}</h3>
//                 <p className="text-sm text-gray-300">{category.count} Products</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Featured Products */}
//       <motion.section className="py-16 bg-black text-white">
//         <h2 className="text-4xl text-center font-bold text-indigo-300 mb-10">Featured Products</h2>
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4">
//           {products.map((product, index) => (
//             <motion.div
//               key={product.productId}
//               className="bg-gray-800 rounded-xl shadow-md hover:shadow-2xl overflow-hidden"
//               whileInView={{ opacity: 1, y: 0 }}
//               initial={{ opacity: 0, y: 30 }}
//               transition={{ duration: 0.4, delay: index * 0.2 }}
//             >
//               <div className="relative">
//                 {/* <img src={product.image} alt={product.name} className="w-full h-64 object-cover" /> */}
//                 <div className="absolute top-4 right-4 space-x-2">
//                   <button className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition">❤️</button>
//                   <button onClick={() => handleAddToCart(product)} className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition">🛒</button>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">{product.name}</h3>
//                 <p className="text-blue-400 mt-2">₹{product.price.toFixed(2)}</p>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Promotional Offer */}
//       <motion.section
//         className="py-20 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-center"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
//         <p className="text-lg mb-6">Get 20% off on your first purchase</p>
//         <button className="bg-white text-pink-700 px-8 py-3 font-bold rounded-full hover:bg-gray-100 transition">Shop Now</button>
//       </motion.section>

//       {/* Newsletter */}
//       <motion.section className="py-20 bg-gray-900 text-center text-white">
//         <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
//         <p className="mb-8 text-gray-400">Get the latest updates on new products and upcoming sales</p>
//         <form className="flex justify-center">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="px-6 py-2 rounded-l-full border border-gray-600 bg-gray-800 text-white w-64 focus:outline-none"
//           />
//           <button type="submit" className="bg-indigo-500 px-6 py-2 rounded-r-full text-white font-bold hover:bg-indigo-600">Subscribe</button>
//         </form>
//       </motion.section>

//       {/* Brands */}
//       <motion.section className="py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800">
//         <h2 className="text-3xl text-center font-bold mb-10 text-violet-300">Our Brands</h2>
//         <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
//           {[1, 2, 3, 4, 5].map((brand) => (
//             <motion.div
//               key={brand}
//               className="bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition"
//               whileHover={{ scale: 1.05 }}
//             >
//               <img src={`https://via.placeholder.com/150?text=Brand${brand}`} alt={`Brand ${brand}`} />
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 text-white py-6 text-center">
//         <p className="text-sm">&copy; 2025 ShopNexus. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default Dashboard;
