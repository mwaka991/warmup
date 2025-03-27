import React, { useEffect, useState } from 'react';
import './MessageBubble.css';
import { avatarSamples } from '../utils/avatarSamples';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTheme } from '../themes/ThemeContext';
import { Icon, ICON_TYPES } from '../components/IconLibrary';

// Simple function to format time relative to now
const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  // Fallback to regular date
  return date.toLocaleString();
};

const MessageBubble = ({ 
  message, 
  isOwnMessage, 
  user = {}, 
  className = '', 
  onReply,
  isReplied = false
}) => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  
  // Fetch user profile for avatar
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!message.uid) return;
      
      try {
        setLoading(true);
        const userDoc = await getDoc(doc(db, 'userProfiles', message.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.avatarId) {
            setAvatar(userData.avatarId);
          } else {
            setAvatar('default_avatar');
          }
        } else {
          setAvatar('default_avatar');
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setAvatar('default_avatar');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [message.uid]);
  
  // Format message time
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle reply click
  const handleReply = (e) => {
    e.stopPropagation();
    if (onReply) {
      onReply(message);
    }
  };
  
  // Add the replied class if this message is being replied to
  const containerClass = `message-container ${isOwnMessage ? 'own-message' : 'other-message'} ${isReplied ? 'replied-message' : ''} ${className}`;
  
  return (
    <div className={containerClass}>
      <div className="message-avatar-container">
        {loading ? (
          <div className="message-avatar-loading"></div>
        ) : (
          <img 
            src={process.env.PUBLIC_URL + `/avatars/${avatar}.png`}
            alt={message.displayName || "User"}
            className="message-avatar"
            onError={(e) => {
              console.warn(`Failed to load avatar image: ${avatar}`);
              e.target.src = process.env.PUBLIC_URL + '/avatars/default_avatar.png';
            }}
          />
        )}
      </div>
      
      <div className="message-content">
        {!isOwnMessage && (
          <div className="message-author">{message.displayName || 'Anonymous'}</div>
        )}
        
        {/* Display reply context if message is a reply */}
        {message.replyTo && (
          <div className="reply-indicator">
            <span className="reply-to">↩ {message.replyToName || 'Someone'}: </span>
            <span className="reply-text">{message.replyToText || ''}</span>
          </div>
        )}
        
        <div className="message-text">{message.text}</div>
        <div className="message-time">{formatTime(message.createdAt)}</div>
        
        {/* Reply button */}
        <div className="message-actions">
          <button 
            className="action-button"
            onClick={handleReply}
            aria-label="Reply to message"
          >
            <Icon type={ICON_TYPES.REPLY} size="tiny" />
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble; 