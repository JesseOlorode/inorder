
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference or use system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
      // Use system preference as fallback
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light"; // Default fallback
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem("theme", theme);
    
    // Update the document class for tailwind dark mode
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-[#F5EFE0]");
      document.body.classList.remove("text-[#1A1F2C]");
      document.body.classList.add("bg-[#1A1F2C]");
      document.body.classList.add("text-[#F5EFE0]");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-[#1A1F2C]");
      document.body.classList.remove("text-[#F5EFE0]");
      document.body.classList.add("bg-[#F5EFE0]");
      document.body.classList.add("text-[#1A1F2C]");
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
