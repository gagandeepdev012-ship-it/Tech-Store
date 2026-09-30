import React, { useState } from 'react';
import { Icons } from './Icons';
import { formatINR } from './utils';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutClick,
  appliedPromo,
  onApplyPromo,
  onRemovePromo
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Totals calculations
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.configuredPrice || item.price) * item.quantity, 
    0
  );

  let discountAmount = 0;
  if (appliedPromo === 'NEXUS30') {
    discountAmount = Math.round(cartSubtotal * 0.3); // 30% off
  }

  const estTax = Math.round((cartSubtotal - discountAmount) * 0.18);
  const finalTotal = cartSubtotal - discountAmount + estTax;

  const handleApplyPromoSubmit = (e) => {
    e.preventDefault();
    const cleanPromo = promoInput.trim().toUpperCase();
    if (cleanPromo === 'NEXUS30' || cleanPromo === 'FREESHIP') {
      onApplyPromo(cleanPromo);
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code');
    }
  };

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer glass-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <Icons.Cart className="glow-icon" size={22} />
            <h2>Shopping Cart</h2>
            <span className="cart-count-badge">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close cart">
            <Icons.Close size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <Icons.Box size={60} className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Explore our premium catalog to add cutting-edge gear to your setup.</p>
              <button className="btn btn-primary" onClick={onClose}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const itemPrice = item.configuredPrice || item.price;
                return (
                  <div key={item.cartId} className="cart-item glass-card">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    
                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <h4 className="cart-item-title">{item.name}</h4>
                        <button 
                          className="cart-item-remove-btn" 
                          onClick={() => onRemoveItem(item.cartId)}
                          aria-label="Remove item"
                        >
                          <Icons.Trash size={16} />
                        </button>
                      </div>
                      
                      <div className="cart-item-config">
                        <span>{item.selectedColor}</span>
                        <span className="divider">|</span>
                        <span>{item.selectedOption}</span>
                      </div>

                      <div className="cart-item-footer">
                        <div className="qty-control">
                          <button 
                            className="qty-btn" 
                            onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-item-price">{formatINR(itemPrice * item.quantity)}</span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer (Only if cart is not empty) */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            
            {/* Promo Code System */}
            <form onSubmit={handleApplyPromoSubmit} className="promo-form">
              <input 
                type="text" 
                placeholder="PROMO CODE (e.g. NEXUS30)" 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                disabled={!!appliedPromo}
              />
              <button 
                type="submit" 
                className="btn btn-secondary" 
                disabled={!!appliedPromo || !promoInput.trim()}
              >
                Apply
              </button>
            </form>
            
            {promoError && <p className="promo-error">{promoError}</p>}
            {appliedPromo && (
              <div className="applied-promo-tag">
                <span>Code <strong>{appliedPromo}</strong> active (30% discount)</span>
                <button className="remove-promo-btn" onClick={onRemovePromo}>
                  <Icons.Close size={12} />
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="cart-summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row discount-row">no
                  <span>Discount</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span className="shipping-free">FREE</span>
              </div>
              <div className="summary-row">
                <span>Estimated GST (18%)</span>
                <span>{formatINR(estTax)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span className="glow-text">{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button className="btn btn-primary btn-block checkout-btn" onClick={onCheckoutClick}>
              Proceed to Secure Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
