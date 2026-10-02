import React, { useState } from 'react';
import { Icons } from './Icons';
import { formatINR } from './utils';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

export default function CheckoutWizard({ cartItems, cartTotal, discountAmount, finalTotal, onOrderCompleted, onCancel }) {
  const [step, setStep] = useState(1);
  
  // Shipping Form State
  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pinCode: '',
    country: 'India'
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking', 'cod'

  // Card Payment Form State
  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // UPI State
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiVerifying, setUpiVerifying] = useState(false);

  const handleAppendUpiHandle = (handle) => {
    let base = upiId.includes('@') ? upiId.split('@')[0].trim() : upiId.trim();
    if (!base) base = shipping.fullName ? shipping.fullName.toLowerCase().replace(/\s+/g, '') : 'user';
    const newId = `${base}${handle}`;
    setUpiId(newId);
    setUpiVerified(false);
    setErrors((prev) => ({ ...prev, upiId: null }));
  };

  // COD State
  const [codOtpSent, setCodOtpSent] = useState(false);
  const [codOtp, setCodOtp] = useState('');
  const [codOtpInput, setCodOtpInput] = useState('');
  const [codVerified, setCodVerified] = useState(false);
  const [codVerifying, setCodVerifying] = useState(false);
  const [showOtpNotification, setShowOtpNotification] = useState(false);

  // Netbanking State
  const [selectedBank, setSelectedBank] = useState('');

  // Errors state
  const [errors, setErrors] = useState({});

  // Formatting for card number (adding spaces)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setPayment({ ...payment, cardNumber: formatted });
  };

  // Formatting for expiry (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setPayment({ ...payment, expiry: value });
  };

  // Formatting for CVV (3-4 digits)
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setPayment({ ...payment, cvv: value });
  };

  // Form Validation
  const validateShipping = () => {
    const errs = {};
    if (!shipping.fullName.trim()) errs.fullName = "Full name is required";
    if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email)) errs.email = "Valid email is required";
    
    // 10-digit Indian Mobile Validation
    if (!shipping.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(shipping.mobile)) {
      errs.mobile = "Enter a valid 10-digit Indian mobile number (starts with 6-9)";
    }

    if (!shipping.address.trim()) errs.address = "Shipping address is required";
    if (!shipping.city.trim()) errs.city = "City is required";
    if (!shipping.state) errs.state = "State is required";

    // 6-digit Indian PIN Code validation
    if (!shipping.pinCode.trim()) {
      errs.pinCode = "PIN Code is required";
    } else if (!/^\d{6}$/.test(shipping.pinCode)) {
      errs.pinCode = "PIN Code must be exactly 6 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // UPI VPA Verification Simulation
  const handleVerifyUpi = () => {
    if (!upiId.trim() || !upiId.includes('@')) {
      setErrors({ ...errors, upiId: "Please enter a valid UPI ID (e.g. name@okhdfcbank)" });
      return;
    }
    setErrors({ ...errors, upiId: null });
    setUpiVerifying(true);
    setTimeout(() => {
      setUpiVerifying(false);
      setUpiVerified(true);
    }, 1200);
  };

  // COD OTP Generation Simulation
  const handleSendCodOtp = () => {
    setCodVerifying(true);
    setTimeout(() => {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      setCodOtp(otp);
      setCodOtpSent(true);
      setCodVerifying(false);
      setShowOtpNotification(true);
      // Automatically close notification after 8 seconds
      setTimeout(() => setShowOtpNotification(false), 8000);
    }, 1000);
  };

  // COD OTP Verification
  const handleVerifyCodOtp = () => {
    if (codOtpInput === codOtp) {
      setCodVerified(true);
      setErrors({ ...errors, codOtp: null });
    } else {
      setErrors({ ...errors, codOtp: "Invalid OTP. Please check and try again." });
    }
  };

  const validatePayment = () => {
    const errs = {};
    if (paymentMethod === 'card') {
      const cleanCard = payment.cardNumber.replace(/\s/g, '');
      if (!payment.cardName.trim()) errs.cardName = "Cardholder name is required";
      if (cleanCard.length !== 16) errs.cardNumber = "Card number must be 16 digits";
      if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) errs.expiry = "Expiry must be in MM/YY format";
      if (payment.cvv.length < 3) errs.cvv = "CVV must be 3 or 4 digits";
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        errs.upiId = "Please enter a valid UPI ID (e.g. name@okhdfcbank)";
      } else if (!upiVerified) {
        errs.upiId = "Please click 'Verify' to validate your UPI ID";
      }
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        errs.bank = "Please select a bank to proceed";
      }
    } else if (paymentMethod === 'cod') {
      if (!codVerified) {
        errs.codOtp = "Please verify your mobile number via OTP first";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateShipping()) setStep(2);
    } else if (step === 2) {
      if (validatePayment()) {
        setStep(3);
      }
    }
  };

  const handleBackStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Indian Logistics (Delhivery / Blue Dart) Mocking
  const deliveryPartners = ["Delhivery Express", "Blue Dart Aerospace", "Xpressbees Prime"];
  const selectedPartner = deliveryPartners[Math.floor(shipping.pinCode.charCodeAt(0) || 0) % deliveryPartners.length];
  const trackingNumber = `DEL-${Math.floor(10000000 + Math.random() * 90000000)}`;
  
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const deliveryString = deliveryDate.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="checkout-wizard">
      {/* Dynamic Simulated OTP Notification */}
      {showOtpNotification && (
        <div className="otp-sms-notification glass-card">
          <div className="sms-header">
            <span>💬 MESSAGES (MOCK)</span>
            <button onClick={() => setShowOtpNotification(false)}>×</button>
          </div>
          <p className="sms-body">
            Use code <strong>{codOtp}</strong> to verify your Cash on Delivery order for TECH STORE. Do not share this OTP.
          </p>
        </div>
      )}

      {/* Wizard Steps Progress Indicator */}
      <div className="wizard-progress-bar glass-card">
        <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step === 1 ? 'current' : ''}`}>
          <span className="step-num">1</span>
          <span className="step-label">Shipping</span>
        </div>
        <div className="progress-connector-line">
          <div className="line-fill" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />
        </div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step === 2 ? 'current' : ''}`}>
          <span className="step-num">2</span>
          <span className="step-label">Payment</span>
        </div>
        <div className="progress-connector-line">
          <div className="line-fill" style={{ width: step === 3 ? '100%' : '0%' }} />
        </div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step === 3 ? 'current' : ''}`}>
          <span className="step-num">3</span>
          <span className="step-label">Receipt</span>
        </div>
      </div>

      <div className="wizard-main-grid">
        {/* Step Content */}
        <div className="wizard-form-panel glass-card">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="checkout-form">
              <h3>Delivery & Shipping Address</h3>
              
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={shipping.fullName} 
                  onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  placeholder="e.g. Rohan Sharma"
                  required
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={shipping.email} 
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    placeholder="e.g. rohan@gmail.com"
                    required
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="form-group flex-1">
                  <label>Mobile Number</label>
                  <div className="phone-input-wrapper">
                    <span className="phone-prefix">+91</span>
                    <input 
                      type="tel" 
                      value={shipping.mobile} 
                      onChange={(e) => setShipping({ ...shipping, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      placeholder="98765 43210"
                      required
                    />
                  </div>
                  {errors.mobile && <span className="field-error">{errors.mobile}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Street Address / Flat No.</label>
                <input 
                  type="text" 
                  value={shipping.address} 
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  placeholder="e.g. 402, Sunset Heights, Link Road"
                  required
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>City</label>
                  <input 
                    type="text" 
                    value={shipping.city} 
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    required
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>
                
                <div className="form-group flex-1">
                  <label>State / Union Territory</label>
                  <select 
                    value={shipping.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                    className="select-field"
                    required
                  >
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <span className="field-error">{errors.state}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>PIN Code</label>
                  <input 
                    type="text" 
                    value={shipping.pinCode} 
                    onChange={(e) => setShipping({ ...shipping, pinCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    placeholder="e.g. 400001"
                    required
                  />
                  {errors.pinCode && <span className="field-error">{errors.pinCode}</span>}
                </div>
                
                <div className="form-group flex-1">
                  <label>Country</label>
                  <input 
                    type="text" 
                    value={shipping.country}
                    disabled 
                    style={{ background: 'rgba(255, 255, 255, 0.05)', cursor: 'not-allowed', color: 'var(--text-muted)' }}
                  />
                </div>
              </div>

              <div className="wizard-actions">
                <button type="button" className="btn btn-outline" onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Continue to Payment <Icons.ChevronRight size={16} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="checkout-form">
              <h3>Choose Payment Method</h3>
              
              {/* Indian Payment Tabs */}
              <div className="payment-tabs-container">
                <button 
                  className={`payment-tab-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <span className="pay-tab-title">⚡ UPI</span>
                  <span className="pay-tab-desc">GooglePay, PhonePe, Paytm</span>
                </button>
                <button 
                  className={`payment-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span className="pay-tab-title">💳 Card</span>
                  <span className="pay-tab-desc">RuPay, Visa, Mastercard</span>
                </button>
                <button 
                  className={`payment-tab-btn ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <span className="pay-tab-title">🏛️ Net Banking</span>
                  <span className="pay-tab-desc">State Bank, HDFC, ICICI</span>
                </button>
                <button 
                  className={`payment-tab-btn ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <span className="pay-tab-title">📦 COD</span>
                  <span className="pay-tab-desc">Cash / UPI on Delivery</span>
                </button>
              </div>

              <div className="payment-tab-content glass-card">
                
                {/* --- UPI PAYMENT INTERFACE (VPA / UPI ID) --- */}
                {paymentMethod === 'upi' && (
                  <div className="upi-payment-panel">
                    <p className="upi-instructions">
                      Enter your Virtual Payment Address (VPA) / UPI ID to receive a payment request on your UPI app:
                    </p>

                    <div className="vpa-input-group">
                      <input 
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setUpiVerified(false);
                        }}
                        placeholder="e.g. username@okhdfcbank or 9876543210@upi"
                        className={errors.upiId ? "input-error" : ""}
                      />
                      <button 
                        type="button" 
                        className={`btn ${upiVerified ? 'btn-success' : 'btn-secondary'}`}
                        onClick={handleVerifyUpi}
                        disabled={upiVerifying || !upiId.trim()}
                      >
                        {upiVerifying ? (
                          <span className="spinner-border" />
                        ) : upiVerified ? (
                          <>✓ Verified</>
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>

                    {/* Quick Handle Selection Pills */}
                    <div className="upi-handles-container">
                      <span className="upi-handles-label">Popular Handles:</span>
                      <div className="upi-handles-list">
                        {['@okhdfcbank', '@oksbi', '@paytm', '@ybl', '@okaxis', '@upi'].map((handle) => (
                          <button
                            key={handle}
                            type="button"
                            className="upi-handle-chip"
                            onClick={() => handleAppendUpiHandle(handle)}
                          >
                            {handle}
                          </button>
                        ))}
                      </div>
                    </div>

                    {errors.upiId && <span className="field-error" style={{ textAlign: 'center', display: 'block', marginTop: '6px' }}>{errors.upiId}</span>}

                    {upiVerified && (
                      <div className="upi-verified-badge">
                        <Icons.Check size={18} className="text-success" />
                        <span className="user-name-label">Verified VPA:</span> 
                        <strong className="glow-text">{upiId}</strong>
                        <span className="user-name-label">({shipping.fullName.toUpperCase()})</span>
                      </div>
                    )}

                    <div className="upi-amount-display" style={{ marginTop: '20px' }}>
                      <span>Amount to Pay:</span>
                      <strong className="glow-text">{formatINR(finalTotal)}</strong>
                    </div>

                    <div className="upi-apps-logos">
                      <span className="logo-pill inline-gpay">Google Pay</span>
                      <span className="logo-pill inline-phonepe">PhonePe</span>
                      <span className="logo-pill inline-paytm">Paytm</span>
                      <span className="logo-pill inline-bhim">BHIM UPI</span>
                      <span className="logo-pill inline-cred">CRED</span>
                    </div>

                    <p className="upi-note" style={{ marginTop: '14px' }}>
                      Upon clicking <strong>'Pay Now'</strong>, a collect request will be sent to your verified UPI app. Approve it within 5 minutes to complete your order.
                    </p>
                  </div>
                )}

                {/* --- CARD PAYMENT INTERFACE --- */}
                {paymentMethod === 'card' && (
                  <div className="card-payment-panel">
                    <div className="checkout-cc-preview glass-card">
                      <div className="cc-header">
                        <Icons.CreditCard size={32} />
                        {/* RuPay Local Integration Display */}
                        <span className="cc-brand glow-text">RuPay // Visa</span>
                      </div>
                      <div className="cc-number">
                        {payment.cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="cc-footer">
                        <div className="cc-holder">
                          <span className="cc-label">Card Holder</span>
                          <span className="cc-val">{payment.cardName.toUpperCase() || 'NAME SURNAME'}</span>
                        </div>
                        <div className="cc-expiry">
                          <span className="cc-label">Expires</span>
                          <span className="cc-val">{payment.expiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input 
                        type="text" 
                        value={payment.cardName} 
                        onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                        placeholder="e.g. Rohan Sharma"
                        required
                      />
                      {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                    </div>

                    <div className="form-group">
                      <label>Card Number</label>
                      <input 
                        type="text" 
                        value={payment.cardNumber} 
                        onChange={handleCardNumberChange}
                        placeholder="RuPay, Visa, Mastercard, or Maestro"
                        required
                      />
                      {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group flex-2">
                        <label>Expiry Date</label>
                        <input 
                          type="text" 
                          value={payment.expiry} 
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          required
                        />
                        {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                      </div>
                      <div className="form-group flex-1">
                        <label>CVV</label>
                        <input 
                          type="password" 
                          value={payment.cvv} 
                          onChange={handleCvvChange}
                          placeholder="123"
                          required
                        />
                        {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- NETBANKING INTERFACE --- */}
                {paymentMethod === 'netbanking' && (
                  <div className="netbanking-panel">
                    <p className="upi-instructions">Select your Bank from the popular choices below:</p>
                    <div className="banks-grid">
                      {[
                        { id: 'SBI', name: 'State Bank of India', code: 'SBI' },
                        { id: 'HDFC', name: 'HDFC Bank', code: 'HDFC' },
                        { id: 'ICICI', name: 'ICICI Bank', code: 'ICICI' },
                        { id: 'AXIS', name: 'Axis Bank', code: 'AXIS' },
                        { id: 'KOTAK', name: 'Kotak Bank', code: 'KOTAK' },
                        { id: 'PNB', name: 'Punjab National Bank', code: 'PNB' }
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          className={`bank-card-btn glass-card ${selectedBank === bank.id ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedBank(bank.id);
                            setErrors({ ...errors, bank: null });
                          }}
                        >
                          <div className="bank-logo-placeholder">{bank.code}</div>
                          <span className="bank-name-label">{bank.name}</span>
                        </button>
                      ))}
                    </div>
                    {errors.bank && <span className="field-error" style={{ display: 'block', marginTop: '16px' }}>{errors.bank}</span>}
                    {selectedBank && (
                      <p className="bank-redirect-note">You will be redirected to the secure login page of <strong>{selectedBank}</strong> to authorize your payment.</p>
                    )}
                  </div>
                )}

                {/* --- CASH ON DELIVERY INTERFACE --- */}
                {paymentMethod === 'cod' && (
                  <div className="cod-panel">
                    <div className="cod-info-box">
                      <Icons.Box size={24} className="cod-box-icon" />
                      <div className="cod-info-text">
                        <strong>Order Security verification Required</strong>
                        <p>To reduce fraud and ensure safe delivery, we verify all Cash on Delivery shipments with a rapid mobile verification OTP.</p>
                      </div>
                    </div>

                    {!codOtpSent ? (
                      <div className="cod-verification-trigger">
                        <p className="cod-prompt">Send a verification OTP to registered mobile: <strong>+91 {shipping.mobile}</strong></p>
                        <button 
                          type="button" 
                          className="btn btn-secondary" 
                          onClick={handleSendCodOtp}
                          disabled={codVerifying}
                        >
                          {codVerifying ? "Sending OTP..." : "Send Verification OTP"}
                        </button>
                      </div>
                    ) : (
                      <div className="cod-otp-input-area">
                        {codVerified ? (
                          <div className="cod-success-message">
                            <Icons.Check size={20} className="text-success" />
                            <span>Mobile Number Verified Successfully! You can now place your COD order.</span>
                          </div>
                        ) : (
                          <>
                            <p className="cod-prompt">Enter the 4-digit verification code sent to your phone:</p>
                            <div className="vpa-input-group">
                              <input 
                                type="text"
                                value={codOtpInput}
                                onChange={(e) => setCodOtpInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                placeholder="Enter 4-Digit OTP"
                                className="otp-digit-field"
                              />
                              <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={handleVerifyCodOtp}
                                disabled={codOtpInput.length !== 4}
                              >
                                Verify OTP
                              </button>
                            </div>
                            {errors.codOtp && <span className="field-error">{errors.codOtp}</span>}
                            <button 
                              type="button" 
                              className="btn-link-resend" 
                              onClick={handleSendCodOtp}
                              style={{ marginTop: '12px' }}
                            >
                              Resend Verification Code
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="wizard-actions">
                <button type="button" className="btn btn-outline" onClick={handleBackStep}>
                  Back to Shipping
                </button>
                <button type="submit" className="btn btn-primary btn-pay-now" onClick={handleNextStep}>
                  <span>
                    {paymentMethod === 'cod' ? "Place COD Order" : `Pay Now (${formatINR(finalTotal)})`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="order-confirmation-pane">
              <div className="success-icon-wrapper">
                <div className="success-circle">
                  <Icons.Check size={48} className="success-checkmark" />
                </div>
              </div>
              
              <h3 className="glow-text">Order Placed Successfully!</h3>
              <p className="order-subtitle">Thank you for shopping. Your invoice has been processed securely.</p>

              <div className="confirmation-details-box glass-card">
                <div className="detail-line">
                  <span className="lbl">Tracking ID:</span>
                  <strong className="val glow-text">{trackingNumber}</strong>
                </div>
                <div className="detail-line">
                  <span className="lbl">Logistics Partner:</span>
                  <strong className="val">{selectedPartner}</strong>
                </div>
                <div className="detail-line">
                  <span className="lbl">Estimated Delivery:</span>
                  <strong className="val">{deliveryString}</strong>
                </div>
                <div className="detail-line">
                  <span className="lbl">Payment Mode:</span>
                  <strong className="val text-capitalize">
                    {paymentMethod === 'upi' ? `UPI VPA (${upiId || 'Verified'})` : 
                     paymentMethod === 'card' ? 'Credit/Debit Card' : 
                     paymentMethod === 'netbanking' ? `${selectedBank} Net Banking` : 
                     'Cash On Delivery (Verified)'}
                  </strong>
                </div>
                <div className="detail-line" style={{ borderTop: '1px dashed var(--border-glass)', paddingTop: '10px', marginTop: '5px' }}>
                  <span className="lbl">Ship To:</span>
                  <span className="val text-right">
                    <strong>{shipping.fullName}</strong><br />
                    {shipping.address}, {shipping.city}, {shipping.state} - {shipping.pinCode}<br />
                    Contact: +91 {shipping.mobile}
                  </span>
                </div>
              </div>

              <p className="delivery-note">
                Updates will be sent to <strong className="glow-text">{shipping.email}</strong> and SMS updates to <strong className="glow-text">+91 {shipping.mobile}</strong>.
              </p>
              
              <button 
                type="button" 
                className="btn btn-primary btn-block"
                onClick={() => onOrderCompleted()}
              >
                Return to Shop Catalog
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Panel (Hidden in Step 3 confirmation) */}
        {step < 3 && (
          <div className="wizard-summary-panel glass-card">
            <h3>Order Summary</h3>
            <div className="summary-items-list">
              {cartItems.map((item) => (
                <div key={item.cartId} className="summary-item">
                  <img src={item.image} alt={item.name} className="summary-item-img" />
                  <div className="summary-item-info">
                    <span className="summary-item-title">{item.name}</span>
                    <span className="summary-item-meta">{item.selectedColor} | {item.selectedOption}</span>
                    <span className="summary-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="summary-item-price">{formatINR((item.configuredPrice || item.price) * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(cartTotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row promo-discount-row">
                  <span>Promo Discount</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="summary-row">
                <span>Estimated GST (18%)</span>
                <span>{formatINR(Math.round((cartTotal - discountAmount) * 0.18))}</span>
              </div>
              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span className="glow-text">{formatINR(finalTotal)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
