import { createContext, useContext, useState, useEffect } from 'react';
import { 
  validatePasswordStrength, 
  validateEmail, 
  hashPassword,
  generateSecureToken,
  loginRateLimiter,
  sanitizeInput,
  secureStorage,
  checkSuspiciousActivity,
  setupSessionTimeout,
  logSecurityEvent,
  getDeviceFingerprint
} from '../utils/security';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState(null);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = secureStorage.getItem('user');
      const storedToken = secureStorage.getItem('authToken');
      
      if (storedUser && storedToken) {
        // Validate token expiry
        if (storedToken.expiresAt > Date.now()) {
          setUser(storedUser);
          setSessionToken(storedToken.token);
          setIsAuthenticated(true);
          logSecurityEvent('SESSION_RESTORED', { email: storedUser.email });
        } else {
          // Token expired
          logout();
          toast.error('Session expired. Please login again.');
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  // Setup session timeout
  useEffect(() => {
    if (isAuthenticated) {
      const cleanup = setupSessionTimeout(() => {
        logout();
        toast.error('Session timed out due to inactivity');
      }, 30 * 60 * 1000); // 30 minutes

      return cleanup;
    }
  }, [isAuthenticated]);

  const login = async (email, password, rememberMe = false) => {
    try {
      // Sanitize inputs
      email = sanitizeInput(email.trim().toLowerCase());
      
      // Validate email
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        toast.error(emailValidation.message);
        return { success: false, error: emailValidation.message };
      }

      // Rate limiting check
      const rateLimitCheck = loginRateLimiter.isAllowed(email);
      if (!rateLimitCheck.allowed) {
        const error = `Too many login attempts. Please try again in ${rateLimitCheck.remainingTime} minutes.`;
        toast.error(error);
        logSecurityEvent('RATE_LIMIT_EXCEEDED', { email });
        return { success: false, error };
      }

      // Check for suspicious activity
      const suspiciousCheck = checkSuspiciousActivity(email);
      if (suspiciousCheck.suspicious) {
        toast.error(suspiciousCheck.reason);
        logSecurityEvent('SUSPICIOUS_ACTIVITY', { email, reason: suspiciousCheck.reason });
        return { success: false, error: suspiciousCheck.reason };
      }

      // Hash password (in production, send to backend)
      const hashedPassword = await hashPassword(password);

      // Mock authentication (replace with actual API call)
      const isAdmin = email === 'admin@admin.com' && password === 'admin123';
      const isValidUser = password.length >= 6; // Mock validation

      if (!isValidUser && !isAdmin) {
        toast.error('Invalid credentials');
        logSecurityEvent('LOGIN_FAILED', { email, reason: 'Invalid credentials' });
        return { success: false, error: 'Invalid credentials' };
      }

      // Generate secure session token
      const token = generateSecureToken(64);
      const expiresAt = Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000);

      const userData = {
        email,
        name: isAdmin ? 'Admin User' : email.split('@')[0],
        role: isAdmin ? 'admin' : 'user',
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=4F46E5&color=fff`,
        loginTime: Date.now(),
        deviceFingerprint: getDeviceFingerprint()
      };

      // Check if 2FA is enabled (mock check)
      const has2FA = secureStorage.getItem(`2fa_${email}`) || false;
      
      if (has2FA) {
        // Store pending user data for 2FA verification
        setPendingUser({ userData, token, expiresAt });
        setTwoFactorRequired(true);
        toast.success('Please enter your 2FA code');
        return { success: true, requires2FA: true };
      }

      // Complete login
      completeLogin(userData, token, expiresAt);
      
      // Reset rate limiter on successful login
      loginRateLimiter.reset(email);

      // Log successful login
      logSecurityEvent('LOGIN_SUCCESS', { email, role: userData.role });

      // Update login history
      const loginHistory = secureStorage.getItem('loginHistory') || [];
      loginHistory.push({
        email,
        timestamp: Date.now(),
        deviceFingerprint: getDeviceFingerprint()
      });
      secureStorage.setItem('loginHistory', loginHistory.slice(-50)); // Keep last 50

      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true, user: userData };

    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      logSecurityEvent('LOGIN_ERROR', { error: error.message });
      return { success: false, error: error.message };
    }
  };

  const verify2FA = (code) => {
    const storedCode = secureStorage.getItem(`2fa_code_${pendingUser.userData.email}`);
    
    if (code === storedCode) {
      completeLogin(pendingUser.userData, pendingUser.token, pendingUser.expiresAt);
      setTwoFactorRequired(false);
      setPendingUser(null);
      toast.success('2FA verification successful');
      logSecurityEvent('2FA_SUCCESS', { email: pendingUser.userData.email });
      return { success: true };
    } else {
      toast.error('Invalid 2FA code');
      logSecurityEvent('2FA_FAILED', { email: pendingUser.userData.email });
      return { success: false, error: 'Invalid 2FA code' };
    }
  };

  const completeLogin = (userData, token, expiresAt) => {
    setUser(userData);
    setSessionToken(token);
    setIsAuthenticated(true);

    // Store in secure storage
    secureStorage.setItem('user', userData);
    secureStorage.setItem('authToken', { token, expiresAt });
  };

  const register = async (email, password, name) => {
    try {
      // Sanitize inputs
      email = sanitizeInput(email.trim().toLowerCase());
      name = sanitizeInput(name.trim());

      // Validate email
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        toast.error(emailValidation.message);
        return { success: false, error: emailValidation.message };
      }

      // Validate password strength
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        toast.error('Password does not meet security requirements');
        return { 
          success: false, 
          error: 'Weak password', 
          feedback: passwordValidation.feedback 
        };
      }

      // Check if user already exists (mock)
      const existingUser = secureStorage.getItem(`user_${email}`);
      if (existingUser) {
        toast.error('User already exists');
        return { success: false, error: 'User already exists' };
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user (mock - in production, send to backend)
      const userData = {
        email,
        name,
        password: hashedPassword,
        role: 'user',
        createdAt: Date.now(),
        verified: false
      };

      secureStorage.setItem(`user_${email}`, userData);
      
      logSecurityEvent('REGISTRATION_SUCCESS', { email });
      toast.success('Registration successful! Please login.');
      
      return { success: true };

    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      logSecurityEvent('REGISTRATION_ERROR', { error: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    logSecurityEvent('LOGOUT', { email: user?.email });
    
    setUser(null);
    setSessionToken(null);
    setIsAuthenticated(false);
    setTwoFactorRequired(false);
    setPendingUser(null);
    
    secureStorage.removeItem('user');
    secureStorage.removeItem('authToken');
    
    toast.success('Logged out successfully');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Validate new password
      const validation = validatePasswordStrength(newPassword);
      if (!validation.isValid) {
        return { 
          success: false, 
          error: 'New password does not meet security requirements',
          feedback: validation.feedback 
        };
      }

      // Verify current password (mock)
      const currentHash = await hashPassword(currentPassword);
      const storedUser = secureStorage.getItem(`user_${user.email}`);
      
      if (storedUser && storedUser.password !== currentHash) {
        toast.error('Current password is incorrect');
        return { success: false, error: 'Current password is incorrect' };
      }

      // Update password
      const newHash = await hashPassword(newPassword);
      storedUser.password = newHash;
      secureStorage.setItem(`user_${user.email}`, storedUser);

      logSecurityEvent('PASSWORD_CHANGED', { email: user.email });
      toast.success('Password changed successfully');
      
      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: error.message };
    }
  };

  const enable2FA = () => {
    secureStorage.setItem(`2fa_${user.email}`, true);
    logSecurityEvent('2FA_ENABLED', { email: user.email });
    toast.success('Two-factor authentication enabled');
    return { success: true };
  };

  const disable2FA = () => {
    secureStorage.removeItem(`2fa_${user.email}`);
    logSecurityEvent('2FA_DISABLED', { email: user.email });
    toast.success('Two-factor authentication disabled');
    return { success: true };
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    sessionToken,
    twoFactorRequired,
    login,
    register,
    logout,
    isAdmin,
    verify2FA,
    changePassword,
    enable2FA,
    disable2FA
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
