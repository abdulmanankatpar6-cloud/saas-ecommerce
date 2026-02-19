/**
 * LocalStorage Manager - Professional Implementation
 * Handles all localStorage operations with error handling and validation
 */

const STORAGE_KEYS = {
  PRODUCTS: 'ecommerce_products',
  ORDERS: 'ecommerce_orders',
  SETTINGS: 'ecommerce_settings',
  VERSION: 'ecommerce_version',
};

const CURRENT_VERSION = '1.0.0';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit

/**
 * Check if localStorage is available
 */
const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Get storage usage in bytes
 */
export const getStorageUsage = () => {
  if (!isLocalStorageAvailable()) return 0;

  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

/**
 * Get storage usage percentage
 */
export const getStorageUsagePercent = () => {
  const usage = getStorageUsage();
  return Math.round((usage / MAX_STORAGE_SIZE) * 100);
};

/**
 * Check if storage is near capacity
 */
export const isStorageNearCapacity = () => {
  return getStorageUsagePercent() > 80;
};

/**
 * Save data to localStorage with error handling
 */
const saveToStorage = (key, data) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    const jsonData = JSON.stringify(data);

    // Check if data will exceed storage limit
    const dataSize = jsonData.length;
    const currentUsage = getStorageUsage();

    if (currentUsage + dataSize > MAX_STORAGE_SIZE) {
      console.error('Storage quota exceeded');
      throw new Error('Storage quota exceeded. Please delete some products or clear old data.');
    }

    localStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);

    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
      throw new Error('Storage quota exceeded. Please delete some products to free up space.');
    }

    throw error;
  }
};

/**
 * Load data from localStorage with error handling
 */
const loadFromStorage = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }

  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 */
const removeFromStorage = key => {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all app data from localStorage
 */
export const clearAllStorage = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key);
  });
};

// ============================================
// PRODUCTS MANAGEMENT
// ============================================

/**
 * Load products from localStorage
 */
export const loadProducts = () => {
  const products = loadFromStorage(STORAGE_KEYS.PRODUCTS, []);

  // Add timestamps if missing (for backward compatibility)
  return products.map(product => ({
    ...product,
    createdAt: product.createdAt || new Date().toISOString(),
    updatedAt: product.updatedAt || new Date().toISOString(),
  }));
};

/**
 * Save products to localStorage
 */
export const saveProducts = products => {
  try {
    // Add/update timestamps
    const productsWithTimestamps = products.map(product => ({
      ...product,
      updatedAt: new Date().toISOString(),
      createdAt: product.createdAt || new Date().toISOString(),
    }));

    saveToStorage(STORAGE_KEYS.PRODUCTS, productsWithTimestamps);
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Add a single product
 */
export const addProduct = product => {
  const products = loadProducts();
  const newProduct = {
    ...product,
    id: Math.max(0, ...products.map(p => p.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

/**
 * Update a single product
 */
export const updateProduct = (id, updates) => {
  const products = loadProducts();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    throw new Error('Product not found');
  }

  products[index] = {
    ...products[index],
    ...updates,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString(),
  };

  saveProducts(products);
  return products[index];
};

/**
 * Delete a single product
 */
export const deleteProduct = id => {
  const products = loadProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
  return true;
};

// ============================================
// ORDERS MANAGEMENT
// ============================================

/**
 * Load orders from localStorage
 */
export const loadOrders = () => {
  return loadFromStorage(STORAGE_KEYS.ORDERS, []);
};

/**
 * Save orders to localStorage
 */
export const saveOrders = orders => {
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
};

// ============================================
// SETTINGS MANAGEMENT
// ============================================

/**
 * Load settings from localStorage
 */
export const loadSettings = () => {
  return loadFromStorage(STORAGE_KEYS.SETTINGS, {});
};

/**
 * Save settings to localStorage
 */
export const saveSettings = settings => {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);
};

// ============================================
// DATA EXPORT/IMPORT
// ============================================

/**
 * Export all data as JSON
 */
export const exportData = () => {
  return {
    version: CURRENT_VERSION,
    exportDate: new Date().toISOString(),
    products: loadProducts(),
    orders: loadOrders(),
    settings: loadSettings(),
  };
};

/**
 * Import data from JSON
 */
export const importData = data => {
  try {
    if (data.products) saveProducts(data.products);
    if (data.orders) saveOrders(data.orders);
    if (data.settings) saveSettings(data.settings);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
};

/**
 * Download data as JSON file
 */
export const downloadDataBackup = () => {
  const data = exportData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ecommerce-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize storage with default data if empty
 */
export const initializeStorage = () => {
  const products = loadProducts();

  // If no products exist, add default ones
  if (products.length === 0) {
    const defaultProducts = [
      {
        id: 1,
        name: 'Smart Watch',
        price: 179.99,
        category: 'Electronics',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        images: [],
        status: 'active',
        description: 'High-quality smart watch with fitness tracking and notifications',
      },
      {
        id: 2,
        name: 'Wireless Earbuds Pro',
        price: 79.99,
        category: 'Audio',
        stock: 120,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
        images: [],
        status: 'active',
        description: 'Premium wireless earbuds with active noise cancellation',
      },
      {
        id: 3,
        name: 'Gaming Laptop',
        price: 999.99,
        category: 'Computers',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
        images: [],
        status: 'active',
        description: 'Powerful gaming laptop with RTX graphics',
      },
      {
        id: 4,
        name: 'Mechanical Keyboard',
        price: 129.99,
        category: 'Accessories',
        stock: 67,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400',
        images: [],
        status: 'active',
        description: 'RGB mechanical keyboard with customizable switches',
      },
      {
        id: 5,
        name: 'Wireless Mouse',
        price: 49.99,
        category: 'Accessories',
        stock: 89,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        images: [],
        status: 'active',
        description: 'Ergonomic wireless mouse with precision tracking',
      },
      {
        id: 6,
        name: 'USB-C Hub',
        price: 39.99,
        category: 'Accessories',
        stock: 150,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
        images: [],
        status: 'active',
        description: 'Multi-port USB-C hub with fast data transfer',
      },
    ];

    saveProducts(defaultProducts);
  }
};

export default {
  loadProducts,
  saveProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  loadOrders,
  saveOrders,
  loadSettings,
  saveSettings,
  exportData,
  importData,
  downloadDataBackup,
  clearAllStorage,
  getStorageUsage,
  getStorageUsagePercent,
  isStorageNearCapacity,
  initializeStorage,
};
