import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./../assets/logo.png";

function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [showLogout, setShowLogout] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [navbarShadow, setNavbarShadow] = useState(false);

    console.log(user);

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

    return (
        <div className={`navbar ${navbarShadow ? 'navbar-shadow' : ''}`}>
            <div className="nav-logo">
                <img src={logo} alt="Logo" className="logo" />
                <p className="app-title"><a href='http://localhost:5173'>QueryNexus</a></p>
            </div>

            <button className="menu-button" onClick={toggleMenu}>
                ☰
            </button>

            <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                <li className="navbar-item">
                {isAuthenticated ? (
                    <>
                    <img
                        src={user.picture}
                        alt={user.name}
                        className="user-image"
                        onClick={handleImageClick}
                    />
                    {showLogout && (
                        <button
                        onClick={() => logout({ returnTo: window.location.origin })}
                        className="logout-button"
                        >
                        Logout
                        </button>
                    )}
                    </>
                ) : (
                    <button onClick={() => loginWithRedirect()} className="login-button">
                    Login
                    </button>
                )}
                </li>
            </ul>
        </div>
    );
}

export default Navbar;