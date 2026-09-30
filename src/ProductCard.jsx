import React from 'react';
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
  const { name, category, price, image, rating, tag, description } = product;

  return (
    <div className="product-card glass-card">
      {/* Floating Elements */}
      <div className="card-badge-container">
        {tag && <span className="card-tag">{tag}</span>}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label="Add to wishlist"
        >
          <Icons.Heart fill={isWishlisted ? "#ef4444" : "none"} color={isWishlisted ? "#ef4444" : "currentColor"} size={18} />
        </button>
      </div>

      {/* Product Image */}
      <div className="card-img-container" onClick={onViewDetail}>
        <img src={image} alt={name} className="product-image" loading="lazy" />
        <div className="card-overlay">
          <span className="view-detail-text">Quick View</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="card-content">
        <div className="card-category-rating">
          <span className="card-category">{category}</span>
          <div className="card-rating">
            <Icons.Star fill="var(--accent)" className="star-icon" size={14} />
            <span>{rating}</span>
          </div>
        </div>

        <h3 className="card-title" onClick={onViewDetail}>{name}</h3>
        <p className="card-desc">{description.length > 70 ? `${description.slice(0, 70)}...` : description}</p>

        {/* Compare Checkbox */}
        <label className="compare-checkbox-label">
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

        {/* Pricing and Action */}
        <div className="card-footer">
          <div className="card-price-container">
            <span className="card-price">{formatINR(price)}</span>
          </div>
          <button 
            className="btn btn-primary add-to-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <Icons.Cart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
