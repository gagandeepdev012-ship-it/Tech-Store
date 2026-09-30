import React, { useState, useEffect } from 'react';
import { productsData } from './productsData';
import { Icons } from './Icons';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import CompareModal from './CompareModal';
import CartDrawer from './CartDrawer';
import CheckoutWizard from './CheckoutWizard';
import { formatINR } from './utils';

export default function App() {
  // --- STATE ---
  const [products] = useState(productsData);
  
  // Reviews state (so newly posted reviews are persistent during session)
  const [reviews, setReviews] = useState(() => 
    productsData.reduce((acc, p) => {
      acc[p.id] = p.reviews || [];
      return acc;
    }, {})
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All'); // 'All', 'Laptops', 'Mobile', 'Audio', 'Wearables', 'Wishlist'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'
  
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(false);

  // --- ACTIONS ---

  // Theme Toggle
  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isLightTheme) {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
  }, [isLightTheme]);

  // Cart Management
  const handleAddToCart = (configuredItem) => {
    setCart((prevCart) => {
      // If adding a configured item from details modal, it has a cartId.
      // If quick-adding from card, generate a standard cartId.
      const cartId = configuredItem.cartId || `${configuredItem.id}-0-0`;
      const existingIndex = prevCart.findIndex((item) => item.cartId === cartId);
      
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            ...configuredItem,
            cartId,
            quantity: 1,
            selectedColor: configuredItem.selectedColor || configuredItem.colorNames?.[0] || 'Standard',
            selectedOption: configuredItem.selectedOption || configuredItem.options?.[0]?.name || 'Standard',
            configuredPrice: configuredItem.configuredPrice || configuredItem.price
          }
        ];
      }
    });
    // Trigger sliding drawer open automatically when item is added! (Good UX)
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartId === cartId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const handleApplyPromo = (code) => {
    setAppliedPromo(code);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // Wishlist
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Comparisons
  const handleToggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 3) return prev; // Limit comparison to 3 items
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromCompare = (product) => {
    setCompareList((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Reviews Posting
  const handleAddReview = (productId, newReview) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: [newReview, ...prev[productId]]
    }));
  };

  // Order Complete wizard actions
  const handleOrderCompleted = () => {
    setCart([]);
    setAppliedPromo(null);
    setIsCheckoutMode(false);
  };

  // Calculations for totals
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.configuredPrice || item.price) * item.quantity, 
    0
  );

  let discountAmount = 0;
  if (appliedPromo === 'NEXUS30') {
    discountAmount = Math.round(cartSubtotal * 0.3);
  }

  const estTax = Math.round((cartSubtotal - discountAmount) * 0.18);
  const finalTotal = cartSubtotal - discountAmount + estTax;

  // Filter and Sort calculation
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (selectedCategory === 'Wishlist') {
      if (!wishlist.includes(product.id)) return false;
    } else if (selectedCategory !== 'All') {
      if (product.category !== selectedCategory) return false;
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(query);
      const matchCat = product.category.toLowerCase().includes(query);
      const matchTag = product.tag && product.tag.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      return matchName || matchCat || matchTag || matchDesc;
    }

    return true;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default Featured
  });

  // Search Autocomplete results
  const autocompleteSuggestions = searchQuery.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  return (
    <>
      {/* Header section with sticky navbar */}
      <header className="app-header glass-card">
        <div className="logo-wrapper" onClick={() => { setSelectedCategory('All'); setIsCheckoutMode(false); }}>
          <div className="logo-icon-glow">N</div>
          <span className="logo-text glow-text">NEXUS // STORE</span>
        </div>

        {/* Search autocomplete widget */}
        <div className="nav-search-container">
          <div className="search-input-wrapper">
            <Icons.Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search gear, categories, specs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <Icons.Close size={16} />
              </button>
            )}
          </div>

          {showSearchDropdown && autocompleteSuggestions.length > 0 && (
            <div className="autocomplete-dropdown glass-card">
              {autocompleteSuggestions.map((product) => (
                <div 
                  key={product.id} 
                  className="dropdown-item"
                  onClick={() => {
                    setActiveDetailProduct(product);
                    setShowSearchDropdown(false);
                    setSearchQuery('');
                  }}
                >
                  <img src={product.image} alt={product.name} className="dropdown-img" />
                  <div className="dropdown-info">
                    <span className="dropdown-title">{product.name}</span>
                    <span className="dropdown-category">{product.category}</span>
                  </div>
                  <span className="dropdown-price">{formatINR(product.price)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Close search dropdown when clicking outside */}
          {showSearchDropdown && (
            <div 
              style={{ position: 'fixed', inset: 0, zIndex: 100 }} 
              onClick={() => setShowSearchDropdown(false)} 
            />
          )}
        </div>

        {/* Navigation actions */}
        <div className="nav-actions">
          <button 
            className="nav-icon-btn" 
            onClick={toggleTheme}
            title={isLightTheme ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightTheme ? <Icons.Moon size={20} /> : <Icons.Sun size={20} />}
          </button>
          
          <button 
            className={`nav-icon-btn ${selectedCategory === 'Wishlist' ? 'glow-icon' : ''}`}
            onClick={() => {
              setSelectedCategory(selectedCategory === 'Wishlist' ? 'All' : 'Wishlist');
              setIsCheckoutMode(false);
            }}
            title="Wishlist"
          >
            <Icons.Heart fill={wishlist.length > 0 ? "var(--accent)" : "none"} size={20} />
            {wishlist.length > 0 && <span className="nav-btn-badge">{wishlist.length}</span>}
          </button>

          {compareList.length > 0 && (
            <button 
              className="nav-icon-btn glow-icon" 
              onClick={() => setIsCompareOpen(true)}
              title="Compare Devices"
            >
              <Icons.Compare size={20} />
              <span className="nav-btn-badge">{compareList.length}</span>
            </button>
          )}

          <button 
            className="nav-icon-btn" 
            onClick={() => setIsCartOpen(true)}
            title="Cart Drawer"
          >
            <Icons.Cart size={20} />
            {cart.length > 0 && (
              <span className="nav-btn-badge">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main E-Commerce Page Layout */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {isCheckoutMode ? (
          // Checkout wizard mode
          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <button className="btn btn-secondary" onClick={() => setIsCheckoutMode(false)}>
                <Icons.ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Catalog
              </button>
            </div>
            <CheckoutWizard
              cartItems={cart}
              cartTotal={cartSubtotal}
              discountAmount={discountAmount}
              finalTotal={finalTotal}
              onOrderCompleted={handleOrderCompleted}
              onCancel={() => setIsCheckoutMode(false)}
            />
          </div>
        ) : (
          // Standard shop mode
          <>
            {/* Hero banner promotion card */}
            <section className="hero-section glass-card">
              <div className="hero-grid">
                <div className="hero-text">
                  <span className="hero-tagline">Limited Edition Drop</span>
                  <h1 className="hero-title glow-text">NEXUS FUTURE GEAR</h1>
                  <p className="hero-desc">
                    Immerse yourself in our premium line of high-performance devices, built with aerospace materials and custom silicon architecture. Use coupon <strong className="glow-text">NEXUS30</strong> at checkout for 30% off your order.
                  </p>
                  <div className="hero-stats">
                    <div className="stat-item">
                      <span className="stat-val glow-text">22h</span>
                      <span className="stat-lbl">Battery Life</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-val glow-text">8K</span>
                      <span className="stat-lbl">Micro-OLED</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-val glow-text">200MP</span>
                      <span className="stat-lbl">Ultra Optics</span>
                    </div>
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="hero-glow-shape" />
                  <div className="hero-showcase-card glass-card">
                    <img src="/bladebook.jpg" alt="BladeBook Pro" />
                    <div className="hero-card-title">BladeBook Pro M4</div>
                    <div className="hero-card-price">Starting at {formatINR(159999)}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Category selection and Sorting toolbar */}
            <section className="filter-bar-container">
              <div className="category-pill-list">
                {['All', ...Array.from(new Set(products.map((p) => p.category)))].map((cat) => (
                  <button
                    key={cat}
                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
                {wishlist.length > 0 && (
                  <button
                    className={`category-pill ${selectedCategory === 'Wishlist' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('Wishlist')}
                  >
                    Favorites ({wishlist.length})
                  </button>
                )}
              </div>

              <div className="sort-select-wrapper">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured / Standard</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </section>

            {/* Main Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="glass-card" style={{ padding: '60px', textAlign: 'center', margin: '40px 0' }}>
                <Icons.Box size={48} className="text-muted" style={{ marginBottom: '16px' }} />
                <h3>No items found</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {selectedCategory === 'Wishlist' 
                    ? "You haven't added any products to your wishlist yet." 
                    : "We couldn't find any products matching your criteria."}
                </p>
                {(searchQuery || selectedCategory !== 'All') && (
                  <button 
                    className="btn btn-secondary" 
                    style={{ marginTop: '16px' }}
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <section className="products-grid">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetail={() => setActiveDetailProduct(product)}
                    onAddToCart={handleAddToCart}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    isComparing={compareList.some(p => p.id === product.id)}
                    onToggleCompare={handleToggleCompare}
                    compareCount={compareList.length}
                  />
                ))}
              </section>
            )}
          </>
        )}

      </main>

      {/* Floating comparison drawer at the bottom */}
      {compareList.length > 0 && !isCompareOpen && !isCheckoutMode && (
        <div className="floating-compare-bar glass-card">
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Compare Gear ({compareList.length}/3)</span>
          <div className="compare-bar-thumbs">
            {compareList.map((product) => (
              <div key={product.id} className="compare-thumb-wrapper">
                <img src={product.image} alt={product.name} className="compare-thumb" />
                <button 
                  className="compare-thumb-remove" 
                  onClick={() => handleRemoveFromCompare(product)}
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setIsCompareOpen(true)}>
            Compare Now
          </button>
        </div>
      )}

      {/* Cart sliding drawer drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          setIsCheckoutMode(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Product specs compare modal overlay */}
      {isCompareOpen && (
        <CompareModal
          compareList={compareList}
          onClose={() => setIsCompareOpen(false)}
          onRemove={handleRemoveFromCompare}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Product Detail view overlay */}
      {activeDetailProduct && (
        <ProductDetailModal
          product={activeDetailProduct}
          onClose={() => setActiveDetailProduct(null)}
          onAddToCart={handleAddToCart}
          reviews={reviews[activeDetailProduct.id] || []}
          onAddReview={handleAddReview}
        />
      )}

      {/* Footer copyright */}
      <footer className="app-footer">
        <div>© 2026 NEXUS Tech Inc. All rights reserved. Designed for premium futures.</div>
        <div className="footer-links">
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Secure Payments</a>
        </div>
      </footer>
    </>
  );
}
