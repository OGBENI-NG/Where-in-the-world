import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the theme type
type Theme = "light" | "dark";

// Define the context type with both the theme and a function to toggle it
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the ThemeContext with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// ThemeProvider component to manage the theme state
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(localStorageTheme);

  function localStorageTheme() {
    const storeTheme = localStorage.getItem("light");
    return storeTheme ? JSON.parse(storeTheme) : "light";
  }

  useEffect(() => {
    localStorage.setItem("light", JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
    
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
