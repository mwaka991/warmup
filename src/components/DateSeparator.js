import React from 'react';
import './DateSeparator.css';

/**
 * DateSeparator component - adds a decorative line with date text between messages
 * from different days to visually separate conversations
 */
const DateSeparator = ({ date }) => {
  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Format for today, yesterday, or full date
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="date-separator">
      <span className="date-separator-text">{formatDate(date)}</span>
    </div>
  );
};

export default DateSeparator; 