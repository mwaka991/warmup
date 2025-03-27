import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // If the user doesn't have a display name, set one based on their email
      if (!userCredential.user.displayName) {
        const displayName = email.split('@')[0]; // Use the part before @ as display name
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
        console.log("Display name set to:", displayName);
      }
      
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to join SirTheProgrammer Chat Space</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
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
              placeholder="Enter your password" 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="login-button">Sign In</button>
        </form>
        
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className="home-link">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
