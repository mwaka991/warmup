import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!displayName.trim()) {
      setDisplayName(email.split('@')[0]); // Use email prefix if no name provided
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set the display name for the user profile
      await updateProfile(userCredential.user, {
        displayName: displayName.trim()
      });
      
      console.log("Account created with display name:", displayName);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join SirTheProgrammer Chat Space today</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input 
              type="text" 
              id="displayName"
              value={displayName}
              placeholder="Enter your display name" 
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <small className="form-help">This will be shown with your messages and avatar</small>
          </div>
          
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
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              placeholder="Create a password" 
              onChange={(e) => setPassword(e.target.value)}
              required 
              minLength="6"
            />
            <small className="form-help">Password must be at least 6 characters</small>
          </div>
          
          <button type="submit" className="signup-button">Create Account</button>
        </form>
        
        <p className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <p className="home-link">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
