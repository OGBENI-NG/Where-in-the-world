import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the possible theme types
export type Theme = "light" | "dark" | "system";

// Define the context properties
interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: boolean
  handleToggle: () => void
}


// Create a context with undefined as the default value
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
// Define the interface for ThemeProvider's props
interface ThemeProviderProps {
  // `children` is a special prop in React that represents the nested elements/components
  // ReactNode is a type provided by React that represents any readable content (elements, strings, numbers, etc.)
  children: ReactNode;
}


// ThemeProvider component to provide the theme context
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // State to store the current theme, initialized from localStorage or default to 'system'
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'system';
  });

  // State to store the toggle state
  const [toggle, setToggle] = useState(false)
  
  //function to handle toggle state
  function handleToggle() {
    setToggle(prevToggle => !prevToggle)
  }


  useEffect(() => {
    // Function to apply the theme
    const applyTheme = (newTheme: Theme) => {
      if (newTheme === 'system') {
        // If system theme is selected, apply the system's preferred color scheme
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', systemTheme === 'dark');
      } else {
        // Otherwise, apply the selected theme directly
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
      // Save the theme in localStorage
      localStorage.setItem('theme', newTheme);
    };

    // Apply the theme whenever it changes
    applyTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  // Function to update the theme state
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle, handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
