import { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  // Calculate review count (mock data - replace with real data)
  const reviewCount = product.reviewCount || Math.floor(Math.random() * 50) + 10;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          width="280"
          height="280"
          loading="lazy"
        />

        {/* Stock Badge */}
        {product.stock < 20 && <span className="stock-badge">Only {product.stock} left</span>}

        {/* Hover Overlay with Actions */}
        <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
          <button
            className="overlay-btn"
            onClick={e => {
              e.stopPropagation();
              addToCart(product);
            }}
            title="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
          <button
            className={`overlay-btn ${isInWishlist ? 'active' : ''}`}
            onClick={e => {
              e.stopPropagation();
              addToWishlist(product);
            }}
            title="Add to wishlist"
          >
            <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          <button
            className="overlay-btn"
            onClick={e => {
              e.stopPropagation();
              onViewDetails();
            }}
            title="Quick view"
          >
            <Eye size={20} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>

        {/* Rating with Review Count */}
        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? '#FACC15' : 'none'}
                stroke={i < Math.floor(product.rating) ? '#FACC15' : '#D1D5DB'}
              />
            ))}
          </div>
          <span className="rating-text">
            {product.rating > 0 ? (
              <>
                <span className="rating-value">{product.rating}</span>
                <span className="rating-count">({reviewCount} reviews)</span>
              </>
            ) : (
              <span className="no-reviews">No reviews yet</span>
            )}
          </span>
        </div>

        {/* Footer with Price and CTA */}
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="btn-add-cart"
            onClick={e => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
