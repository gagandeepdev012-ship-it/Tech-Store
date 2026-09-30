import React from 'react';
import { Icons } from './Icons';
import { formatINR } from './utils';

export default function CompareModal({ compareList, onClose, onRemove, onAddToCart }) {
  if (compareList.length === 0) return null;

  // Compile a list of all unique spec keys across all products in the compare list
  const specKeys = Array.from(
    new Set(compareList.flatMap(p => Object.keys(p.specs || {})))
  );

  return (
    <div className="modal-backdrop compare-modal-backdrop" onClick={onClose}>
      <div className="modal-content compare-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title-wrapper">
            <Icons.Compare className="glow-icon" size={24} />
            <h2>Product Comparison ({compareList.length}/3)</h2>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close comparison">
            <Icons.Close size={20} />
          </button>
        </div>

        <div className="modal-body compare-modal-body">
          {compareList.length === 0 ? (
            <p className="no-compare-text">No products selected for comparison. Go check some items!</p>
          ) : (
            <div className="compare-grid-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="spec-label-col">Specifications</th>
                    {compareList.map(product => (
                      <th key={product.id} className="product-col-header">
                        <div className="compare-product-header">
                          <button 
                            className="compare-remove-btn" 
                            onClick={() => onRemove(product)}
                            title="Remove from comparison"
                          >
                            <Icons.Close size={14} />
                          </button>
                          <img src={product.image} alt={product.name} className="compare-img" />
                          <h4 className="compare-title">{product.name}</h4>
                          <span className="compare-price">{formatINR(product.price)}</span>
                          <button 
                            className="btn btn-primary btn-sm compare-add-cart-btn" 
                            onClick={() => onAddToCart(product)}
                          >
                            <Icons.Cart size={14} /> Add to Cart
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Row for Basic Details */}
                  <tr>
                    <td className="spec-name">Category</td>
                    {compareList.map(product => (
                      <td key={product.id} className="spec-val">{product.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="spec-name">Rating</td>
                    {compareList.map(product => (
                      <td key={product.id} className="spec-val">
                        <div className="compare-rating-wrapper">
                          <Icons.Star fill="var(--accent)" size={14} />
                          <span>{product.rating} / 5</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="spec-name">Tag</td>
                    {compareList.map(product => (
                      <td key={product.id} className="spec-val">
                        <span className="badge-tag">{product.tag || 'Standard'}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic Technical Specs Rows */}
                  {specKeys.map(specKey => (
                    <tr key={specKey}>
                      <td className="spec-name">{specKey}</td>
                      {compareList.map(product => (
                        <td key={product.id} className="spec-val">
                          {product.specs?.[specKey] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
