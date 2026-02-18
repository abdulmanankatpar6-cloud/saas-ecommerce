import { createContext, useContext, useState, useEffect } from 'react';

const PersonalizationContext = createContext();

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
};

export const PersonalizationProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [recommendedProducts, setRecommendedProducts] = useState([
    { id: 5, name: 'Wireless Mouse', price: 49.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', category: 'Accessories', rating: 4.4, reason: 'Based on your browsing' },
    { id: 6, name: 'USB-C Hub', price: 39.99, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400', category: 'Accessories', rating: 4.3, reason: 'Frequently bought together' },
    { id: 7, name: 'Portable SSD', price: 149.99, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400', category: 'Electronics', rating: 4.7, reason: 'Popular in your area' },
    { id: 8, name: 'Webcam HD', price: 89.99, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400', category: 'Electronics', rating: 4.5, reason: 'Trending now' },
  ]);

  const [personalizedOffers, setPersonalizedOffers] = useState([
    { id: 1, title: '20% OFF Electronics', description: 'Special offer just for you!', discount: 20, category: 'Electronics', validUntil: '2024-02-25', code: 'ELEC20' },
    { id: 2, title: 'Free Shipping', description: 'On orders over $50', discount: 0, category: 'All', validUntil: '2024-02-28', code: 'FREESHIP' },
    { id: 3, title: 'Bundle Deal', description: 'Buy 2 Get 1 Free on Accessories', discount: 33, category: 'Accessories', validUntil: '2024-02-27', code: 'BUNDLE3' },
  ]);

  const [continueShoppingItems, setContinueShoppingItems] = useState(() => {
    const saved = localStorage.getItem('continueShoppingItems');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Smart Watch', price: 179.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category: 'Electronics', lastViewed: '2 hours ago' },
      { id: 2, name: 'Wireless Earbuds Pro', price: 79.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', category: 'Audio', lastViewed: '5 hours ago' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('continueShoppingItems', JSON.stringify(continueShoppingItems));
  }, [continueShoppingItems]);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6); // Keep last 6
    });
  };

  const addToContinueShopping = (product) => {
    setContinueShoppingItems(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [{ ...product, lastViewed: 'Just now' }, ...filtered].slice(0, 4);
    });
  };

  return (
    <PersonalizationContext.Provider
      value={{
        recentlyViewed,
        recommendedProducts,
        personalizedOffers,
        continueShoppingItems,
        addToRecentlyViewed,
        addToContinueShopping
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};
