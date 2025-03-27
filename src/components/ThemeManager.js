import React, { useState } from 'react';
import { useTheme } from '../themes/ThemeContext';
import './ThemeManager.css';

const ThemeManager = () => {
  const { currentTheme, changeTheme, themes, isAdmin } = useTheme();
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedTheme, setSelectedTheme] = useState(currentTheme.id);
  const [message, setMessage] = useState(null);

  const handleThemeChange = async (themeId) => {
    setSelectedTheme(themeId);
  };

  const handleSaveTheme = async () => {
    if (!isAdmin) {
      setMessage({
        type: 'error',
        text: 'Only administrators can change the application theme.'
      });
      return;
    }

    try {
      const success = await changeTheme(selectedTheme);
      
      if (success) {
        setMessage({
          type: 'success',
          text: `Theme updated to ${themes[selectedTheme].name} successfully!`
        });
      } else {
        setMessage({
          type: 'error',
          text: 'Failed to update theme. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error saving theme:', error);
      setMessage({
        type: 'error',
        text: `Error: ${error.message}`
      });
    }
  };

  return (
    <div className="theme-manager-container">
      <h2>Theme Manager</h2>
      
      {message && (
        <div className={`theme-message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="theme-tabs">
        <button 
          className={`theme-tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button 
          className={`theme-tab ${activeTab === 'selection' ? 'active' : ''}`}
          onClick={() => setActiveTab('selection')}
        >
          Theme Selection
        </button>
      </div>
      
      {activeTab === 'preview' && (
        <div className="theme-preview">
          <h3>Current Theme: {currentTheme.name}</h3>
          <p className="theme-description">{currentTheme.description}</p>
          
          <div className="preview-elements">
            <div className="preview-section">
              <h4>Colors</h4>
              <div className="color-samples">
                {Object.entries(currentTheme.colors)
                  .filter(([key]) => ['primary', 'secondary', 'accent', 'background', 'text', 'ownMessage', 'otherMessage', 'error', 'success', 'warning', 'info'].includes(key))
                  .map(([key, value]) => (
                    <div className="color-sample" key={key}>
                      <div 
                        className="color-box" 
                        style={{ backgroundColor: value }}
                      ></div>
                      <div className="color-name">{key}</div>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div className="preview-section">
              <h4>Typography</h4>
              <div className="typography-samples">
                <p className="font-sample heading-font" style={{ fontFamily: currentTheme.fonts.heading }}>
                  Heading Font: {currentTheme.fonts.heading}
                </p>
                <p className="font-sample body-font" style={{ fontFamily: currentTheme.fonts.main }}>
                  Body Font: {currentTheme.fonts.main}
                </p>
                <p className="font-sample mono-font" style={{ fontFamily: currentTheme.fonts.monospace }}>
                  Monospace: {currentTheme.fonts.monospace}
                </p>
              </div>
            </div>
            
            <div className="preview-section">
              <h4>Components</h4>
              <div className="component-samples">
                <div className="message-sample own-message">
                  <div className="message-avatar" style={{ backgroundColor: currentTheme.colors.primary }}></div>
                  <div className="message-content" style={{ backgroundColor: currentTheme.colors.ownMessage, color: currentTheme.colors.ownMessageText }}>
                    <div className="message-sender">You</div>
                    <div className="message-text">This is how your messages look</div>
                  </div>
                </div>
                
                <div className="message-sample other-message">
                  <div className="message-avatar" style={{ backgroundColor: currentTheme.colors.secondary }}></div>
                  <div className="message-content" style={{ backgroundColor: currentTheme.colors.otherMessage, color: currentTheme.colors.otherMessageText }}>
                    <div className="message-sender">Other User</div>
                    <div className="message-text">This is how others' messages look</div>
                  </div>
                </div>
                
                <button className="button-sample primary-button" 
                  style={{ 
                    backgroundColor: currentTheme.colors.primary,
                    color: currentTheme.colors.light || '#fff',
                    borderRadius: currentTheme.borderRadius.medium
                  }}
                >
                  Primary Button
                </button>
                
                <button className="button-sample secondary-button"
                  style={{ 
                    backgroundColor: currentTheme.colors.secondary,
                    color: currentTheme.colors.light || '#fff',
                    borderRadius: currentTheme.borderRadius.medium
                  }}
                >
                  Secondary Button
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'selection' && (
        <div className="theme-selection">
          <h3>Select a Theme</h3>
          
          <div className="themes-grid">
            {Object.values(themes).map((theme) => (
              <div 
                key={theme.id}
                className={`theme-card ${selectedTheme === theme.id ? 'selected' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
                style={{ 
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.id === selectedTheme ? `${theme.colors.background}` : 'transparent'
                }}
              >
                <div className="theme-card-header" style={{ backgroundColor: theme.colors.primary }}>
                  <h4 style={{ color: theme.colors.light || '#fff' }}>{theme.name}</h4>
                </div>
                <div className="theme-card-body">
                  <p>{theme.description}</p>
                  <div className="theme-color-preview">
                    <div className="color-dot" style={{ backgroundColor: theme.colors.primary }}></div>
                    <div className="color-dot" style={{ backgroundColor: theme.colors.secondary }}></div>
                    <div className="color-dot" style={{ backgroundColor: theme.colors.accent }}></div>
                    <div className="color-dot" style={{ backgroundColor: theme.colors.background }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="theme-selection-actions">
            <button 
              className="apply-theme-button"
              onClick={handleSaveTheme}
              disabled={!isAdmin || selectedTheme === currentTheme.id}
            >
              {isAdmin ? 'Apply Selected Theme' : 'Admin Access Required'}
            </button>
            {!isAdmin && (
              <p className="admin-note">Note: Only administrators can change themes.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeManager; 