import { useState } from 'react';
import { X, Download, FileText, FileSpreadsheet, Calendar, TrendingUp } from 'lucide-react';
import { generateCSV, generatePDF, generateFilename } from '../utils/reportGenerator';
import toast from 'react-hot-toast';
import './ReportModal.css';

const ReportModal = ({ isOpen, onClose, data, reportType = 'dashboard' }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const formats = [
    {
      id: 'csv',
      name: 'CSV',
      icon: FileSpreadsheet,
      description: 'Excel-compatible spreadsheet',
      color: '#22C55E'
    },
    {
      id: 'pdf',
      name: 'PDF',
      icon: FileText,
      description: 'Professional formatted report',
      color: '#EF4444'
    }
  ];

  const reportTypes = {
    dashboard: {
      title: 'Dashboard Summary Report',
      description: 'Complete overview with stats, sales data, and recent orders',
      icon: TrendingUp
    },
    orders: {
      title: 'Orders Report',
      description: 'Detailed list of all orders with customer information',
      icon: FileText
    },
    products: {
      title: 'Products Report',
      description: 'Complete product catalog with pricing and inventory',
      icon: FileSpreadsheet
    },
    sales: {
      title: 'Sales Report',
      description: 'Revenue and order trends over time',
      icon: TrendingUp
    }
  };

  const currentReport = reportTypes[reportType] || reportTypes.dashboard;

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const filename = generateFilename(reportType);

      // Show loading toast
      const loadingToast = toast.loading('Generating report...');

      // Simulate slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      if (selectedFormat === 'csv') {
        generateCSV(data, filename, reportType);
      } else if (selectedFormat === 'pdf') {
        await generatePDF(data, filename, reportType);
      }

      // Success
      toast.success(`${selectedFormat.toUpperCase()} report downloaded successfully!`, {
        id: loadingToast,
        duration: 3000
      });

      // Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Report generation error:', error);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="report-modal-header">
          <div className="report-modal-title">
            <Download size={24} />
            <div>
              <h2>Download Report</h2>
              <p>Export your data in professional format</p>
            </div>
          </div>
          <button className="report-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="report-modal-content">
          {/* Report Type Info */}
          <div className="report-info-card">
            <div className="report-info-icon">
              <currentReport.icon size={24} />
            </div>
            <div className="report-info-text">
              <h3>{currentReport.title}</h3>
              <p>{currentReport.description}</p>
            </div>
          </div>

          {/* Format Selection */}
          <div className="report-section">
            <label className="report-section-label">
              <FileText size={18} />
              Select Format
            </label>
            <div className="format-options">
              {formats.map((format) => (
                <button
                  key={format.id}
                  className={`format-option ${selectedFormat === format.id ? 'active' : ''}`}
                  onClick={() => setSelectedFormat(format.id)}
                  style={{
                    borderColor: selectedFormat === format.id ? format.color : 'transparent'
                  }}
                >
                  <div className="format-icon" style={{ color: format.color }}>
                    <format.icon size={32} />
                  </div>
                  <div className="format-info">
                    <h4>{format.name}</h4>
                    <p>{format.description}</p>
                  </div>
                  <div className="format-check">
                    {selectedFormat === format.id && (
                      <div className="check-circle" style={{ background: format.color }}>
                        ✓
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Report Details */}
          <div className="report-details">
            <div className="report-detail-item">
              <Calendar size={16} />
              <span>Generated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="report-detail-item">
              <FileText size={16} />
              <span>Format: {selectedFormat.toUpperCase()}</span>
            </div>
          </div>

          {/* Preview Info */}
          <div className="report-preview-info">
            <h4>What's included:</h4>
            <ul>
              {reportType === 'dashboard' && (
                <>
                  <li>Summary statistics and KPIs</li>
                  <li>Sales overview and trends</li>
                  <li>Recent orders list</li>
                  <li>Top performing products</li>
                </>
              )}
              {reportType === 'orders' && (
                <>
                  <li>Complete orders list</li>
                  <li>Customer information</li>
                  <li>Order status and dates</li>
                  <li>Payment amounts</li>
                </>
              )}
              {reportType === 'products' && (
                <>
                  <li>Product catalog</li>
                  <li>Pricing information</li>
                  <li>Stock levels</li>
                  <li>Category breakdown</li>
                </>
              )}
              {reportType === 'sales' && (
                <>
                  <li>Revenue by period</li>
                  <li>Order volume trends</li>
                  <li>Average order value</li>
                  <li>Growth metrics</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="report-modal-footer">
          <button
            className="btn btn-outline"
            onClick={onClose}
            disabled={isGenerating}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Download size={18} />
            {isGenerating ? 'Generating...' : `Generate ${selectedFormat.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
