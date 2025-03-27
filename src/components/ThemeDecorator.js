import React from 'react';
import { useTheme } from '../themes/ThemeContext';
import { useLocation } from 'react-router-dom';
import './ThemeDecorator.css';

/**
 * ThemeDecorator component adds theme-specific decorative elements to the background
 * These are purely visual and add character to each theme
 */
const ThemeDecorator = () => {
  const { currentTheme } = useTheme();
  const themeId = currentTheme?.id || 'light';
  const location = useLocation();
  
  // Only show decorations in chat page
  const isChatPage = location?.pathname === '/chat';
  
  // Don't render decorations if not on the chat page
  if (!isChatPage) {
    return null;
  }
  
  // Different decorative elements based on the theme
  const renderDecorations = () => {
    switch(themeId) {
      case 'light':
        return (
          <>
            <div className="decorator-element circle-1"></div>
            <div className="decorator-element circle-2"></div>
            <div className="decorator-element square-1"></div>
            <div className="decorator-element square-2"></div>
          </>
        );
      
      case 'dark':
        return (
          <>
            <div className="decorator-element star-1"></div>
            <div className="decorator-element star-2"></div>
            <div className="decorator-element star-3"></div>
            <div className="decorator-element line-1"></div>
            <div className="decorator-element line-2"></div>
          </>
        );
      
      case 'pastel':
        return (
          <>
            <div className="decorator-element blob-1"></div>
            <div className="decorator-element blob-2"></div>
            <div className="decorator-element blob-3"></div>
            <div className="decorator-element dot-grid"></div>
          </>
        );
      
      case 'coffee':
        return (
          <>
            <div className="decorator-element coffee-bean-1"></div>
            <div className="decorator-element coffee-bean-2"></div>
            <div className="decorator-element coffee-bean-3"></div>
            <div className="decorator-element coffee-stain"></div>
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className={`theme-decorator theme-${themeId} chat-only-decorator`}>
      {renderDecorations()}
    </div>
  );
};

export default ThemeDecorator; 