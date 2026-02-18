import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './CartPanel.css';

const CartPanel = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, shipping, payment, review, success

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setCheckoutStep('shipping');
  };

  const handlePlaceOrder = () => {
    setCheckoutStep('success');
    setTimeout(() => {
      clearCart();
      setCheckoutStep('cart');
      onClose();
      toast.success('Order placed successfully!');
    }, 3000);
  };

  const renderCart = () => (
    <>
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={64} />
            <h3>Your cart is empty</h3>
            <p>Add some products to get started</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <button 
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span className="total-amount">${cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </>
  );

  const renderShipping = () => (
    <div className="checkout-form">
      <h3>Shipping Information</h3>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Phone Number" required />
        <input type="text" placeholder="Address" required />
        <div className="form-row">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="ZIP Code" required />
        </div>
        <button 
          type="button" 
          className="btn btn-primary btn-block"
          onClick={() => setCheckoutStep('payment')}
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );

  const renderPayment = () => (
    <div className="checkout-form">
      <h3>Payment Information</h3>
      <form>
        <input type="text" placeholder="Card Number" required />
        <div className="form-row">
          <input type="text" placeholder="MM/YY" required />
          <input type="text" placeholder="CVV" required />
        </div>
        <input type="text" placeholder="Cardholder Name" required />
        <button 
          type="button" 
          className="btn btn-primary btn-block"
          onClick={() => setCheckoutStep('review')}
        >
          Review Order
        </button>
      </form>
    </div>
  );

  const renderReview = () => (
    <div className="order-review">
      <h3>Order Review</h3>
      <div className="review-items">
        {cart.map((item) => (
          <div key={item.id} className="review-item">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="review-total">
        <span>Total:</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
      <button 
        className="btn btn-success btn-block"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="order-success">
      <CheckCircle size={80} color="#22C55E" />
      <h3>Order Placed Successfully!</h3>
      <p>Thank you for your purchase</p>
      <p className="order-number">Order #12345</p>
    </div>
  );

  const steps = [
    { key: 'cart', label: 'Cart', icon: ShoppingBag },
    { key: 'shipping', label: 'Shipping', icon: Truck },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'review', label: 'Review', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === checkoutStep);

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>
            {checkoutStep === 'cart' && 'Shopping Cart'}
            {checkoutStep === 'shipping' && 'Shipping'}
            {checkoutStep === 'payment' && 'Payment'}
            {checkoutStep === 'review' && 'Review Order'}
            {checkoutStep === 'success' && 'Success'}
          </h2>
          <button className="cart-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {checkoutStep !== 'cart' && checkoutStep !== 'success' && (
          <div className="checkout-steps">
            {steps.map((step, index) => (
              <div 
                key={step.key}
                className={`step ${index <= currentStepIndex ? 'active' : ''}`}
              >
                <div className="step-icon">
                  <step.icon size={20} />
                </div>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="cart-content">
          {checkoutStep === 'cart' && renderCart()}
          {checkoutStep === 'shipping' && renderShipping()}
          {checkoutStep === 'payment' && renderPayment()}
          {checkoutStep === 'review' && renderReview()}
          {checkoutStep === 'success' && renderSuccess()}
        </div>
      </div>
    </>
  );
};

export default CartPanel;
