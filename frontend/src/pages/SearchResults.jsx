import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { getCookie } from '../utils/cookie';

const SearchResults = () => {
  const userId = getCookie('userId');
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query');
  const [results, setResults] = useState([]);
  const { cartCount, setCartCount } = useCart();

  const handleAddToCart = async(product) => {
    setCartCount(cartCount + 1);

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/`, {
        userId: userId,
        product: product
      });
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      alert("Product added to cart successfully!");
    }
  };


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/search/${query}`);
        setResults(res.data);
      } catch (err) {
        console.error('Search error:', err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        Search results for <span className="text-indigo-600">"{query}"</span>
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:scale-105 duration-300"
            >
              <img
                src={product.image || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                <p className="text-indigo-600 font-bold mt-2">₹{product.price}</p>

                <button
                  className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;