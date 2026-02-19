import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive chart configuration
 * Returns mobile-optimized chart settings
 */
export const useResponsiveChart = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    isSmallMobile,
    height: isSmallMobile ? 180 : isMobile ? 200 : 300,
    margin: isMobile
      ? { top: 5, right: 5, left: -20, bottom: 0 }
      : { top: 10, right: 30, left: 0, bottom: 0 },
    fontSize: isSmallMobile ? 9 : isMobile ? 10 : 12,
    xAxisAngle: isMobile ? -45 : 0,
    xAxisTextAnchor: isMobile ? 'end' : 'middle',
    legendLayout: isMobile ? 'horizontal' : 'vertical',
    legendIconSize: isMobile ? 8 : 10,
  };
};
