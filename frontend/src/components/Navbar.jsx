// import { useState, useEffect } from "react"
// import { useAuth0 } from "@auth0/auth0-react"
// import { useCart } from "../context/CartContext"
// import { useNavigate } from "react-router-dom"
// import { deleteCookie } from "../utils/cookie"
// import axios from "axios"

// function Navbar() {
//   const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()
//   const [showLogout, setShowLogout] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [navbarShadow, setNavbarShadow] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [showCategories, setShowCategories] = useState(false)
//   const { cartCount, setCartCount } = useCart()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchCartCount = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/cartCount/${user?.sub}`)
//         setCartCount(response.data.count)
//       } catch (error) {
//         console.error("Error fetching cart count:", error)
//       }
//     }

//     if (isAuthenticated && user?.sub) {
//       fetchCartCount()
//     }
//   }, [isAuthenticated, user, setCartCount])

//   const handleSearch = (e) => {
//     e.preventDefault()
//     navigate(`/search?query=${searchTerm}`)
//   }

//   const handleImageClick = () => {
//     setShowLogout(!showLogout)
//   }

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen)
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setNavbarShadow(true)
//       } else {
//         setNavbarShadow(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)

//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   const setSessionCookie = (name, value) => {
//     document.cookie = `${name}=${value}; path=/; SameSite=Strict`
//   }

//   useEffect(() => {
//     if (isAuthenticated && user?.sub) {
//       setSessionCookie("userId", user.sub)
//     }
//   }, [isAuthenticated, user])

//   const handleLogout = () => {
//     deleteCookie("userId")
//     logout()
//   }

//   const categories = [
//     { name: "Technology", icon: "💻" },
//     { name: "Business", icon: "💼" },
//     { name: "Health", icon: "🏥" },
//     { name: "Science", icon: "🔬" },
//   ]

//   const navItems = [
//     { name: "Home", icon: "🏠", path: "/" },
//     { name: "Categories", icon: "📂", dropdown: true },
//     { name: "Orders", icon: "📦", path: "/orders" },
//     { name: "Cart", icon: "🛒", path: "/cart", badge: cartCount },
//     { name: "Profile", icon: "👤", path: "/profile" },
//   ]

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         navbarShadow
//           ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
//           : "bg-white/90 backdrop-blur-sm"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Mobile menu button */}
//           <button
//             onClick={toggleMenu}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>

//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <a
//               href="http://localhost:5173"
//               className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
//             >
//               ShopNexus
//             </a>
//           </div>

//           {/* Search Bar - Desktop */}
//           {isAuthenticated && (
//             <div className="hidden md:flex flex-1 max-w-lg mx-8">
//               <form onSubmit={handleSearch} className="w-full relative">
//                 <div className="relative">
//                   <svg
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 placeholder-gray-500"
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1.5 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium"
//                   >
//                     Search
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-2">
//             {isAuthenticated ? (
//               <>
//                 {navItems.map((item) => (
//                   <div key={item.name} className="relative">
//                     {item.dropdown ? (
//                       <div
//                         className="relative"
//                         onMouseEnter={() => setShowCategories(true)}
//                         onMouseLeave={() => setShowCategories(false)}
//                       >
//                         <button className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group">
//                           <span className="text-lg mb-1">{item.icon}</span>
//                           <span className="text-xs font-medium">{item.name}</span>
//                         </button>
//                         {showCategories && (
//                           <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
//                             {categories.map((category) => (
//                               <button
//                                 key={category.name}
//                                 className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
//                               >
//                                 <span className="text-lg">{category.icon}</span>
//                                 <span className="font-medium">{category.name}</span>
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => navigate(item.path)}
//                         className="relative flex flex-col items-center justify-center p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group"
//                       >
//                         <span className="text-lg mb-1">{item.icon}</span>
//                         <span className="text-xs font-medium">{item.name}</span>
//                         {item.badge > 0 && (
//                           <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
//                             {item.badge}
//                           </span>
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   onClick={handleLogout}
//                   className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 ml-2"
//                 >
//                   <span className="text-lg mb-1">🚪</span>
//                   <span className="text-xs font-medium">Logout</span>
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={loginWithRedirect}
//                 className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         {isAuthenticated && (
//           <div className="md:hidden pb-4">
//             <form onSubmit={handleSearch} className="relative">
//               <svg
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-20 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1.5 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
//           menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setMenuOpen(false)}
//       >
//         <div
//           className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
//             menuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-6">
//             {/* Mobile Header */}
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                   ShopNexus
//                 </span>
//               </div>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//               >
//                 <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Mobile Navigation */}
//             {isAuthenticated ? (
//               <div className="space-y-2">
//                 {navItems.map((item) => (
//                   <div key={item.name}>
//                     {item.dropdown ? (
//                       <div>
//                         <button
//                           onClick={() => setShowCategories(!showCategories)}
//                           className="w-full flex items-center justify-between p-4 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all duration-200"
//                         >
//                           <div className="flex items-center gap-4">
//                             <span className="text-xl">{item.icon}</span>
//                             <span className="font-medium">{item.name}</span>
//                           </div>
//                           <svg
//                             className={`w-5 h-5 transition-transform duration-200 ${
//                               showCategories ? "rotate-180" : ""
//                             }`}
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                           </svg>
//                         </button>
//                         {showCategories && (
//                           <div className="ml-8 space-y-1">
//                             {categories.map((category) => (
//                               <button
//                                 key={category.name}
//                                 className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
//                               >
//                                 <span className="text-lg">{category.icon}</span>
//                                 <span>{category.name}</span>
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => {
//                           navigate(item.path)
//                           setMenuOpen(false)
//                         }}
//                         className="w-full flex items-center justify-between p-4 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all duration-200"
//                       >
//                         <div className="flex items-center gap-4">
//                           <span className="text-xl">{item.icon}</span>
//                           <span className="font-medium">{item.name}</span>
//                         </div>
//                         {item.badge > 0 && (
//                           <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                             {item.badge}
//                           </span>
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   onClick={() => {
//                     handleLogout()
//                     setMenuOpen(false)
//                   }}
//                   className="w-full flex items-center gap-4 p-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 mt-4 border-t border-gray-200"
//                 >
//                   <span className="text-xl">🚪</span>
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => {
//                   loginWithRedirect()
//                   setMenuOpen(false)
//                 }}
//                 className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar


import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./../assets/logos/logo.png";
import "./styles/Navbar.css";
import profileLogo from "./../assets/logos/profile-logo.png";
import cartLogo from "./../assets/logos/cart-logo.png";
import orderLogo from "./../assets/logos/orders.png";
import categoriesLogo from "./../assets/logos/categories.png";
import logoutLogo from "./../assets/logos/logout.png";
import homeLogo from "./../assets/logos/home.png";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../utils/cookie";
import axios from "axios";

function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [showLogout, setShowLogout] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [navbarShadow, setNavbarShadow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { cartCount, setCartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/cartCount/${user?.sub}`);
                setCartCount(response.data.count);
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };

        if (isAuthenticated && user?.sub) {
            fetchCartCount();
        }
    }, [isAuthenticated, user, setCartCount]);

    console.log(user);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchTerm}`);
    };


    const handleImageClick = () => {
        setShowLogout(!showLogout);
    };

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setNavbarShadow(true);
            } else {
                setNavbarShadow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const setSessionCookie = (name, value) => {
        document.cookie = `${name}=${value}; path=/; SameSite=Strict`;
    };

    useEffect(() => {
        if (isAuthenticated && user?.sub) {
            setSessionCookie('userId', user.sub);
        }
    }, [isAuthenticated, user]);

    const handleLogout = () => {
        deleteCookie('userId');
        logout();
    };

    return (
        <div className={`navbar ${navbarShadow ? 'navbar-shadow' : ''}`}>
            <button className="menu-button" onClick={toggleMenu}>
                ☰
            </button>


            <div className="nav-logo">
                <img src={logo} alt="Logo" className="logo" />
                <p className="app-title"><a href='http://localhost:5173'>ShopNexus</a></p>
            </div>

            { isAuthenticated && (
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button className="search-button"
                onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            )}

            <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                {isAuthenticated ? (
                <>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={handleLogout}
                >
                    <img src={logoutLogo} alt="LogoutLogo" className="navIcons"/>
                    <span className="text-xs">Logout</span>
                </li>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => navigate('/profile')}
                >
                    <img src={profileLogo} alt={user.name} className="navIcons"/>
                    <span className="text-xs">My Account</span>
                </li>


                <li className="relative flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => navigate('/cart')}
                >
                    <img src={cartLogo} alt="CartLogo" className="navIcons"/>
                    <span className="text-xs">Cart</span>

                    {/* Badge */}
                    <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                </li>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => navigate('/orders')}
                >
                    <img src={orderLogo} alt="OrdersLogo" className="navIcons"/>
                    <span className="text-xs">Orders</span>
                </li>

                <li className="group relative text-gray-700 hover:text-black cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                        <img src={categoriesLogo} alt="CategoriesLogo" className="navIcons"/>
                        <span className="text-xs">Categories</span>
                    </div>

                    <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden w-40 flex-col items-start bg-white text-black shadow-lg rounded-md p-2 group-hover:flex z-50">
                        {['Home & Kitchen', 'Electronics', 'Sports', 'Clothes'].map((category) => (
                            <li
                            key={category}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate(`/search?query=${encodeURIComponent(category)}`)}
                            >
                            {category}
                            </li>
                        ))}
                    </ul>
                </li>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img src={homeLogo} alt="HomeLogo" className="navIcons"/>
                    <span className="text-xs">Home</span>
                </li>

                </>
                
                ) : (
                <li className="navbar-item">
                    <button onClick={loginWithRedirect} className="login-button">
                    Login
                    </button>
                </li>
                )}
            </ul>
        </div>
    );
}

export default Navbar;