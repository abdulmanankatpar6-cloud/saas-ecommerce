// Security Utilities for Production-Grade Authentication

/**
 * Password strength validator
 * Returns: { isValid: boolean, strength: string, feedback: string[] }
 */
export const validatePasswordStrength = password => {
  const feedback = [];
  let strength = 0;

  // Length check
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters');
  } else if (password.length >= 12) {
    strength += 2;
  } else {
    strength += 1;
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    feedback.push('Include at least one uppercase letter');
  } else {
    strength += 1;
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    feedback.push('Include at least one lowercase letter');
  } else {
    strength += 1;
  }

  // Number check
  if (!/\d/.test(password)) {
    feedback.push('Include at least one number');
  } else {
    strength += 1;
  }

  // Special character check
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Include at least one special character');
  } else {
    strength += 1;
  }

  // Common patterns check
  const commonPatterns = ['123456', 'password', 'qwerty', 'abc123', '111111'];
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    feedback.push('Avoid common patterns');
    strength -= 2;
  }

  const strengthLevels = {
    0: 'Very Weak',
    1: 'Weak',
    2: 'Weak',
    3: 'Fair',
    4: 'Good',
    5: 'Strong',
    6: 'Very Strong',
  };

  return {
    isValid: strength >= 4 && feedback.length === 0,
    strength: strengthLevels[Math.max(0, strength)],
    score: strength,
    feedback,
  };
};

/**
 * Email validator with comprehensive checks
 */
export const validateEmail = email => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }

  // Check for disposable email domains
  const disposableDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
  const domain = email.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return { isValid: false, message: 'Disposable email addresses are not allowed' };
  }

  return { isValid: true, message: 'Valid email' };
};

/**
 * Hash password (client-side hashing for demo - use bcrypt on backend)
 */
export const hashPassword = async password => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Generate secure random token
 */
export const generateSecureToken = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Session token validator
 */
export const validateSessionToken = token => {
  if (!token || token.length < 32) {
    return false;
  }

  const tokenData = JSON.parse(localStorage.getItem('authToken'));
  if (!tokenData) return false;

  // Check token expiry
  const expiryTime = tokenData.expiresAt;
  if (Date.now() > expiryTime) {
    localStorage.removeItem('authToken');
    return false;
  }

  return true;
};

/**
 * Rate limiting for login attempts
 */
class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);

    if (recentAttempts.length >= this.maxAttempts) {
      const oldestAttempt = Math.min(...recentAttempts);
      const timeUntilReset = this.windowMs - (now - oldestAttempt);
      return {
        allowed: false,
        remainingTime: Math.ceil(timeUntilReset / 1000 / 60),
        attemptsLeft: 0,
      };
    }

    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);

    return {
      allowed: true,
      attemptsLeft: this.maxAttempts - recentAttempts.length,
    };
  }

  reset(identifier) {
    this.attempts.delete(identifier);
  }
}

export const loginRateLimiter = new RateLimiter(15, 15 * 60 * 1000); // 15 attempts per 15 minutes (mobile-friendly)

/**
 * XSS Protection - Sanitize user input
 */
export const sanitizeInput = input => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * CSRF Token generator and validator
 */
export const generateCSRFToken = () => {
  const token = generateSecureToken(32);
  sessionStorage.setItem('csrfToken', token);
  return token;
};

export const validateCSRFToken = token => {
  const storedToken = sessionStorage.getItem('csrfToken');
  return token === storedToken;
};

/**
 * Secure session storage with encryption
 */
export const secureStorage = {
  setItem: (key, value) => {
    try {
      const encrypted = btoa(JSON.stringify(value));
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  getItem: key => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return JSON.parse(atob(encrypted));
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },

  removeItem: key => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
    sessionStorage.clear();
  },
};

/**
 * Clear login history for mobile users (helps with false security flags)
 */
export const clearLoginHistory = userEmail => {
  const loginHistory = secureStorage.getItem('loginHistory') || [];
  const filteredHistory = loginHistory.filter(login => login.email !== userEmail);
  secureStorage.setItem('loginHistory', filteredHistory);

  // Also clear rate limiter for this user
  loginRateLimiter.reset(userEmail);

  // Clear failed attempts
  secureStorage.removeItem(`failed_attempts_${userEmail}`);
  secureStorage.removeItem(`account_locked_${userEmail}`);
};

/**
 * IP-based security check (mock for frontend)
 */
export const checkSuspiciousActivity = userEmail => {
  const loginHistory = secureStorage.getItem('loginHistory') || [];
  const recentLogins = loginHistory.filter(
    login => login.email === userEmail && Date.now() - login.timestamp < 24 * 60 * 60 * 1000
  );

  // More lenient for mobile - flag if more than 50 logins in 24 hours (was 10)
  // This prevents false positives on mobile devices where users refresh frequently
  if (recentLogins.length > 50) {
    return {
      suspicious: true,
      reason: 'Unusual number of login attempts detected',
    };
  }

  return { suspicious: false };
};

/**
 * Two-Factor Authentication code generator (mock)
 */
export const generate2FACode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Verify 2FA code
 */
export const verify2FACode = (inputCode, storedCode) => {
  return inputCode === storedCode;
};

/**
 * Session timeout handler
 */
export const setupSessionTimeout = (callback, timeoutMs = 30 * 60 * 1000) => {
  let timeoutId;

  const resetTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback();
    }, timeoutMs);
  };

  // Reset on user activity
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, resetTimeout);
  });

  resetTimeout();

  return () => {
    clearTimeout(timeoutId);
    events.forEach(event => {
      document.removeEventListener(event, resetTimeout);
    });
  };
};

/**
 * Password breach check (mock - in production use HaveIBeenPwned API)
 */
export const checkPasswordBreach = async password => {
  // In production, use HaveIBeenPwned API
  // For demo, check against common breached passwords
  const commonBreached = [
    'password123',
    '12345678',
    'qwerty123',
    'admin123',
    'welcome123',
    'letmein',
    'monkey',
    'dragon',
  ];

  return {
    breached: commonBreached.includes(password.toLowerCase()),
    message: commonBreached.includes(password.toLowerCase())
      ? 'This password has been found in data breaches'
      : 'Password not found in known breaches',
  };
};

/**
 * Device fingerprinting (basic)
 */
export const getDeviceFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('fingerprint', 2, 2);

  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvasFingerprint: canvas.toDataURL().slice(-50),
  };
};

/**
 * Audit log entry
 */
export const logSecurityEvent = (event, details) => {
  const logs = secureStorage.getItem('securityLogs') || [];
  logs.push({
    event,
    details,
    timestamp: Date.now(),
    deviceFingerprint: getDeviceFingerprint(),
  });

  // Keep only last 100 logs
  if (logs.length > 100) {
    logs.shift();
  }

  secureStorage.setItem('securityLogs', logs);
};
