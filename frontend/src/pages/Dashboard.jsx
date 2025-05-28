import React, {useState , useEffect} from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

function Dashboard() {
  const { setCartCount, cartCount } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const checkUserLogin = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/login/${user.sub}`);
        console.log('Backend response:', response.data);
        navigate('/dashboard');
      } 
      catch (error) {
          if (error.response) {
              if (error.response.status === 404) {
                  navigate('/create-account');
              } else {
                  console.error("Server error:", error.response.data.message);
              }
          } else {
              console.error("Network or unexpected error:", error.message);
          }
        }
    };

    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
        setProducts(productsResponse.data);
        console.log('Products fetched:', productsResponse.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user && user.sub) {
      checkUserLogin();
    }
    fetchProducts();
  }, [user]);

  const categories = [
    { id: 1, name: "Electronics", count: 120, image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Fashion", count: 80, image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Home & Kitchen", count: 100, image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Sports", count: 60, image: "https://via.placeholder.com/300x200" },
  ];

  const handleAddToCart = async(product) => {
    setCartCount(cartCount + 1);

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/`, {
        userId: user.sub,
        product: product
      });
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      alert("Product added to cart successfully!");
    }
  };

  const handleRegister = () => {
    navigate('/create-account');
  };


  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white font-sans min-w-screen">
      
      {/* Hero Section */}
      <motion.section
        className="py-20 text-center bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700 shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to ShopNexus
          </motion.h1>
          <p className="mt-4 text-lg text-gray-300">Discover Amazing Products at Unbeatable Prices</p>
          <div className="mt-6 space-x-4" onClick={handleRegister}>
            <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-purple-100 transition">
              Shop Now
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="bg-transparent text-white px-6 py-2 border border-white rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition">
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "↩️", title: "Easy Returns", desc: "30 days return policy" },
            { icon: "🔒", title: "Secure Payment", desc: "100% secure checkout" },
            { icon: "🎧", title: "24/7 Support", desc: "Dedicated support team" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-gray-800 to-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl text-center font-bold text-cyan-300 mb-10">Shop by Category</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              whileHover={{ scale: 1.02 }}
            >
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <p className="text-sm text-gray-300">{category.count} Products</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section className="py-16 bg-black text-white">
        <h2 className="text-4xl text-center font-bold text-indigo-300 mb-10">Featured Products</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4">
          {products.map((product, index) => (
            <motion.div
              key={product.productId}
              className="bg-gray-800 rounded-xl shadow-md hover:shadow-2xl overflow-hidden"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className="relative">
                {/* <img src={product.image} alt={product.name} className="w-full h-64 object-cover" /> */}
                <div className="absolute top-4 right-4 space-x-2">
                  <button className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition">❤️</button>
                  <button onClick={() => handleAddToCart(product)} className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition">🛒</button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-blue-400 mt-2">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold transition"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Promotional Offer */}
      <motion.section
        className="py-20 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
        <p className="text-lg mb-6">Get 20% off on your first purchase</p>
        <button className="bg-white text-pink-700 px-8 py-3 font-bold rounded-full hover:bg-gray-100 transition">Shop Now</button>
      </motion.section>

      {/* Newsletter */}
      <motion.section className="py-20 bg-gray-900 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-8 text-gray-400">Get the latest updates on new products and upcoming sales</p>
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-2 rounded-l-full border border-gray-600 bg-gray-800 text-white w-64 focus:outline-none"
          />
          <button type="submit" className="bg-indigo-500 px-6 py-2 rounded-r-full text-white font-bold hover:bg-indigo-600">Subscribe</button>
        </form>
      </motion.section>

      {/* Brands */}
      <motion.section className="py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800">
        <h2 className="text-3xl text-center font-bold mb-10 text-violet-300">Our Brands</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
          {[1, 2, 3, 4, 5].map((brand) => (
            <motion.div
              key={brand}
              className="bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <img src={`https://via.placeholder.com/150?text=Brand${brand}`} alt={`Brand ${brand}`} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 text-white py-6 text-center">
        <p className="text-sm">&copy; 2025 ShopNexus. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
