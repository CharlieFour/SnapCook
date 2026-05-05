import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const getLuminance = (hexColor) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) || 0;
  const g = parseInt(hex.substr(2, 2), 16) || 0;
  const b = parseInt(hex.substr(4, 2), 16) || 0;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

const getContrastColor = (hexColor) => {
  return getLuminance(hexColor) > 0.6 ? '#1a1a1a' : '#ffffff';
};

const getSafeTextColor = (hexColor, theme) => {
  const luminance = getLuminance(hexColor);
  if (theme === 'light' && luminance > 0.8) {
    return '#1a1a1a'; // Too light for light mode background
  }
  if (theme === 'dark' && luminance < 0.2) {
    return '#f3f4f6'; // Too dark for dark mode background
  }
  return hexColor;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#ff6b6b');
  const [secondaryColor, setSecondaryColor] = useState('#4ecdc4');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--primary-contrast', getContrastColor(primaryColor));
    document.documentElement.style.setProperty('--primary-text-safe', getSafeTextColor(primaryColor, theme));
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--secondary-contrast', getContrastColor(secondaryColor));
    document.documentElement.style.setProperty('--secondary-text-safe', getSafeTextColor(secondaryColor, theme));
  }, [theme, primaryColor, secondaryColor]);

  const value = {
    theme, setTheme,
    primaryColor, setPrimaryColor,
    secondaryColor, setSecondaryColor
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
