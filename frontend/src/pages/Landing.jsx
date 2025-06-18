import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom";

function Landing() {
  const { loginWithRedirect } = useAuth0()
  const navigate = useNavigate();
  
  const links = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-and-conditions" },
    { name: "Support", path: "/support" },
  ];

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Hero Section */}
      <header className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo/Brand */}
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

          {/* Main Heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              ShopNexus
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products at unbeatable prices. Your perfect shopping destination with premium quality and
            exceptional service.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <button
              onClick={() => loginWithRedirect()}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Start Shopping
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
      </header>

      {/* Categories Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Electronics", icon: "💻", color: "from-blue-500 to-cyan-500" },
              { name: "Fashion", icon: "👗", color: "from-pink-500 to-rose-500" },
              { name: "Home & Living", icon: "🏠", color: "from-green-500 to-emerald-500" },
              { name: "Beauty", icon: "💄", color: "from-purple-500 to-violet-500" },
            ].map((category, index) => (
              <div
                key={category.name}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm">Explore our collection</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Handpicked premium products just for you</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Premium Headphones", price: "₹299.99", rating: 4.8 },
              { name: "Smart Watch", price: "₹199.99", rating: 4.9 },
              { name: "Wireless Speaker", price: "₹149.99", rating: 4.7 },
              { name: "Gaming Mouse", price: "₹79.99", rating: 4.6 },
            ].map((product, index) => (
              <div
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {product.price}
                      </span>
                      <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
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
              <ul className="space-y-3 cursor-pointer">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    About
                  </a>
                </li>
                <li onClick={() => {
                  navigate('contact-us');
                }}>
                  <a className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Contact
                  </a>
                </li>
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

export default Landing



// import React from 'react'
// // import './styles/Landing.css' 
// import { useAuth0 } from "@auth0/auth0-react";

// function Landing() {
//   const { loginWithRedirect} = useAuth0();

//   return (
//     <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-900">

//       {/* Hero Section */}
//       <header className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-6">
//         <div className="max-w-3xl text-center">
//           <h1 className="text-5xl font-extrabold mb-6">Welcome to ShopNexus</h1>
//           <p className="text-lg mb-8">Discover amazing products at unbeatable prices. Your perfect shopping destination!</p>
//           <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
//             onClick={() => loginWithRedirect()}
//           >
//             Start Shopping
//           </button>
//         </div>
//       </header>

//       {/* Categories */}
//       <section className="py-20 px-6 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
//         <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
//           {[
//             { name: 'Electronics', img: 'https://via.placeholder.com/300?text=Electronics' },
//             { name: 'Fashion', img: 'https://via.placeholder.com/300?text=Fashion' },
//             { name: 'Home & Living', img: 'https://via.placeholder.com/300?text=Home+%26+Living' },
//             { name: 'Beauty', img: 'https://via.placeholder.com/300?text=Beauty' },
//           ].map(({ name, img }) => (
//             <div
//               key={name}
//               className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition"
//               aria-label={`Category: ${name}`}
//             >
//               <img className="w-full h-48 object-cover" src={img} alt={name} />
//               <h3 className="text-center text-xl font-semibold p-4">{name}</h3>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-inner">
//         <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
//         <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
//           {[1, 2, 3, 4].map((item) => (
//             <div
//               key={item}
//               className="bg-white rounded-xl shadow-md p-5 text-center transform hover:scale-105 transition"
//               aria-label={`Product ${item}`}
//             >
//               <img
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//                 src={`https://via.placeholder.com/250?text=Product+${item}`}
//                 alt={`Product ${item}`}
//               />
//               <h3 className="text-lg font-semibold mb-2">Product Name</h3>
//               <p className="text-indigo-600 font-bold text-xl">$99.99</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Special Offers */}
//       <section className="py-20 px-6 max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl text-white shadow-lg mt-20 mb-12">
//         <h2 className="text-4xl font-extrabold mb-4">Special Offer</h2>
//         <p className="text-lg mb-8">Get 20% off on your first purchase! Don’t miss out.</p>
//         <button className="bg-white text-indigo-700 font-bold px-10 py-3 rounded-lg hover:bg-gray-100 transition">
//           Learn More
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12 px-6">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
//           <div>
//             <h3 className="text-lg font-semibold mb-4">About Us</h3>
//             <p>Your trusted online shopping destination with quality products and excellent service.</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul>
//               <li><a href="#home" className="hover:text-white">Home</a></li>
//               <li><a href="#products" className="hover:text-white">Products</a></li>
//               <li><a href="#about" className="hover:text-white">About</a></li>
//               <li><a href="#contact" className="hover:text-white">Contact</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <p>Email: info@shopnexus.com</p>
//             <p>Phone: (555) 123-4567</p>
//           </div>
//         </div>
//         <div className="text-center mt-12 text-gray-500 text-sm">
//           &copy; 2024 ShopNexus. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Landing;
