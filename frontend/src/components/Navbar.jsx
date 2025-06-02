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

    useEffect(async() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setNavbarShadow(true);
            } else {
                setNavbarShadow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // get cart count from backend
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cartCount/${user?.sub}`);

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
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Technology</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Business</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Health</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Science</li>
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