import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ReportModal from '../../components/ReportModal';
import ImageUpload from '../../components/ImageUpload';
import { Plus, Edit2, Trash2, Search, X, Download, AlertCircle, HardDrive } from 'lucide-react';
import toast from 'react-hot-toast';
import { loadProducts, saveProducts, initializeStorage, getStorageUsagePercent, isStorageNearCapacity } from '../../utils/localStorage';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [storageUsage, setStorageUsage] = useState(0);

  // Load products from localStorage on mount
  useEffect(() => {
    initializeStorage();
    const savedProducts = loadProducts();
    setProducts(savedProducts);
    updateStorageUsage();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      try {
        saveProducts(products);
        updateStorageUsage();
      } catch (error) {
        toast.error(error.message || 'Failed to save products');
      }
    }
  }, [products]);

  const updateStorageUsage = () => {
    setStorageUsage(getStorageUsagePercent());
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    images: [],
    description: ''
  });

  const categories = ['Electronics', 'Audio', 'Computers', 'Accessories', 'Wearables'];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: '', stock: '', image: '', images: [], description: '' });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image || '',
      images: product.images || [],
      description: product.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check storage capacity
    if (isStorageNearCapacity() && formData.images.length > 0) {
      toast.error('Storage is near capacity. Please delete some products or reduce image sizes.');
      return;
    }

    try {
      if (editingProduct) {
        setProducts(products.map(p =>
          p.id === editingProduct.id
            ? { 
                ...p, 
                ...formData, 
                price: parseFloat(formData.price), 
                stock: parseInt(formData.stock),
                // Use uploaded images if available, otherwise keep URL
                image: formData.images.length > 0 ? formData.images[0].data : formData.image
              }
            : p
        ));
        toast.success('Product updated successfully');
      } else {
        const newProduct = {
          id: Math.max(0, ...products.map(p => p.id)) + 1,
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          status: 'active',
          // Use uploaded images if available, otherwise use URL
          image: formData.images.length > 0 ? formData.images[0].data : formData.image
        };
        setProducts([...products, newProduct]);
        toast.success('Product added successfully');
      }

      setShowModal(false);
      setFormData({ name: '', price: '', category: '', stock: '', image: '', images: [], description: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to save product');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-products">
        <div className="admin-products-header">
          <div>
            <h1>Products Management</h1>
            <p>Manage your product catalog</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-outline" onClick={() => setShowReportModal(true)}>
              <Download size={20} />
              Download Report
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>

        <div className="products-toolbar">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="toolbar-stats">
            <span>Total Products: <strong>{products.length}</strong></span>
            <span>In Stock: <strong>{products.filter(p => p.stock > 0).length}</strong></span>
            {storageUsage > 0 && (
              <span className={`storage-indicator ${storageUsage > 80 ? 'warning' : ''}`}>
                <HardDrive size={16} />
                Storage: <strong>{storageUsage}%</strong>
              </span>
            )}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card-admin">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-details">
                  <span className="product-price">${product.price}</span>
                  <span className={`product-stock ${product.stock < 20 ? 'low' : ''}`}>
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
              <div className="product-actions">
                <button className="btn-icon btn-edit" onClick={() => handleEdit(product)}>
                  <Edit2 size={18} />
                </button>
                <button className="btn-icon btn-delete" onClick={() => handleDelete(product.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="product-modal-form" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="product-form">
                {/* Image Upload Section */}
                <div className="form-group">
                  <label>Product Images</label>
                  <ImageUpload
                    images={formData.images}
                    onChange={(images) => setFormData({ ...formData, images })}
                    maxImages={5}
                    maxSizeMB={2}
                  />
                </div>

                {/* Fallback Image URL */}
                {formData.images.length === 0 && (
                  <div className="form-group">
                    <label>Or use Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                    <small className="form-hint">Provide an image URL if you don't upload images</small>
                  </div>
                )}

                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Stock *</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows="3"
                  />
                </div>

                {/* Storage Warning */}
                {isStorageNearCapacity() && (
                  <div className="storage-warning-box">
                    <AlertCircle size={18} />
                    <div>
                      <strong>Storage Warning</strong>
                      <p>You're using {storageUsage}% of available storage. Consider deleting old products or reducing image sizes.</p>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={{ products: filteredProducts }}
        reportType="products"
      />
    </AdminLayout>
  );
};

export default AdminProducts;
