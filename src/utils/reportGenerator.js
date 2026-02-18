import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';

/**
 * Professional Report Generator Utility
 * Frontend-only report generation for CSV, PDF, and Excel formats
 */

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Generate CSV Report
 */
export const generateCSV = (data, filename, reportType) => {
  let csvData = [];
  let headers = [];

  switch (reportType) {
    case 'dashboard':
      headers = ['Metric', 'Value', 'Change'];
      csvData = data.stats.map(stat => ({
        Metric: stat.label,
        Value: stat.value,
        Change: stat.change
      }));
      break;

    case 'orders':
      headers = ['Order ID', 'Customer', 'Email', 'Product', 'Items', 'Amount', 'Status', 'Date'];
      csvData = data.orders.map(order => ({
        'Order ID': order.id,
        'Customer': order.customer,
        'Email': order.email,
        'Product': order.product,
        'Items': order.items,
        'Amount': formatCurrency(order.amount),
        'Status': order.status,
        'Date': formatDate(order.date)
      }));
      break;

    case 'products':
      headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'Status'];
      csvData = data.products.map(product => ({
        'ID': product.id,
        'Name': product.name,
        'Category': product.category,
        'Price': formatCurrency(product.price),
        'Stock': product.stock,
        'Status': product.status
      }));
      break;

    case 'sales':
      headers = ['Month', 'Revenue', 'Orders'];
      csvData = data.salesData.map(item => ({
        'Month': item.month,
        'Revenue': formatCurrency(item.revenue),
        'Orders': item.orders
      }));
      break;

    default:
      csvData = data;
  }

  // Add report header
  const reportHeader = [
    [`${reportType.toUpperCase()} REPORT`],
    [`Generated: ${new Date().toLocaleString()}`],
    [''],
    headers
  ];

  // Convert to CSV
  const csv = Papa.unparse({
    fields: headers,
    data: csvData
  });

  // Add header to CSV
  const fullCSV = reportHeader.slice(0, 2).map(row => row.join(',')).join('\n') + '\n\n' + csv;

  // Create download
  const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generate PDF Report
 */
export const generatePDF = async (data, filename, reportType) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colors
  const primaryColor = [79, 70, 229]; // #4F46E5
  const textColor = [17, 24, 39]; // #111827
  const grayColor = [107, 114, 128]; // #6B7280

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Admin Panel', 14, 20);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`${reportType.toUpperCase()} REPORT`, 14, 30);

  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 14, 30, { align: 'right' });

  let yPosition = 50;

  switch (reportType) {
    case 'dashboard':
      // Summary Stats
      doc.setTextColor(...textColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Summary Statistics', 14, yPosition);
      yPosition += 10;

      // Stats table
      const statsData = data.stats.map(stat => [
        stat.label,
        stat.value,
        stat.change
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [['Metric', 'Value', 'Change']],
        body: statsData,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          fontSize: 11,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        },
        alternateRowStyles: {
          fillColor: [249, 250, 251]
        }
      });

      yPosition = doc.lastAutoTable.finalY + 15;

      // Sales Overview
      if (data.salesData && data.salesData.length > 0) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Sales Overview', 14, yPosition);
        yPosition += 10;

        const salesTableData = data.salesData.map(item => [
          item.month,
          formatCurrency(item.revenue),
          item.orders.toString()
        ]);

        doc.autoTable({
          startY: yPosition,
          head: [['Month', 'Revenue', 'Orders']],
          body: salesTableData,
          theme: 'grid',
          headStyles: {
            fillColor: primaryColor,
            fontSize: 11,
            fontStyle: 'bold'
          },
          styles: {
            fontSize: 10,
            cellPadding: 5
          }
        });

        yPosition = doc.lastAutoTable.finalY + 15;
      }

      // Recent Orders
      if (data.recentOrders && data.recentOrders.length > 0) {
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Recent Orders', 14, yPosition);
        yPosition += 10;

        const ordersTableData = data.recentOrders.map(order => [
          order.id,
          order.customer,
          order.product,
          formatCurrency(order.amount),
          order.status
        ]);

        doc.autoTable({
          startY: yPosition,
          head: [['Order ID', 'Customer', 'Product', 'Amount', 'Status']],
          body: ordersTableData,
          theme: 'grid',
          headStyles: {
            fillColor: primaryColor,
            fontSize: 10,
            fontStyle: 'bold'
          },
          styles: {
            fontSize: 9,
            cellPadding: 4
          }
        });
      }
      break;

    case 'orders':
      doc.setTextColor(...textColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Orders Report', 14, yPosition);
      yPosition += 5;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...grayColor);
      doc.text(`Total Orders: ${data.orders.length}`, 14, yPosition);
      yPosition += 10;

      const ordersData = data.orders.map(order => [
        order.id,
        order.customer,
        order.product,
        order.items.toString(),
        formatCurrency(order.amount),
        order.status,
        formatDate(order.date)
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [['Order ID', 'Customer', 'Product', 'Items', 'Amount', 'Status', 'Date']],
        body: ordersData,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          fontSize: 9,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 8,
          cellPadding: 3
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 30 },
          2: { cellWidth: 35 },
          3: { cellWidth: 15 },
          4: { cellWidth: 25 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 }
        }
      });
      break;

    case 'products':
      doc.setTextColor(...textColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Products Report', 14, yPosition);
      yPosition += 5;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...grayColor);
      doc.text(`Total Products: ${data.products.length}`, 14, yPosition);
      yPosition += 10;

      const productsData = data.products.map(product => [
        product.id.toString(),
        product.name,
        product.category,
        formatCurrency(product.price),
        product.stock.toString(),
        product.status
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [['ID', 'Name', 'Category', 'Price', 'Stock', 'Status']],
        body: productsData,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 4
        }
      });
      break;

    case 'sales':
      doc.setTextColor(...textColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Sales Report', 14, yPosition);
      yPosition += 10;

      const salesData = data.salesData.map(item => [
        item.month,
        formatCurrency(item.revenue),
        item.orders.toString(),
        formatCurrency(item.revenue / item.orders)
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [['Month', 'Revenue', 'Orders', 'Avg Order Value']],
        body: salesData,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          fontSize: 11,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        }
      });

      // Calculate totals
      const totalRevenue = data.salesData.reduce((sum, item) => sum + item.revenue, 0);
      const totalOrders = data.salesData.reduce((sum, item) => sum + item.orders, 0);

      yPosition = doc.lastAutoTable.finalY + 15;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Summary', 14, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 14, yPosition);
      yPosition += 7;
      doc.text(`Total Orders: ${totalOrders}`, 14, yPosition);
      yPosition += 7;
      doc.text(`Average Order Value: ${formatCurrency(totalRevenue / totalOrders)}`, 14, yPosition);
      break;
  }

  // Footer
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated by Admin Panel | Confidential - Internal Use Only', pageWidth / 2, footerY, { align: 'center' });

  // Save PDF
  doc.save(`${filename}.pdf`);
};

/**
 * Generate filename with timestamp
 */
export const generateFilename = (reportType) => {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  return `${reportType}-report-${dateStr}`;
};
