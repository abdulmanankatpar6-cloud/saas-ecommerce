import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { TrendingUp, Package, DollarSign, Users, Tag, Clock, ShoppingBag } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { usePersonalization } from '../context/PersonalizationContext';
import { loadProducts } from '../utils/localStorage';
import { useResponsiveChart } from '../hooks/useResponsiveChart';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const { recommendedProducts, recentlyViewed, personalizedOffers, continueShoppingItems } =
    usePersonalization();
  const chartConfig = useResponsiveChart();

  // Load featured products from localStorage
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setStatsLoading(true);

      // Simulate API loading time
      await new Promise(resolve => setTimeout(resolve, 800));

      const products = loadProducts();
      // Show only active products with stock
      const activeProducts = products.filter(p => p.status === 'active' && p.stock > 0).slice(0, 4);
      setFeaturedProducts(activeProducts);
      setIsLoading(false);

      // Stats load slightly later
      setTimeout(() => setStatsLoading(false), 400);
    };

    loadData();
  }, []);

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      color: '#4F46E5',
    },
    { icon: Package, label: 'Total Orders', value: '1,234', change: '+8.2%', color: '#22C55E' },
    { icon: Users, label: 'New Customers', value: '892', change: '+15.3%', color: '#FACC15' },
    { icon: TrendingUp, label: 'Growth Rate', value: '23.5%', change: '+4.1%', color: '#EF4444' },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 198 },
    { name: 'Mar', sales: 5000, orders: 320 },
    { name: 'Apr', sales: 4500, orders: 278 },
    { name: 'May', sales: 6000, orders: 389 },
    { name: 'Jun', sales: 5500, orders: 349 },
  ];

  return (
    <Layout>
      <div className="dashboard">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>
              Power Up Your Business
              <br />
              with Our E-Commerce Solutions!
            </h1>
            <p>
              Drive the success of your online business with powerful analytics and seamless order
              management. Get started today!
            </p>
            <div className="hero-actions">
              <button className="btn btn-success">Get Started</button>
              <button className="btn btn-outline">View Products</button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-value">2M+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">50K+</span>
                <span className="stat-label">Products Sold</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
              alt="Headphones"
              width="600"
              height="600"
              loading="lazy"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {statsLoading
            ? // Loading skeleton for stats
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="stats-card skeleton-card">
                  <div className="skeleton-header">
                    <div className="skeleton skeleton-icon"></div>
                    <div className="skeleton skeleton-change"></div>
                  </div>
                  <div className="skeleton skeleton-value"></div>
                  <div className="skeleton skeleton-label"></div>
                </div>
              ))
            : stats.map((stat, index) => <StatsCard key={index} {...stat} />)}
        </div>

        {/* Sales Chart */}
        <div className="chart-section">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Sales Overview</h3>
              <select className="chart-filter">
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={chartConfig.height}>
              <AreaChart data={salesData} margin={chartConfig.margin}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  stroke="#6B7280"
                  tick={{ fontSize: chartConfig.fontSize }}
                  angle={chartConfig.xAxisAngle}
                  textAnchor={chartConfig.xAxisTextAnchor}
                />
                <YAxis stroke="#6B7280" tick={{ fontSize: chartConfig.fontSize }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Featured Products */}
        <div className="featured-section">
          <div className="section-header">
            <h2>Featured Products</h2>
            <a href="/products" className="view-all">
              View All →
            </a>
          </div>
          <div className="products-grid">
            {isLoading
              ? // Loading skeleton for products
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="product-card skeleton-card">
                    <div className="skeleton skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton skeleton-category"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-price"></div>
                    </div>
                  </div>
                ))
              : featuredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => setSelectedProduct(product)}
                  />
                ))}
          </div>
        </div>

        {/* Personalized Offers */}
        <div className="personalized-section offers-section">
          <div className="section-header">
            <h2>
              <Tag size={20} /> Special Offers
            </h2>
          </div>
          <div className="offers-grid">
            {personalizedOffers.map(offer => (
              <div key={offer.id} className="offer-card">
                <div className="offer-badge">{offer.discount}% OFF</div>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <div className="offer-code">
                  <span>Code:</span>
                  <code>{offer.code}</code>
                </div>
                <div className="offer-footer">
                  <span className="offer-category">{offer.category}</span>
                  <span className="offer-expiry">Valid until {offer.validUntil}</span>
                </div>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="personalized-section recommended-section">
          <div className="section-header">
            <h2>
              <TrendingUp size={20} /> Recommended for You
            </h2>
          </div>
          <div className="products-grid">
            {recommendedProducts.map(product => (
              <div key={product.id} className="recommended-product-card">
                <div className="recommendation-reason">{product.reason}</div>
                <ProductCard product={product} onViewDetails={() => setSelectedProduct(product)} />
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="personalized-section recently-viewed-section">
            <div className="section-header">
              <h2>
                <Clock size={20} /> Recently Viewed
              </h2>
            </div>
            <div className="products-grid">
              {recentlyViewed.slice(0, 4).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Continue Shopping */}
        {continueShoppingItems.length > 0 && (
          <div className="personalized-section continue-shopping-section">
            <div className="section-header">
              <h2>
                <ShoppingBag size={20} /> Continue Shopping
              </h2>
            </div>
            <div className="products-grid">
              {continueShoppingItems.map(product => (
                <div key={product.id} className="continue-shopping-card">
                  <div className="last-viewed-badge">{product.lastViewed}</div>
                  <ProductCard
                    product={product}
                    onViewDetails={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </Layout>
  );
};

export default Dashboard;
