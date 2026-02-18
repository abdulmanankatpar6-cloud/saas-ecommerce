import { useState } from 'react';
import Layout from '../components/Layout';
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');

  // Monthly Sales Data
  const monthlySalesData = [
    { month: 'Jan', revenue: 12000, orders: 245, customers: 189 },
    { month: 'Feb', revenue: 15000, orders: 298, customers: 234 },
    { month: 'Mar', revenue: 18000, orders: 356, customers: 289 },
    { month: 'Apr', revenue: 16000, orders: 312, customers: 256 },
    { month: 'May', revenue: 22000, orders: 445, customers: 378 },
    { month: 'Jun', revenue: 25000, orders: 512, customers: 423 },
  ];

  // Top Selling Products
  const topSellingData = [
    { name: 'Smart Watch', sales: 245, revenue: 44055 },
    { name: 'Wireless Earbuds', sales: 189, revenue: 15108 },
    { name: 'Gaming Laptop', sales: 156, revenue: 155984 },
    { name: 'Keyboard', sales: 134, revenue: 17418 },
    { name: 'Mouse', sales: 98, revenue: 4894 },
  ];

  // Revenue Trends
  const revenueTrendsData = [
    { week: 'Week 1', revenue: 5200, target: 5000 },
    { week: 'Week 2', revenue: 6100, target: 5500 },
    { week: 'Week 3', revenue: 5800, target: 6000 },
    { week: 'Week 4', revenue: 7900, target: 6500 },
  ];

  // Customer Growth
  const customerGrowthData = [
    { month: 'Jan', new: 189, returning: 156 },
    { month: 'Feb', new: 234, returning: 198 },
    { month: 'Mar', new: 289, returning: 245 },
    { month: 'Apr', new: 256, returning: 223 },
    { month: 'May', new: 378, returning: 298 },
    { month: 'Jun', new: 423, returning: 356 },
  ];

  // Category Distribution
  const categoryData = [
    { name: 'Electronics', value: 45, color: '#4F46E5' },
    { name: 'Audio', value: 25, color: '#22C55E' },
    { name: 'Computers', value: 20, color: '#FACC15' },
    { name: 'Accessories', value: 10, color: '#EF4444' },
  ];

  const stats = [
    { 
      icon: DollarSign, 
      label: 'Total Revenue', 
      value: '$108,000', 
      change: '+18.2%', 
      trend: 'up',
      color: '#4F46E5' 
    },
    { 
      icon: ShoppingCart, 
      label: 'Total Orders', 
      value: '2,168', 
      change: '+12.5%', 
      trend: 'up',
      color: '#22C55E' 
    },
    { 
      icon: Users, 
      label: 'Total Customers', 
      value: '1,769', 
      change: '+8.3%', 
      trend: 'up',
      color: '#FACC15' 
    },
    { 
      icon: Package, 
      label: 'Avg Order Value', 
      value: '$49.82', 
      change: '+5.1%', 
      trend: 'up',
      color: '#EF4444' 
    },
  ];

  return (
    <Layout>
      <div className="analytics-page">
        <div className="analytics-header">
          <div>
            <h1>Advanced Analytics</h1>
            <p>Comprehensive insights into your business performance</p>
          </div>
          <div className="analytics-actions">
            <select 
              className="time-range-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="6months">Last 6 months</option>
              <option value="1year">Last year</option>
            </select>
            <button className="btn btn-primary">
              Download Report
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="analytics-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="analytics-stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className={`stat-change ${stat.trend}`}>
                  {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Sales Chart */}
        <div className="analytics-chart-card">
          <div className="chart-header">
            <div>
              <h3>Monthly Sales Performance</h3>
              <p>Revenue and order trends over time</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlySalesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
              <Area type="monotone" dataKey="orders" stroke="#22C55E" fillOpacity={1} fill="url(#colorOrders)" name="Orders" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Two Column Charts */}
        <div className="analytics-two-column">
          {/* Top Selling Products */}
          <div className="analytics-chart-card">
            <div className="chart-header">
              <div>
                <h3>Top Selling Products</h3>
                <p>Best performers by sales volume</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSellingData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#6B7280" />
                <YAxis dataKey="name" type="category" stroke="#6B7280" width={120} />
                <Tooltip />
                <Bar dataKey="sales" fill="#4F46E5" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="analytics-chart-card">
            <div className="chart-header">
              <div>
                <h3>Sales by Category</h3>
                <p>Product category breakdown</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.name} ${entry.value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trends */}
        <div className="analytics-chart-card">
          <div className="chart-header">
            <div>
              <h3>Revenue Trends vs Target</h3>
              <p>Weekly revenue performance against targets</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} name="Actual Revenue" />
              <Line type="monotone" dataKey="target" stroke="#FACC15" strokeWidth={3} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth */}
        <div className="analytics-chart-card">
          <div className="chart-header">
            <div>
              <h3>Customer Growth Analysis</h3>
              <p>New vs returning customer trends</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="new" fill="#22C55E" name="New Customers" />
              <Bar dataKey="returning" fill="#4F46E5" name="Returning Customers" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="insights-section">
          <h3>Key Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon" style={{ background: '#22C55E15', color: '#22C55E' }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <h4>Revenue Growth</h4>
                <p>Your revenue has increased by 18.2% compared to last period. Keep up the great work!</p>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon" style={{ background: '#4F46E515', color: '#4F46E5' }}>
                <Users size={24} />
              </div>
              <div>
                <h4>Customer Retention</h4>
                <p>Returning customers make up 45% of your orders. Focus on retention strategies.</p>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon" style={{ background: '#FACC1515', color: '#FACC15' }}>
                <Package size={24} />
              </div>
              <div>
                <h4>Top Category</h4>
                <p>Electronics category leads with 45% of total sales. Consider expanding inventory.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
