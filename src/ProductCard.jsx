import React, { useState } from 'react';
import { Icons } from './Icons';
import { formatINR } from './utils';

export default function ProductCard({
  product,
  onViewDetail,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  isComparing,
  onToggleCompare,
  compareCount
}) {
  const { name, category, price, image, rating, tag, description, specs, reviews } = product;
  const [isAdded, setIsAdded] = useState(false);

  // Derive top 2-3 spec highlights from product.specs
  const specHighlights = specs ? Object.entries(specs).slice(0, 2) : [];
  
  // Calculate simulated MSRP (Original Price) for discount presentation
  const originalPrice = Math.round(price * 1.22);
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="product-card glass-card">
      {/* Floating Elements */}
      <div className="card-badge-container">
        <div className="badge-group">
          {tag && <span className="card-tag">{tag}</span>}
          <span className="card-discount-tag">{discountPercent}% OFF</span>
        </div>
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Icons.Heart fill={isWishlisted ? "#ef4444" : "none"} color={isWishlisted ? "#ef4444" : "currentColor"} size={17} />
        </button>
      </div>

      {/* Product Image with Quick View on hover */}
      <div className="card-img-container" onClick={onViewDetail}>
        <img src={image} alt={name} className="product-image" loading="lazy" />
        <div className="card-overlay">
          <span className="view-detail-text">Quick Specs & View</span>
        </div>
      </div>

      {/* Product Content */}
      <div className="card-content">
        <div className="card-category-rating">
          <span className="card-category">{category}</span>
          <div className="card-rating">
            <Icons.Star fill="#f59e0b" color="#f59e0b" className="star-icon" size={13} />
            <span className="rating-num">{rating}</span>
            <span className="rating-count">({reviews?.length || 12})</span>
          </div>
        </div>

        <h3 className="card-title" onClick={onViewDetail} title={name}>{name}</h3>
        <p className="card-desc">{description.length > 72 ? `${description.slice(0, 72)}...` : description}</p>

        {/* Spec Feature Chips */}
        {specHighlights.length > 0 && (
          <div className="card-spec-chips">
            {specHighlights.map(([key, val]) => (
              <span key={key} className="spec-chip" title={`${key}: ${val}`}>
                {val.length > 24 ? `${val.slice(0, 24)}...` : val}
              </span>
            ))}
          </div>
        )}

        {/* Stock status indicator */}
        <div className="card-stock-indicator">
          <span className="stock-dot" />
          <span className="stock-text">In Stock • Express 2-Day Air</span>
        </div>

        {/* Compare Checkbox */}
        <label className="compare-checkbox-label" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            checked={isComparing} 
            onChange={() => onToggleCompare(product)}
            disabled={!isComparing && compareCount >= 3}
          />
          <span className="compare-checkbox-text">
            Compare <span className="compare-desc">(Max 3)</span>
          </span>
        </label>

        {/* Pricing and Action Footer */}
        <div className="card-footer">
          <div className="card-price-container">
            <div className="price
            
            -primary-row">
              <span className="card-price">{formatINR(price)}</span>
            </div>
            <span className="card-original-price">{formatINR(originalPrice)}</span>
          </div>
          
          <button 
            className={`btn ${isAdded ? 'btn-success' : 'btn-primary'} add-to-cart-btn`}
            onClick={handleAddClick}
            aria-label="Add to cart"
          >
            {isAdded ? (
              <>
                <Icons.Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Icons.Cart size={16} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
