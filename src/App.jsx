import React, { useState, useEffect } from 'react';
import { productsData } from './productsData';
import { Icons } from './Icons';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import CompareModal from './CompareModal';
import CartDrawer from './CartDrawer';
import CheckoutWizard from './CheckoutWizard';
import { formatINR } from './utils';

const CATEGORY_ICONS = {
  'All': '⚡',
  'Computers': '🖥️',
  'Laptops': '💻',
  'Mobile': '📱',
  'Audio': '🎧',
  'Wearables': '⌚',
  'Gaming': '🎮',
  'Drones': '🚁',
  'Smart Home': '📺',
  'Appliances': '❄️',
  'Gadgets': '🔋'
};

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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under30k', '30k-100k', 'above100k'
  
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [promoCopied, setPromoCopied] = useState(false);

  // Spotlight featured products in hero
  const spotlightProducts = products.filter(p => [1, 12, 14, 15, 6].includes(p.id));
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % spotlightProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [spotlightProducts.length]);

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

  const handleCopyPromo = () => {
    navigator.clipboard?.writeText('TECH30');
    setPromoCopied(true);
    setTimeout(() => setPromoCopied(false), 2000);
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
        if (prev.length >= 3) return prev;
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
  if (appliedPromo === 'TECH30' || appliedPromo === 'NEXUS30') {
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

    // 2. Price Range Filter
    if (priceFilter === 'under30k' && product.price >= 30000) return false;
    if (priceFilter === '30k-100k' && (product.price < 30000 || product.price > 100000)) return false;
    if (priceFilter === 'above100k' && product.price <= 100000) return false;

    // 3. Search query filter
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

  const allCategories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  const activeSpotlight = spotlightProducts[spotlightIndex] || spotlightProducts[0];

  return (
    <>
      {/* Header section with sticky navbar */}
      <header className="app-header glass-card">
        <div className="logo-wrapper" onClick={() => { setSelectedCategory('All'); setIsCheckoutMode(false); }}>
          <div className="logo-icon-glow">
            <Icons.Headset size={20} />
          </div>
          <div className="logo-text-group">
            <span className="logo-text glow-text">TECH STORE</span>
            <span className="logo-subtext">PREMIUM ELECTRONICS & GADGETS</span>
          </div>
        </div>

        {/* Search autocomplete widget */}
        <div className="nav-search-container">
          <div className="search-input-wrapper">
            <Icons.Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search laptops, RTX 5090 PCs, 8K TVs, AC, audio..."
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
                    <span className="dropdown-category">{product.category} • {product.tag}</span>
                  </div>
                  <span className="dropdown-price">{formatINR(product.price)}</span>
                </div>
              ))}
            </div>
          )}

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
            <Icons.Heart fill={wishlist.length > 0 ? "#ef4444" : "none"} color={wishlist.length > 0 ? "#ef4444" : "currentColor"} size={20} />
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
          <>
            {/* Hero banner promotion card */}
            <section className="hero-section glass-card">
              <div className="hero-grid">
                <div className="hero-text">
                  <div className="hero-deal-pill">
                    <span className="live-badge">⚡ FLASH SALE</span>
                    <span>Use Coupon <strong className="glow-text">TECH30</strong> for 30% OFF</span>
                    <button className="copy-code-btn" onClick={handleCopyPromo}>
                      {promoCopied ? 'Copied! ✓' : 'Copy'}
                    </button>
                  </div>
                  
                  <h1 className="hero-title glow-text">TECH STORE. ZERO COMPROMISE.</h1>
                  <p className="hero-desc">
                    Explore high-performance computing, spatial audio, OLED cinema, and smart climate electronics engineered with aerospace titanium and custom silicon architecture.
                  </p>
                  
                  <div className="hero-stats">
                    <div className="stat-item">
                      <span className="stat-val glow-text">19</span>
                      <span className="stat-lbl">Flagship Devices</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-val glow-text">2-Day</span>
                      <span className="stat-lbl">Air Shipping</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-val glow-text">2-Yr</span>
                      <span className="stat-lbl">Full Warranty</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-val glow-text">0%</span>
                      <span className="stat-lbl">No-Cost EMI</span>
                    </div>
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="hero-glow-shape" />
                  <div 
                    className="hero-showcase-card glass-card"
                    onClick={() => setActiveDetailProduct(activeSpotlight)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="spotlight-tag">{activeSpotlight.tag || 'Spotlight Gear'}</div>
                    <img src={activeSpotlight.image} alt={activeSpotlight.name} />
                    <div className="hero-card-title">{activeSpotlight.name}</div>
                    <div className="hero-card-price">{formatINR(activeSpotlight.price)}</div>
                    <div className="spotlight-dots">
                      {spotlightProducts.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`spotlight-dot ${idx === spotlightIndex ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSpotlightIndex(idx);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Badges Strip */}
            <section className="trust-strip glass-card">
              <div className="trust-item">
                <span className="trust-icon">🚚</span>
                <div>
                  <strong>Free 2-Day Air Shipping</strong>
                  <p>All-India Express Delivery</p>
                </div>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🛡️</span>
                <div>
                  <strong>2-Year Tech Care</strong>
                  <p>Zero Repair Cost Warranty</p>
                </div>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                <div>
                  <strong>Instant UPI & 0-EMI</strong>
                  <p>Hassle-free digital payments</p>
                </div>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🔄</span>
                <div>
                  <strong>14-Day Replacement</strong>
                  <p>100% Guaranteed Satisfaction</p>
                </div>
              </div>
            </section>

            {/* Category selection bar with icons and counts */}
            <section className="filter-bar-container">
              <div className="category-pill-list">
                {allCategories.map((cat) => {
                  const count = cat === 'All' ? products.length : products.filter(p => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span className="cat-icon">{CATEGORY_ICONS[cat] || '📦'}</span>
                      <span>{cat}</span>
                      <span className="cat-count">{count}</span>
                    </button>
                  );
                })}
                {wishlist.length > 0 && (
                  <button
                    className={`category-pill ${selectedCategory === 'Wishlist' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('Wishlist')}
                  >
                    <span className="cat-icon">❤️</span>
                    <span>Wishlist</span>
                    <span className="cat-count">{wishlist.length}</span>
                  </button>
                )}
              </div>

              {/* Price & Sort toolbar */}
              <div className="toolbar-controls">
                <div className="price-filter-group">
                  <button 
                    className={`filter-chip ${priceFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('all')}
                  >
                    All Prices
                  </button>
                  <button 
                    className={`filter-chip ${priceFilter === 'under30k' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('under30k')}
                  >
                    &lt; ₹30K
                  </button>
                  <button 
                    className={`filter-chip ${priceFilter === '30k-100k' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('30k-100k')}
                  >
                    ₹30K - ₹1L
                  </button>
                  <button 
                    className={`filter-chip ${priceFilter === 'above100k' ? 'active' : ''}`}
                    onClick={() => setPriceFilter('above100k')}
                  >
                    &gt; ₹1L
                  </button>
                </div>

                <div className="sort-select-wrapper">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="featured">Featured / Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Customer Rated</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Results Header */}
            <div className="results-count-bar">
              <span>Showing <strong>{sortedProducts.length}</strong> electronic devices</span>
              {(searchQuery || selectedCategory !== 'All' || priceFilter !== 'all') && (
                <button 
                  className="btn-clear-filters"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceFilter('all');
                  }}
                >
                  Clear all filters ×
                </button>
              )}
            </div>

            {/* Main Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="glass-card" style={{ padding: '60px', textAlign: 'center', margin: '40px 0' }}>
                <Icons.Box size={48} className="text-muted" style={{ marginBottom: '16px' }} />
                <h3>No electronic devices match your filter</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {selectedCategory === 'Wishlist' 
                    ? "You haven't added any products to your wishlist yet." 
                    : "Try selecting another category or clearing your search filters."}
                </p>
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: '16px' }}
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setPriceFilter('all'); }}
                >
                  Reset Filters
                </button>
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
            Compare Specs
          </button>
        </div>
      )}

      {/* Cart sliding drawer */}
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
        <div>© 2026 TECH STORE Inc. All rights reserved. Precision-engineered electronics.</div>
        <div className="footer-links">
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Warranty Support</a>
          <a href="#" onClick={(e) => e.preventDefault()}>100% Secure Checkout</a>
        </div>
      </footer>
    </>
  );
}
