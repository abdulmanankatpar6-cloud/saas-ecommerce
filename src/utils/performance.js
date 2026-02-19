/**
 * Performance Monitoring Utilities
 * Professional-grade performance tracking and optimization
 */

// Web Vitals tracking
export const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Performance observer for long tasks
export const observeLongTasks = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name,
            });
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task API not supported
    }
  }
};

// Resource timing analysis
export const analyzeResourceTiming = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource');
    const analysis = {
      total: resources.length,
      scripts: resources.filter(r => r.initiatorType === 'script').length,
      stylesheets: resources.filter(r => r.initiatorType === 'link').length,
      images: resources.filter(r => r.initiatorType === 'img').length,
      totalSize: resources.reduce((acc, r) => acc + (r.transferSize || 0), 0),
      slowResources: resources
        .filter(r => r.duration > 1000)
        .map(r => ({
          name: r.name,
          duration: r.duration,
          size: r.transferSize,
        })),
    };
    return analysis;
  }
  return null;
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    return {
      usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
    };
  }
  return null;
};

// Navigation timing
export const getNavigationTiming = () => {
  if ('performance' in window && 'timing' in performance) {
    const timing = performance.timing;
    return {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseStart - timing.requestStart,
      response: timing.responseEnd - timing.responseStart,
      dom: timing.domComplete - timing.domLoading,
      load: timing.loadEventEnd - timing.loadEventStart,
      total: timing.loadEventEnd - timing.navigationStart,
    };
  }
  return null;
};

// FPS monitoring
export const monitorFPS = (callback, duration = 1000) => {
  let lastTime = performance.now();
  let frames = 0;

  const measureFPS = currentTime => {
    frames++;
    if (currentTime >= lastTime + duration) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      callback(fps);
      frames = 0;
      lastTime = currentTime;
    }
    requestAnimationFrame(measureFPS);
  };

  requestAnimationFrame(measureFPS);
};

// Bundle size reporter
export const reportBundleSize = () => {
  if ('performance' in window) {
    const scripts = performance
      .getEntriesByType('resource')
      .filter(r => r.initiatorType === 'script');
    const totalSize = scripts.reduce((acc, script) => acc + (script.transferSize || 0), 0);
    console.log('Bundle Analysis:', {
      scripts: scripts.length,
      totalSize: (totalSize / 1024).toFixed(2) + ' KB',
      compressed: scripts.some(s => s.encodedBodySize < s.decodedBodySize),
    });
  }
};

// Export all utilities
export default {
  reportWebVitals,
  observeLongTasks,
  analyzeResourceTiming,
  getMemoryUsage,
  getNavigationTiming,
  monitorFPS,
  reportBundleSize,
};
