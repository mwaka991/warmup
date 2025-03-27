// Theme configuration file with 10 distinctive themes for SirTheProgrammer Chat Space
// Each theme includes colors, fonts, and icon styles

const themes = {
  classic: {
    id: "classic",
    name: "Classic Blue",
    description: "The original SirTheProgrammer theme with calming blue tones",
    colors: {
      primary: "#4a90e2",
      secondary: "#3a7bc8",
      accent: "#2c3e50",
      background: "#f5f7fa",
      cardBackground: "#ffffff",
      text: "#333333",
      textSecondary: "#7f8c8d",
      ownMessage: "#4a90e2",
      ownMessageText: "#ffffff",
      otherMessage: "#ffffff",
      otherMessageText: "#333333",
      error: "#e74c3c",
      success: "#27ae60",
      warning: "#f39c12",
      info: "#3498db",
      divider: "#e1e4e8",
      iconPrimary: "#4a90e2",
      iconSecondary: "#7f8c8d"
    },
    fonts: {
      main: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      heading: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      monospace: "monospace"
    },
    borderRadius: {
      small: "4px",
      medium: "8px",
      large: "16px",
      circle: "50%"
    },
    iconSet: "feather",
    shadows: {
      small: "0 2px 5px rgba(0, 0, 0, 0.05)",
      medium: "0 5px 15px rgba(0, 0, 0, 0.1)",
      large: "0 8px 30px rgba(0, 0, 0, 0.15)"
    }
  },
  
  darkMode: {
    id: "darkMode",
    name: "Dark Mode",
    description: "A sleek dark theme that's easy on the eyes for night chatting",
    colors: {
      primary: "#6c5ce7",
      secondary: "#5b4cc4",
      accent: "#a29bfe",
      background: "#1a1a2e",
      cardBackground: "#252541",
      text: "#e4e4e4",
      textSecondary: "#b2b2b2",
      ownMessage: "#6c5ce7",
      ownMessageText: "#ffffff",
      otherMessage: "#302e53",
      otherMessageText: "#e4e4e4",
      error: "#ff6b6b",
      success: "#1dd1a1",
      warning: "#feca57",
      info: "#54a0ff",
      divider: "#2d2d44",
      iconPrimary: "#6c5ce7",
      iconSecondary: "#b2b2b2"
    },
    fonts: {
      main: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      heading: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      monospace: "monospace"
    },
    borderRadius: {
      small: "4px",
      medium: "8px",
      large: "16px",
      circle: "50%"
    },
    iconSet: "feather-bold",
    shadows: {
      small: "0 2px 5px rgba(0, 0, 0, 0.2)",
      medium: "0 5px 15px rgba(0, 0, 0, 0.3)",
      large: "0 8px 30px rgba(0, 0, 0, 0.4)"
    }
  },
  
  forest: {
    id: "forest",
    name: "Forest Green",
    description: "Natural tones inspired by lush forests and earthy elements",
    colors: {
      primary: "#2ecc71",
      secondary: "#27ae60",
      accent: "#345f41",
      background: "#f4f9f4",
      cardBackground: "#ffffff",
      text: "#2c3e50",
      textSecondary: "#7f8c8d",
      ownMessage: "#2ecc71",
      ownMessageText: "#ffffff",
      otherMessage: "#ffffff",
      otherMessageText: "#2c3e50",
      error: "#e74c3c",
      success: "#27ae60",
      warning: "#f39c12",
      info: "#3498db",
      divider: "#e8f5e9",
      iconPrimary: "#2ecc71",
      iconSecondary: "#7f8c8d"
    },
    fonts: {
      main: "'Nunito', sans-serif",
      heading: "'Nunito', sans-serif",
      monospace: "monospace"
    },
    borderRadius: {
      small: "6px",
      medium: "12px",
      large: "24px",
      circle: "50%"
    },
    iconSet: "phosphor",
    shadows: {
      small: "0 2px 5px rgba(46, 204, 113, 0.1)",
      medium: "0 5px 15px rgba(46, 204, 113, 0.15)",
      large: "0 8px 30px rgba(46, 204, 113, 0.2)"
    }
  },
  
  sunset: {
    id: "sunset",
    name: "Sunset Orange",
    description: "Warm sunset tones that create a friendly, inviting atmosphere",
    colors: {
      primary: "#f39c12",
      secondary: "#e67e22",
      accent: "#d35400",
      background: "#fef9f3",
      cardBackground: "#ffffff",
      text: "#34495e",
      textSecondary: "#7f8c8d",
      ownMessage: "#f39c12",
      ownMessageText: "#ffffff",
      otherMessage: "#ffffff",
      otherMessageText: "#34495e",
      error: "#e74c3c",
      success: "#27ae60",
      warning: "#f39c12",
      info: "#3498db",
      divider: "#fdebd0",
      iconPrimary: "#f39c12",
      iconSecondary: "#7f8c8d"
    },
    fonts: {
      main: "'Quicksand', sans-serif",
      heading: "'Quicksand', sans-serif",
      monospace: "monospace"
    },
    borderRadius: {
      small: "8px",
      medium: "16px",
      large: "24px",
      circle: "50%"
    },
    iconSet: "lucide",
    shadows: {
      small: "0 2px 5px rgba(243, 156, 18, 0.1)",
      medium: "0 5px 15px rgba(243, 156, 18, 0.15)",
      large: "0 8px 30px rgba(243, 156, 18, 0.2)"
    }
  },
  
  lavender: {
    id: "lavender",
    name: "Lavender Dream",
    description: "Soft purple tones creating a soothing and dreamy atmosphere",
    colors: {
      primary: "#9b59b6",
      secondary: "#8e44ad",
      accent: "#673ab7",
      background: "#f8f5fd",
      cardBackground: "#ffffff",
      text: "#34495e",
      textSecondary: "#7f8c8d",
      ownMessage: "#9b59b6",
      ownMessageText: "#ffffff",
      otherMessage: "#ffffff",
      otherMessageText: "#34495e",
      error: "#e74c3c",
      success: "#27ae60",
      warning: "#f39c12",
      info: "#3498db",
      divider: "#ede7f6",
      iconPrimary: "#9b59b6",
      iconSecondary: "#7f8c8d"
    },
    fonts: {
      main: "'Comfortaa', cursive",
      heading: "'Comfortaa', cursive",
      monospace: "monospace"
    },
    borderRadius: {
      small: "12px",
      medium: "20px",
      large: "30px",
      circle: "50%"
    },
    iconSet: "tabler",
    shadows: {
      small: "0 2px 5px rgba(155, 89, 182, 0.1)",
      medium: "0 5px 15px rgba(155, 89, 182, 0.15)",
      large: "0 8px 30px rgba(155, 89, 182, 0.2)"
    }
  },
  
  oceanic: {
    id: "oceanic",
    name: "Oceanic Blue",
    description: "Deep blue tones inspired by the ocean depths",
    colors: {
      primary: "#1abc9c",
      secondary: "#16a085",
      accent: "#2980b9",
      background: "#ecf9f7",
      cardBackground: "#ffffff",
      text: "#2c3e50",
      textSecondary: "#7f8c8d",
      ownMessage: "#1abc9c",
      ownMessageText: "#ffffff",
      otherMessage: "#ffffff",
      otherMessageText: "#2c3e50",
      error: "#e74c3c",
      success: "#27ae60",
      warning: "#f39c12",
      info: "#3498db",
      divider: "#e0f2f1",
      iconPrimary: "#1abc9c",
      iconSecondary: "#7f8c8d"
    },
    fonts: {
      main: "'Montserrat', sans-serif",
      heading: "'Montserrat', sans-serif",
      monospace: "monospace"
    },
    borderRadius: {
      small: "4px",
      medium: "8px",
      large: "12px",
      circle: "50%"
    },
    iconSet: "heroicons",
    shadows: {
      small: "0 2px 5px rgba(26, 188, 156, 0.1)",
      medium: "0 5px 15px rgba(26, 188, 156, 0.15)",
      large: "0 8px 30px rgba(26, 188, 156, 0.2)"
    }
  },
  
  cherry: {
    id: "cherry",
    name: "Cherry Blossom",
    description: "Delicate pink tones inspired by Japanese cherry blossoms",
    colors: {
      primary: "#e84393",
      secondary: "#fd79a8",
      accent: "#e84393",
      background: "#fff5f8",
      cardBackground: "#ffffff",
      text: "#2d3436",
      textSecondary: "#636e72",
      ownMessage: "#e84393",
      ownMessageText: "#ffffff",
      otherMessage: "#ffffff",
      otherMessageText: "#2d3436",
      error: "#d63031",
      success: "#00b894",
      warning: "#fdcb6e",
      info: "#0984e3",
      divider: "#fce4ec",
      iconPrimary: "#e84393",
      iconSecondary: "#636e72"
    },
    fonts: {
      main: "'Josefin Sans', sans-serif",
      heading: "'Josefin Sans', sans-serif",
      monospace: "monospace"
    },
    borderRadius: {
      small: "12px",
      medium: "24px",
      large: "36px",
      circle: "50%"
    },
    iconSet: "fluent",
    shadows: {
      small: "0 2px 5px rgba(232, 67, 147, 0.1)",
      medium: "0 5px 15px rgba(232, 67, 147, 0.15)",
      large: "0 8px 30px rgba(232, 67, 147, 0.2)"
    }
  },
  
  nordic: {
    id: "nordic",
    name: "Nordic Frost",
    description: "Minimalist design with cool blue-gray tones inspired by Scandinavian design",
    colors: {
      primary: "#81a1c1",
      secondary: "#5e81ac",
      accent: "#88c0d0",
      background: "#eceff4",
      cardBackground: "#ffffff",
      text: "#2e3440",
      textSecondary: "#4c566a",
      ownMessage: "#81a1c1",
      ownMessageText: "#ffffff",
      otherMessage: "#ffffff",
      otherMessageText: "#2e3440",
      error: "#bf616a",
      success: "#a3be8c",
      warning: "#ebcb8b",
      info: "#88c0d0",
      divider: "#e5e9f0",
      iconPrimary: "#81a1c1",
      iconSecondary: "#4c566a"
    },
    fonts: {
      main: "'Inter', sans-serif",
      heading: "'Inter', sans-serif",
      monospace: "'Fira Code', monospace"
    },
    borderRadius: {
      small: "4px",
      medium: "6px",
      large: "8px",
      circle: "50%"
    },
    iconSet: "carbon",
    shadows: {
      small: "0 1px 3px rgba(46, 52, 64, 0.05)",
      medium: "0 3px 10px rgba(46, 52, 64, 0.1)",
      large: "0 6px 20px rgba(46, 52, 64, 0.15)"
    }
  },
  
  retro: {
    id: "retro",
    name: "Retrowave",
    description: "80s-inspired neon aesthetics with bold colors and retro vibes",
    colors: {
      primary: "#ff2e97",
      secondary: "#7928ca",
      accent: "#00d9ff",
      background: "#1a1a2e",
      cardBackground: "#16213e",
      text: "#ffffff",
      textSecondary: "#b3b3b3",
      ownMessage: "#ff2e97",
      ownMessageText: "#ffffff",
      otherMessage: "#16213e",
      otherMessageText: "#ffffff",
      error: "#ff3a3a",
      success: "#00ff9d",
      warning: "#fcff4d",
      info: "#00d9ff",
      divider: "#16213e",
      iconPrimary: "#ff2e97",
      iconSecondary: "#00d9ff"
    },
    fonts: {
      main: "'VT323', monospace",
      heading: "'Press Start 2P', cursive",
      monospace: "'VT323', monospace"
    },
    borderRadius: {
      small: "0px",
      medium: "0px",
      large: "0px", 
      circle: "50%"
    },
    iconSet: "pixelart",
    shadows: {
      small: "0 0 5px rgba(255, 46, 151, 0.5)",
      medium: "0 0 15px rgba(255, 46, 151, 0.7)",
      large: "0 0 30px rgba(255, 46, 151, 0.9)"
    }
  },
  
  coffee: {
    id: "coffee",
    name: "Coffee Shop",
    description: "Warm and cozy tones inspired by coffee shops and vintage paper",
    colors: {
      primary: "#a87b51",
      secondary: "#715031",
      accent: "#d3b99f",
      background: "#f5f1eb",
      cardBackground: "#ffffff",
      text: "#3d2c1c",
      textSecondary: "#70593e",
      ownMessage: "#a87b51",
      ownMessageText: "#ffffff",
      otherMessage: "#ffffff",
      otherMessageText: "#3d2c1c",
      error: "#c53d2d",
      success: "#5c7b3a",
      warning: "#deb853",
      info: "#5c87aa",
      divider: "#e8e0d5",
      iconPrimary: "#a87b51",
      iconSecondary: "#70593e",
      ownMessageBg: "#a87b51",
      ownMessageGradientStart: "#bf8c5d",
      ownMessageAuthor: "#ffffff",
      ownMessageTime: "rgba(255, 255, 255, 0.9)",
      otherMessageBg: "#ffffff",
      otherMessageGradientStart: "#f8f5f2",
      otherMessageAuthor: "#3d2c1c",
      otherMessageTime: "rgba(61, 44, 28, 0.8)"
    },
    fonts: {
      main: "'Karla', sans-serif",
      heading: "'Playfair Display', serif",
      monospace: "'Courier New', Courier, monospace"
    },
    borderRadius: {
      small: "4px",
      medium: "8px",
      large: "12px",
      circle: "50%"
    },
    iconSet: "clarity",
    shadows: {
      small: "0 2px 5px rgba(168, 123, 81, 0.05)",
      medium: "0 5px 15px rgba(168, 123, 81, 0.1)",
      large: "0 8px 30px rgba(168, 123, 81, 0.15)"
    }
  }
};

export default themes;

// Utility function to get a theme by ID
export const getThemeById = (themeId) => {
  return themes[themeId] || themes.classic; // Fallback to classic if theme not found
};

// List of all theme IDs for selection
export const themeIds = Object.keys(themes);

// List of all themes for display
export const themesList = Object.values(themes);

// Add these improved color definitions to your theme objects
export const lightTheme = {
  id: 'light',
  name: 'Light Theme',
  description: 'Clean, bright theme with blue accents',
  colors: {
    primary: '#4a90e2',
    secondary: '#3a7bc8',
    background: '#f5f7fa',
    surface: '#ffffff',
    text: '#333333',
    textLight: '#7f8c8d',
    textDark: '#2c3e50',
    error: '#e74c3c',
    success: '#2ecc71',
    divider: '#e0e0e0',
    ownMessageBg: '#4caf50',
    ownMessageText: '#ffffff',
    ownMessageAuthor: '#ffffff',
    ownMessageTime: 'rgba(255, 255, 255, 0.8)',
    ownMessageGradientStart: 'rgba(92, 184, 92, 1)',
    otherMessageBg: '#f1f0f0',
    otherMessageText: '#333333',
    otherMessageAuthor: '#333333',
    otherMessageTime: 'rgba(51, 51, 51, 0.8)',
    otherMessageGradientStart: 'rgba(241, 240, 240, 0.8)'
  },
  // ... rest of theme properties
};

export const darkTheme = {
  id: 'dark',
  name: 'Dark Theme',
  description: 'Dark mode with blue accents',
  colors: {
    primary: '#60a5fa',
    secondary: '#3b82f6',
    background: '#1a1a1a',
    surface: '#2c2c2c',
    text: '#e0e0e0',
    textLight: '#a0a0a0',
    textDark: '#f8f8f8',
    error: '#f87171',
    success: '#4ade80',
    divider: '#444444',
    ownMessageBg: '#2196F3',
    ownMessageText: '#ffffff',
    ownMessageAuthor: '#ffffff',
    ownMessageTime: 'rgba(255, 255, 255, 0.9)',
    ownMessageGradientStart: '#42a5f5',
    otherMessageBg: '#424242',
    otherMessageText: '#ffffff',
    otherMessageAuthor: '#f0f0f0',
    otherMessageTime: 'rgba(255, 255, 255, 0.9)',
    otherMessageGradientStart: '#4a4a4a'
  },
  // ... rest of theme properties
};

export const pastelTheme = {
  id: 'pastel',
  name: 'Pastel Theme',
  description: 'Soft pastel colors for a gentle experience',
  colors: {
    primary: '#95c3e8',
    secondary: '#b39ddb',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#4a4a4a',
    textLight: '#7f8c8d',
    textDark: '#2c3e50',
    error: '#ef9a9a',
    success: '#a5d6a7',
    divider: '#e0e0e0',
    ownMessageBg: '#7986cb',
    ownMessageText: '#ffffff',
    ownMessageAuthor: '#ffffff',
    ownMessageTime: 'rgba(255, 255, 255, 0.9)',
    ownMessageGradientStart: '#9fa8da',
    otherMessageBg: '#ffecb3',
    otherMessageText: '#3e2723',
    otherMessageAuthor: '#5d4037',
    otherMessageTime: 'rgba(93, 64, 55, 0.8)',
    otherMessageGradientStart: '#fff8e1'
  },
  // ... rest of theme properties
}; 