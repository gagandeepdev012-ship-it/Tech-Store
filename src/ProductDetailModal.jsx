import React, { useState } from 'react';
import { Icons } from './Icons';
import { formatINR } from './utils';

export default function ProductDetailModal({ product, onClose, onAddToCart, reviews, onAddReview }) {
  // Local state for configuration
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  
  // Review form local state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!product) return null;

  // Dynamic calculations
  const basePrice = product.price;
  const priceModifier = product.options?.[selectedOptionIndex]?.priceModifier || 0;
  const totalPrice = basePrice + priceModifier;

  const handleAddToCart = () => {
    // Construct configured item details
    const configuredItem = {
      ...product,
      configuredPrice: totalPrice,
      selectedColor: product.colorNames?.[selectedColorIndex] || 'Default',
      selectedOption: product.options?.[selectedOptionIndex]?.name || 'Standard',
      // Generate a unique ID combination for the cart item
      cartId: `${product.id}-${selectedColorIndex}-${selectedOptionIndex}`
    };
    onAddToCart(configuredItem);
    onClose();
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;

    const newReview = {
      name: reviewName,
      rating: Number(reviewRating),
      date: new Date().toISOString().split('T')[0],
      text: reviewText
    };

    onAddReview(product.id, newReview);
    
    // Reset form states
    setReviewName('');
    setReviewRating(5);
    setReviewText('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const activeColor = product.colors?.[selectedColorIndex];
  const activeColorName = product.colorNames?.[selectedColorIndex];

  return (
    <div className="modal-backdrop detail-modal-backdrop" onClick={onClose}>
      <div className="modal-content detail-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close detail-modal-close" onClick={onClose} aria-label="Close detail modal">
          <Icons.Close size={20} />
        </button>

        <div className="detail-grid">
          {/* Left Column: Image Gallery/Showcase */}
          <div className="detail-media-panel">
            <div className="detail-img-wrapper glass-card">
              <img src={product.image} alt={product.name} className="detail-main-img" />
              {/* Radial glow background relative to selected color if available */}
              <div 
                className="detail-glow-circle" 
                style={{ 
                  background: activeColor ? `radial-gradient(circle, ${activeColor}33 0%, transparent 70%)` : 'var(--accent-bg)' 
                }}
              />
            </div>
            {product.tag && <span className="detail-badge-tag">{product.tag}</span>}
          </div>

          {/* Right Column: Information & Configuration */}
          <div className="detail-info-panel">
            <div className="detail-header-section">
              <span className="detail-category">{product.category}</span>
              <h2 className="detail-title">{product.name}</h2>
              <div className="detail-rating-row">
                <div className="detail-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icons.Star 
                      key={s} 
                      fill={s <= Math.round(product.rating) ? "var(--accent)" : "none"} 
                      size={16} 
                    />
                  ))}
                </div>
                <span className="detail-rating-text">{product.rating} ({reviews.length} reviews)</span>
              </div>
            </div>

            <p className="detail-description">{product.description}</p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="config-section">
                <span className="config-label">Color: <strong className="glow-text">{activeColorName}</strong></span>
                <div className="color-swatch-list">
                  {product.colors.map((color, index) => (
                    <button
                      key={color}
                      className={`color-swatch-btn ${selectedColorIndex === index ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColorIndex(index)}
                      title={product.colorNames?.[index] || color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Options / Capacity Selector */}
            {product.options && product.options.length > 0 && (
              <div className="config-section">
                <span className="config-label">Configuration</span>
                <div className="option-pill-list">
                  {product.options.map((opt, index) => (
                    <button
                      key={opt.name}
                      className={`option-pill-btn ${selectedOptionIndex === index ? 'active' : ''}`}
                      onClick={() => setSelectedOptionIndex(index)}
                    >
                      <span className="opt-name">{opt.name}</span>
                      {opt.priceModifier > 0 && (
                        <span className="opt-modifier">+{formatINR(opt.priceModifier)}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Action Section */}
            <div className="detail-action-bar glass-card">
              <div className="detail-price-wrapper">
                <span className="detail-price-label">Configured Price</span>
                <div className="detail-price-tag">
                  <span className="value">{formatINR(totalPrice)}</span>
                </div>
              </div>
              <button className="btn btn-primary detail-add-btn" onClick={handleAddToCart}>
                <Icons.Cart size={18} />
                <span>Add to Shopping Cart</span>
              </button>
            </div>

            {/* Technical Specs Accordion Panel */}
            {product.specs && (
              <div className="specs-section">
                <h3 className="specs-title">Technical Specifications</h3>
                <div className="specs-table-wrapper glass-card">
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key}>
                          <td className="spec-label">{key}</td>
                          <td className="spec-value">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="reviews-section">
              <h3 className="reviews-title">Customer Feedback ({reviews.length})</h3>
              
              <div className="reviews-list">
                {reviews.length === 0 ? (
                  <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
                ) : (
                  reviews.map((rev, index) => (
                    <div key={index} className="review-item glass-card">
                      <div className="review-header">
                        <span className="review-author">{rev.name}</span>
                        <div className="review-stars">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Icons.Star 
                              key={s} 
                              fill={s <= rev.rating ? "var(--accent)" : "none"} 
                              size={12} 
                            />
                          ))}
                        </div>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <p className="review-text">{rev.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Submit Review Form */}
              <form onSubmit={handleReviewSubmit} className="review-form glass-card">
                <h4>Share Your Review</h4>
                {submitSuccess && (
                  <div className="form-alert success">
                    <Icons.Check size={16} /> Review submitted successfully! Thank you.
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group flex-2">
                    <label htmlFor="rev-name">Your Name</label>
                    <input 
                      type="text" 
                      id="rev-name" 
                      placeholder="e.g. Alex Smith"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label htmlFor="rev-rating">Rating</label>
                    <select 
                      id="rev-rating"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(e.target.value)}
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Poor)</option>
                      <option value="1">1 Star (Terrible)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="rev-text">Review Comments</label>
                  <textarea 
                    id="rev-text" 
                    rows="3" 
                    placeholder="Tell us what you like or dislike about this product..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-secondary btn-sm">
                  Publish Review
                </button>
              </form>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
