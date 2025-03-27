import React from 'react';
import './TypingIndicator.css';

const TypingIndicator = ({ user }) => {
  return (
    <div className="typing-indicator-container">
      <div className="typing-avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
      </div>
      <div className="typing-bubble">
        <span className="typing-user">{user || 'Someone'}</span> is typing
        <span className="typing-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator; 