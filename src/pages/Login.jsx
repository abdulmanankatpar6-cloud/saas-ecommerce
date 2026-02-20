import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Chrome, Facebook, RefreshCw } from 'lucide-react';
import { clearLoginHistory } from '../utils/security';
import toast from 'react-hot-toast';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const calculatePasswordStrength = password => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password' && !isLogin) {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleMobileSecurityReset = () => {
    if (formData.email) {
      clearLoginHistory(formData.email);
      toast.success('Security flags cleared! Please try logging in again.');
      setShowError(false);
      setLoginAttempts(0);
    } else {
      toast.error('Please enter your email first');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('Login attempt:', { email: formData.email, isLogin });

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        toast.error('Please enter your name');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (passwordStrength < 2) {
        toast.error('Password is too weak');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login with professional security system
        const result = await login(formData.email, formData.password, rememberMe);

        if (result.success) {
          // Clear any error states
          setShowError(false);
          setLoginAttempts(0);

          if (result.requires2FA) {
            // Handle 2FA flow (would show 2FA input modal)
            toast.success('Please enter your 2FA code');
            // For now, just redirect - 2FA UI can be added later
          } else {
            // Success - redirect based on user role
            const user = result.user;
            toast.success(`Welcome back, ${user.name}!`);

            // Small delay to ensure state is updated
            setTimeout(() => {
              if (user.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
              } else {
                navigate('/dashboard', { replace: true });
              }
            }, 100);
          }
        } else {
          // Login failed - show error and track attempts
          setShowError(true);
          setLoginAttempts(prev => prev + 1);

          // Enhanced error feedback with shake animation
          const form = document.querySelector('.login-form');
          if (form && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
          }

          // Show specific error message
          if (result.error.includes('security')) {
            toast.error('Security check failed. Try the mobile reset button below.');
          } else {
            toast.error(result.error || 'Login failed. Please check your credentials.');
          }
        }
      } else {
        // Registration flow (can be implemented later with register function)
        toast.success('Registration feature coming soon!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = ['#EF4444', '#FACC15', '#22C55E', '#10B981'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-illustration">
          <img src="https://illustrations.popsy.co/amber/remote-work.svg" alt="Login" />
          <h2>Welcome to NextWeb</h2>
          <p>Power up your business with our e-commerce solutions</p>
        </div>

        <div className="login-form-container">
          <div className="login-header">
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <p>{isLogin ? 'Welcome back!' : 'Create your account'}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isLogin && formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{
                          background:
                            i < passwordStrength ? strengthColors[passwordStrength - 1] : '#E5E7EB',
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ color: strengthColors[passwordStrength - 1] }}>
                    {strengthLabels[passwordStrength - 1]}
                  </span>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className={`btn btn-primary btn-block ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
              aria-label={isLoading ? 'Logging in...' : isLogin ? 'Login' : 'Create Account'}
            >
              {isLoading ? (
                <>
                  <div className="spinner" aria-hidden="true"></div>
                  Logging in...
                </>
              ) : isLogin ? (
                'Login'
              ) : (
                'Create Account'
              )}
            </button>

            {isLogin && loginAttempts > 1 && (
              <button
                type="button"
                className="btn btn-secondary btn-block mobile-security-reset"
                onClick={handleMobileSecurityReset}
                style={{ marginTop: '0.75rem' }}
                aria-label="Clear security flags for mobile devices"
              >
                <RefreshCw size={18} aria-hidden="true" />
                Clear Security Flags (Mobile Fix)
              </button>
            )}
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <button className="social-btn">
              <Chrome size={20} />
            </button>
            <button className="social-btn">
              <Facebook size={20} />
            </button>
          </div>

          <div className="toggle-form">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Login'}</button>
            </p>
          </div>

          {isLogin && (
            <div className="admin-hint">
              <p>💡 Admin Login: admin@admin.com / admin123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
