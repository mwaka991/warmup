import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ThemeProvider } from './themes/ThemeContext';
import './App.css';

// Import pages
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './pages/signup';
import ChatRoom from './pages/chatroom';
import Admin from './pages/admin';
import ThemeManager from './components/ThemeManager';
import Profile from './pages/profile';
import ResetPassword from './pages/ResetPassword';

// Import components
import Navigation from './components/Navigation';
import ThemeDecorator from './components/ThemeDecorator';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed", currentUser ? currentUser.email : "logged out");
      setUser(currentUser);
      setLoading(false);
      setAuthInitialized(true);
    }, (error) => {
      console.error("Auth error:", error);
      setLoading(false);
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Debug user state
  console.log("Current user state:", user ? `Logged in as ${user.email}` : "Not logged in");

  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <ThemeDecorator />
          <div className="app">
            <Navigation user={user} />
            <main className="main-content">
              {authInitialized ? (
                <Routes>
                  <Route path="/" element={<Home user={user} />} />
                  <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                  <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                  <Route path="/chat" element={<ChatRoom />} />
                  <Route path="/admin" element={user ? <Admin user={user} /> : <Navigate to="/login" />} />
                  <Route path="/theme" element={<ThemeManager />} />
                  <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
              ) : (
                <div className="auth-initializing">Preparing application...</div>
              )}
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
