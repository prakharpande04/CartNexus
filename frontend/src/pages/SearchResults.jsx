import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useCart } from "../context/CartContext"
import { getCookie } from "../utils/cookie"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchResults = () => {
  const userId = getCookie("userId")
  const { search } = useLocation()
  const query = new URLSearchParams(search).get("query")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [addingToCart, setAddingToCart] = useState(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [filterBy, setFilterBy] = useState("all")
  const { cartCount, setCartCount } = useCart()

  const handleAddToCart = async (product) => {
    setAddingToCart(product._id)
    setCartCount(cartCount + 1)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/`, {
        userId: userId,
        product: product,
      })
      console.log("Product added to cart:", response.data)
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error)
    } finally {
      setAddingToCart(null)
    }
  }

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return

      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/search/${query}`)
        setResults(res.data)
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Searching for "{query}"...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Search Results for
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              "{query}"
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            {results.length} {results.length === 1 ? "product" : "products"} found
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filters and Sort */}
        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                    />
                  </svg>
                  <span className="text-white font-medium">Sort by:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="relevance" className="bg-slate-800">
                    Relevance
                  </option>
                  <option value="price-low" className="bg-slate-800">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="bg-slate-800">
                    Price: High to Low
                  </option>
                  <option value="name" className="bg-slate-800">
                    Name: A to Z
                  </option>
                </select>
              </div>

              <div className="text-gray-400 text-sm">Showing {sortedResults.length} results</div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Products Found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any products matching "{query}". Try searching with different keywords.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Check your spelling</p>
                <p>• Try more general keywords</p>
                <p>• Browse our categories instead</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedResults.map((product, index) => (
              <div
                key={product._id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
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
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
                    {product.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                    )}
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
                        ₹{product.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product._id}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {addingToCart === product._id ? (
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
        )}

        {/* Search Suggestions */}
        {results.length === 0 && (
          <div className="mt-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Popular Searches</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Electronics", "Fashion", "Home & Kitchen", "Sports", "Books", "Beauty"].map((suggestion) => (
                  <button
                    key={suggestion}
                    className="px-4 py-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { getCookie } from '../utils/cookie';

// const SearchResults = () => {
//   const userId = getCookie('userId');
//   const { search } = useLocation();
//   const query = new URLSearchParams(search).get('query');
//   const [results, setResults] = useState([]);
//   const { cartCount, setCartCount } = useCart();

//   const handleAddToCart = async(product) => {
//     setCartCount(cartCount + 1);

//     try{
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/`, {
//         userId: userId,
//         product: product
//       });
//       console.log('Product added to cart:', response.data);
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//     } finally {
//       alert("Product added to cart successfully!");
//     }
//   };


//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/search/${query}`);
//         setResults(res.data);
//       } catch (err) {
//         console.error('Search error:', err);
//       }
//     };

//     if (query) fetchResults();
//   }, [query]);

//   return (
//     <div className="px-6 py-8 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">
//         Search results for <span className="text-indigo-600">"{query}"</span>
//       </h2>

//       {results.length === 0 ? (
//         <p className="text-gray-500 text-lg">No products found.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {results.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:scale-105 duration-300"
//             >
//               <img
//                 src={product.image || 'https://via.placeholder.com/300'}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
//                 <p className="text-indigo-600 font-bold mt-2">₹{product.price}</p>

//                 <button
//                   className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
//                   onClick={() => handleAddToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;