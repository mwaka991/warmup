import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AdminIcon, SignoutIcon, ChatIcon, ThemeIcon } from './AppIcons';
import SimplifiedAvatar from './SimplifiedAvatar';
import './Navigation.css';

const Navigation = ({ user }) => {
  const navigate = useNavigate();

  // Log for debugging
  useEffect(() => {
    console.log("Navigation rendered with user:", user ? `${user.uid} (${user.email})` : "Not logged in");
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <ChatIcon className="navbar-icon" />
          <span>SirTheProgrammer Chat</span>
        </Link>
      </div>
      
      <div className="navbar-menu">
        {user ? (
          // Only show these links when user IS logged in
          <>
            <Link to="/chat" className="navbar-item">
              <ChatIcon className="navbar-icon" />
              <span>Chat</span>
            </Link>
            
            <Link to="/profile" className="navbar-item profile-item">
              <SimplifiedAvatar uid={user.uid} className="navbar-avatar avatar-small" />
              <span className="profile-text">My Profile</span>
            </Link>
            
            <Link to="/admin" className="navbar-item">
              <AdminIcon className="navbar-icon" />
              <span>Admin</span>
            </Link>
            
            <Link to="/theme" className="navbar-item">
              <ThemeIcon className="navbar-icon" />
              <span>Theme</span>
            </Link>
            
            <button onClick={handleSignOut} className="navbar-item logout-button">
              <SignoutIcon className="navbar-icon" />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          // Only show these links when user is NOT logged in
          <>
            <Link to="/theme" className="navbar-item">
              <ThemeIcon className="navbar-icon" />
              <span>Theme</span>
            </Link>
            
            <Link to="/login" className="navbar-item auth-button login-button">
              <span>Sign In</span>
            </Link>
            
            <Link to="/signup" className="navbar-item auth-button signup-button">
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 