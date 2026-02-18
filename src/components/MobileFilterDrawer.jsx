import { useState, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import './MobileFilterDrawer.css';

const MobileFilterDrawer = ({ 
  isOpen, 
  onClose, 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleApply = () => {
    onPriceRangeChange(localPriceRange);
    onClose();
  };

  const handleReset = () => {
    onCategoryChange('All');
    setLocalPriceRange([0, 1000]);
    onPriceRangeChange([0, 1000]);
    onSortChange('featured');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`mobile-filter-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`mobile-filter-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title">
            <SlidersHorizontal size={20} />
            <h3>Filters</h3>
          </div>
          <button className="drawer-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="drawer-content">
          {/* Sort By */}
          <div className="filter-section">
            <h4>Sort By</h4>
            <div className="filter-options">
              {[
                { value: 'featured', label: 'Featured' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'newest', label: 'Newest' },
              ].map((option) => (
                <button
                  key={option.value}
                  className={`filter-option ${sortBy === option.value ? 'active' : ''}`}
                  onClick={() => onSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <h4>Category</h4>
            <div className="filter-options">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-option ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range-display">
              <span>${localPriceRange[0]}</span>
              <span>${localPriceRange[1]}</span>
            </div>
            <div className="price-range-sliders">
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={localPriceRange[0]}
                onChange={(e) => setLocalPriceRange([parseInt(e.target.value), localPriceRange[1]])}
                className="price-slider"
              />
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={localPriceRange[1]}
                onChange={(e) => setLocalPriceRange([localPriceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <button className="btn btn-outline" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;
