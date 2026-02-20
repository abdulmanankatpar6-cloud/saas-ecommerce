import { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePersonalization } from '../context/PersonalizationContext';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist } = useCart();
  const { addToRecentlyViewed, addToContinueShopping } = usePersonalization();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    // Store the previously focused element
    previousFocusRef.current = document.activeElement;

    // Track product view
    addToRecentlyViewed(product);
    addToContinueShopping(product);

    // Focus the close button when modal opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Handle escape key
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Handle tab key for focus trapping
    const handleTab = e => {
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements?.length) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    return () => {
      // Restore body scroll
      document.body.style.overflow = 'unset';

      // Restore focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }

      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [product, onClose]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="product-modal" onClick={e => e.stopPropagation()} ref={modalRef}>
        <button
          className="modal-close"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close product details"
        >
          <X size={24} />
        </button>

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-details">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title" id="modal-title">
              {product.name}
            </h2>

            <div
              className="modal-rating"
              role="img"
              aria-label={`Rating: ${product.rating} out of 5 stars`}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(product.rating) ? '#FACC15' : 'none'}
                  stroke={i < Math.floor(product.rating) ? '#FACC15' : '#D1D5DB'}
                  aria-hidden="true"
                />
              ))}
              <span>({product.rating} / 5.0)</span>
            </div>

            <p className="modal-description" id="modal-description">
              {product.description}
            </p>

            <div className="modal-price">
              <span className="price-label">Price:</span>
              <span className="price-value">${product.price}</span>
            </div>

            <div className="modal-stock">
              <span className={product.stock > 20 ? 'in-stock' : 'low-stock'}>
                {product.stock > 20 ? '✓ In Stock' : `⚠ Only ${product.stock} left`}
              </span>
            </div>

            <div className="quantity-selector">
              <label htmlFor="quantity-input">Quantity:</label>
              <div className="quantity-controls" role="group" aria-label="Quantity selection">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span
                  className="quantity-value"
                  id="quantity-input"
                  role="spinbutton"
                  aria-valuenow={quantity}
                  aria-valuemin="1"
                  aria-valuemax={product.stock}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-primary btn-block"
                onClick={handleAddToCart}
                aria-describedby="add-to-cart-description"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={handleAddToWishlist}
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>
            <div id="add-to-cart-description" className="sr-only">
              Add {quantity} {quantity === 1 ? 'item' : 'items'} of {product.name} to your cart
            </div>

            <div className="product-features">
              <h4>Features:</h4>
              <ul>
                <li>✓ Free shipping on orders over $50</li>
                <li>✓ 30-day money-back guarantee</li>
                <li>✓ 1-year warranty included</li>
                <li>✓ 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
