import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './login.css'; // Reuse login styles

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Reset Password</h2>
        <p className="login-subtitle">Enter your email to receive a password reset link</p>
        
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message" style={{
          backgroundColor: '#e0f7fa',
          color: '#00838f',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '20px',
        }}>{message}</div>}
        
        <form onSubmit={handleResetPassword} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              placeholder="Enter your email" 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <p className="signup-link">
          Remember your password? <Link to="/login">Sign in</Link>
        </p>
        <p className="home-link">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword; 