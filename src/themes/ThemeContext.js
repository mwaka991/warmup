import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import themes, { getThemeById } from './themeConfig';

// Create the Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? getThemeById(savedTheme) : themes.classic;
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is admin (simple check - you would implement more robust admin checks in production)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // This is a simplified admin check - in a real app, you'd check against an admins collection
      if (user) {
        console.log("User authenticated:", user.email);
        // For demo purposes, any logged-in user is considered admin
        // In a real app, you'd check a user's role in Firestore
        setIsAdmin(true);
      } else {
        console.log("No user authenticated");
        setIsAdmin(false);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Make sure the settings collection exists
  useEffect(() => {
    const ensureSettingsCollection = async () => {
      try {
        // Try to get the theme document to see if it exists
        const themeDoc = await getDoc(doc(db, 'settings', 'theme'));
        
        if (!themeDoc.exists()) {
          console.log("Theme document doesn't exist, creating it");
          // Create the settings collection and theme document if it doesn't exist
          await setDoc(doc(db, 'settings', 'theme'), {
            themeId: 'classic',
            lastUpdated: new Date(),
            updatedBy: 'system'
          });
          console.log("Theme document created successfully");
        }
      } catch (error) {
        console.error("Error ensuring settings collection:", error);
        setError("Failed to initialize theme settings");
      }
    };
    
    ensureSettingsCollection();
  }, []);

  // Load the current theme from Firestore
  useEffect(() => {
    const fetchCurrentTheme = async () => {
      try {
        console.log("Fetching current theme from Firestore");
        const themeDoc = await getDoc(doc(db, 'settings', 'theme'));
        
        if (themeDoc.exists()) {
          const themeData = themeDoc.data();
          console.log("Theme document found:", themeData);
          
          const fetchedTheme = getThemeById(themeData.themeId);
          console.log("Setting theme to:", fetchedTheme.name);
          setCurrentTheme(fetchedTheme);
        } else {
          console.log("Theme document not found, setting default");
          // If no theme is set in Firestore, set the default theme
          await setDoc(doc(db, 'settings', 'theme'), {
            themeId: 'classic',
            lastUpdated: new Date(),
            updatedBy: 'system'
          });
          setCurrentTheme(themes.classic);
          console.log("Default theme set to Classic Blue");
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
        setError("Failed to fetch theme from database");
        setCurrentTheme(themes.classic); // Fallback to classic theme
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentTheme();
  }, []);

  // Function to change the theme (admin only)
  const changeTheme = async (themeId) => {
    console.log("Changing theme to:", themeId);
    console.log("Is user admin?", isAdmin);
    
    if (!isAdmin) {
      console.error('Only admins can change the theme');
      setError("Permission denied: Only admins can change the theme");
      return false;
    }

    if (!themes[themeId]) {
      console.error(`Theme with ID ${themeId} not found`);
      setError(`Theme with ID ${themeId} not found`);
      return false;
    }

    try {
      const newTheme = getThemeById(themeId);
      console.log("New theme:", newTheme.name);
      
      // Update Firestore
      console.log("Updating Firestore with new theme");
      await setDoc(doc(db, 'settings', 'theme'), {
        themeId: themeId,
        lastUpdated: new Date(),
        updatedBy: auth.currentUser ? auth.currentUser.uid : 'unknown'
      });
      
      console.log("Firestore updated successfully");
      
      // Update local state
      setCurrentTheme(newTheme);
      console.log("Local state updated with new theme");
      localStorage.setItem('theme', themeId);
      return true;
    } catch (error) {
      console.error('Error changing theme:', error);
      setError(`Error changing theme: ${error.message}`);
      return false;
    }
  };

  // Apply theme to root element
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply fonts
    Object.entries(currentTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    // Apply border radius
    Object.entries(currentTheme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // Apply shadows
    Object.entries(currentTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }, [currentTheme]);

  // Generate decorative background pattern CSS based on theme
  const generateBackgroundPattern = (theme) => {
    if (!theme) return '';
    
    const colors = theme.colors || {};
    let patternCSS = '';
    
    switch(theme.id) {
      case 'light':
        // Light theme - subtle grid pattern
        patternCSS = `
          background-color: ${colors.background};
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.8) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center center;
        `;
        break;
      
      case 'dark':
        // Dark theme - subtle dot pattern
        patternCSS = `
          background-color: ${colors.background};
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center center;
        `;
        break;
      
      case 'pastel':
        // Pastel theme - diagonal lines
        patternCSS = `
          background-color: ${colors.background};
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.4) 10px,
            rgba(255, 255, 255, 0) 10px,
            rgba(255, 255, 255, 0) 20px
          );
        `;
        break;
        
      case 'coffee':
        // Coffee theme - coffee bean inspired pattern
        patternCSS = `
          background-color: ${colors.background};
          background-image: 
            radial-gradient(rgba(83, 58, 33, 0.1) 15%, transparent 16%),
            radial-gradient(rgba(83, 58, 33, 0.1) 15%, transparent 16%);
          background-size: 30px 30px;
          background-position: 0 0, 15px 15px;
        `;
        break;
        
      default:
        // Default - subtle pattern
        patternCSS = `background-color: ${colors.background};`;
    }
    
    return patternCSS;
  };

  // Generate CSS variables for the current theme
  const generateThemeCSS = () => {
    if (!currentTheme) return '';
    
    // Safe access theme properties with defaults
    const typography = currentTheme.typography || {};
    const colors = currentTheme.colors || {};
    const shape = currentTheme.shape || {};
    
    // Generate background pattern
    const backgroundPattern = generateBackgroundPattern(currentTheme);
    
    return `
      :root {
        /* Typography */
        --font-main: ${typography.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
        --font-heading: ${typography.headingFontFamily || typography.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
        --font-mono: ${typography.monoFontFamily || "'Courier New', monospace"};
        --font-size: ${typography.fontSize || '16px'};
        --heading-1: ${typography.h1 || '2rem'};
        --heading-2: ${typography.h2 || '1.75rem'};
        --heading-3: ${typography.h3 || '1.5rem'};
        --heading-4: ${typography.h4 || '1.25rem'};
        
        /* Colors */
        --color-primary: ${colors.primary || '#4a90e2'};
        --color-secondary: ${colors.secondary || '#3a7bc8'};
        --color-accent: ${colors.accent || '#f1c40f'};
        --color-background: ${colors.background || '#f5f7fa'};
        --color-surface: ${colors.surface || '#ffffff'};
        --color-error: ${colors.error || '#e74c3c'};
        --color-success: ${colors.success || '#2ecc71'};
        --color-warning: ${colors.warning || '#f39c12'};
        --color-text: ${colors.text || '#333333'};
        --color-textLight: ${colors.textLight || '#7f8c8d'};
        --color-divider: ${colors.divider || '#e1e4e8'};
        --color-cardBackground: ${colors.cardBackground || '#ffffff'};
        
        /* Message colors */
        --color-ownMessageBg: ${colors.ownMessageBg || '#4caf50'};
        --color-ownMessageText: ${colors.ownMessageText || '#ffffff'};
        --color-ownMessageAuthor: ${colors.ownMessageAuthor || '#ffffff'};
        --color-ownMessageTime: ${colors.ownMessageTime || 'rgba(255, 255, 255, 0.9)'};
        --color-otherMessageBg: ${colors.otherMessageBg || '#f1f0f0'};
        --color-otherMessageText: ${colors.otherMessageText || '#333333'};
        --color-otherMessageAuthor: ${colors.otherMessageAuthor || '#555555'};
        --color-otherMessageTime: ${colors.otherMessageTime || '#888888'};
        
        /* Shape */
        --radius-small: ${shape.borderRadiusSmall || '4px'};
        --radius-medium: ${shape.borderRadiusMedium || '8px'};
        --radius-large: ${shape.borderRadiusLarge || '12px'};
        --radius-xl: ${shape.borderRadiusXL || '20px'};
        
        /* Shadows */
        --shadow-small: ${shape.shadowSmall || '0 2px 5px rgba(0, 0, 0, 0.1)'};
        --shadow-medium: ${shape.shadowMedium || '0 5px 15px rgba(0, 0, 0, 0.1)'};
        --shadow-large: ${shape.shadowLarge || '0 10px 25px rgba(0, 0, 0, 0.15)'};
        
        /* Background Pattern */
        --bg-pattern: ${backgroundPattern};
      }
      
      body {
        ${backgroundPattern}
        transition: background-color 0.3s ease;
      }
    `;
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme, 
        changeTheme, 
        isAdmin, 
        loading,
        themes,
        generateThemeCSS,
        error
      }}
    >
      {loading ? (
        <div className="theme-loading">Loading theme...</div>
      ) : (
        <>
          <style>{generateThemeCSS()}</style>
          {children}
        </>
      )}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 