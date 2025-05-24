import React from 'react'
import './styles/Landing.css'

function Landing() {
  return (
    <div className='landing-container'>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopNexus</h1>
          <p>Discover Amazing Products at Unbeatable Prices</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </header>

      {/* Featured Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="https://via.placeholder.com/300" alt="Electronics" />
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/300" alt="Fashion" />
            <h3>Fashion</h3>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/300" alt="Home & Living" />
            <h3>Home & Living</h3>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/300" alt="Beauty" />
            <h3>Beauty</h3>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="product-card">
              <img src="https://via.placeholder.com/250" alt={`Product ${item}`} />
              <h3>Product Name</h3>
              <p className="price">$99.99</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="special-offers">
        <div className="offer-card">
          <h2>Special Offer</h2>
          <p>Get 20% off on your first purchase</p>
          <button className="offer-button">Learn More</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Your trusted online shopping destination</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@shopnexus.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ShopNexus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing