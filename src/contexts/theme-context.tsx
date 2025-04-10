
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      // Check for saved theme preference or use system preference
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
          return savedTheme as Theme;
        }
        // Use system preference as fallback
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    return "light"; // Default fallback
  });

  useEffect(() => {
    try {
      // Update localStorage when theme changes
      if (typeof window !== 'undefined') {
        localStorage.setItem("theme", theme);
        
        // Update document classes for global dark mode
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
          document.body.className = "bg-[#1A1F2C] text-[#F5EFE0]";
        } else {
          document.documentElement.classList.remove("dark");
          document.body.className = "bg-[#F5EFE0] text-[#1A1F2C]";
        }
      }
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
