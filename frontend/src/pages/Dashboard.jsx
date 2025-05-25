import React from 'react';
import './styles/Dashboard.css';
import { useCart } from '../context/CartContext'; // Adjust path if needed

function Dashboard() {
  const { setCartCount, cartCount } = useCart();

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "https://via.placeholder.com/300",
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 149.99,
      image: "https://via.placeholder.com/300",
      rating: 4.8,
      reviews: 256
    },
    {
      id: 3,
      name: "Ultra HD Camera",
      price: 299.99,
      image: "https://via.placeholder.com/300",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      price: 79.99,
      image: "https://via.placeholder.com/300",
      rating: 4.6,
      reviews: 342
    }
  ];

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://via.placeholder.com/400",
      count: 150
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://via.placeholder.com/400",
      count: 320
    },
    {
      id: 3,
      name: "Home & Living",
      image: "https://via.placeholder.com/400",
      count: 95
    },
    {
      id: 4,
      name: "Beauty",
      image: "https://via.placeholder.com/400",
      count: 210
    }
  ];

  // Handler to add item to cart (increments cart count)
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopNexus</h1>
          <p>Discover Amazing Products at Unbeatable Prices</p>
          <div className="hero-buttons">
            <button className="primary-button">Shop Now</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <i className="fas fa-truck"></i>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-undo"></i>
          <h3>Easy Returns</h3>
          <p>30 days return policy</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-lock"></i>
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>Dedicated support team</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.count} Products</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button className="action-button">
                    <i className="fas fa-heart"></i>
                  </button>
                  {/* We can keep or remove this cart icon button. Keeping for UI */}
                  <button 
                    className="action-button" 
                    onClick={handleAddToCart} 
                    title="Add to cart"
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < Math.floor(product.rating) ? 'active' : ''}`}
                      ></i>
                    ))}
                  </div>
                  <span>({product.reviews})</span>
                </div>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button 
                  className="add-to-cart-button" 
                  onClick={handleAddToCart}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="promotion-banner">
        <div className="promotion-content">
          <h2>Special Offer</h2>
          <p>Get 20% off on your first purchase</p>
          <button className="promotion-button">Shop Now</button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest updates on new products and upcoming sales</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands">
        <h2>Our Brands</h2>
        <div className="brands-grid">
          {[1, 2, 3, 4, 5].map(brand => (
            <div key={brand} className="brand-logo">
              <img src={`https://via.placeholder.com/150?text=Brand${brand}`} alt={`Brand ${brand}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
