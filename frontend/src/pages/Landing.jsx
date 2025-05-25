import React from 'react'
// import './styles/Landing.css' 
import { useAuth0 } from "@auth0/auth0-react";

function Landing() {
  const { loginWithRedirect} = useAuth0();

  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-900">

      {/* Hero Section */}
      <header className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to ShopNexus</h1>
          <p className="text-lg mb-8">Discover amazing products at unbeatable prices. Your perfect shopping destination!</p>
          <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
            onClick={() => loginWithRedirect()}
          >
            Start Shopping
          </button>
        </div>
      </header>

      {/* Categories */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {[
            { name: 'Electronics', img: 'https://via.placeholder.com/300?text=Electronics' },
            { name: 'Fashion', img: 'https://via.placeholder.com/300?text=Fashion' },
            { name: 'Home & Living', img: 'https://via.placeholder.com/300?text=Home+%26+Living' },
            { name: 'Beauty', img: 'https://via.placeholder.com/300?text=Beauty' },
          ].map(({ name, img }) => (
            <div
              key={name}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition"
              aria-label={`Category: ${name}`}
            >
              <img className="w-full h-48 object-cover" src={img} alt={name} />
              <h3 className="text-center text-xl font-semibold p-4">{name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-inner">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-md p-5 text-center transform hover:scale-105 transition"
              aria-label={`Product ${item}`}
            >
              <img
                className="w-full h-48 object-cover rounded-lg mb-4"
                src={`https://via.placeholder.com/250?text=Product+${item}`}
                alt={`Product ${item}`}
              />
              <h3 className="text-lg font-semibold mb-2">Product Name</h3>
              <p className="text-indigo-600 font-bold text-xl">$99.99</p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl text-white shadow-lg mt-20 mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Special Offer</h2>
        <p className="text-lg mb-8">Get 20% off on your first purchase! Don’t miss out.</p>
        <button className="bg-white text-indigo-700 font-bold px-10 py-3 rounded-lg hover:bg-gray-100 transition">
          Learn More
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>Your trusted online shopping destination with quality products and excellent service.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#products" className="hover:text-white">Products</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Email: info@shopnexus.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="text-center mt-12 text-gray-500 text-sm">
          &copy; 2024 ShopNexus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Landing;
