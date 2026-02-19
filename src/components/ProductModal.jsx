import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePersonalization } from '../context/PersonalizationContext';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist } = useCart();
  const { addToRecentlyViewed, addToContinueShopping } = usePersonalization();

  useEffect(() => {
    // Track product view
    addToRecentlyViewed(product);
    addToContinueShopping(product);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-details">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(product.rating) ? '#FACC15' : 'none'}
                  stroke={i < Math.floor(product.rating) ? '#FACC15' : '#D1D5DB'}
                />
              ))}
              <span>({product.rating} / 5.0)</span>
            </div>

            <p className="modal-description">{product.description}</p>

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
              <span>Quantity:</span>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary btn-block" onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="btn btn-outline-primary" onClick={handleAddToWishlist}>
                <Heart size={20} />
              </button>
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
