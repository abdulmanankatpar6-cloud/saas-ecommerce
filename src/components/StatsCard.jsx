import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatsCard.css';

const StatsCard = ({ icon: Icon, label, value, change, color }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="stats-card">
      <div className="stats-icon" style={{ background: `${color}15`, color }}>
        <Icon size={24} />
      </div>
      <div className="stats-content">
        <p className="stats-label">{label}</p>
        <h3 className="stats-value">{value}</h3>
        <div className={`stats-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
