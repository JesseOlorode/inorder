
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { AppNavbar } from "./app-navbar";
import { AppBottomNav } from "./app-bottom-nav";
import { useTheme } from "@/contexts/theme-context";
import { motion } from "framer-motion";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const [showNav, setShowNav] = useState(true);
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-[#1A1F2C] text-[#F5EFE0]" : "bg-[#F5EFE0] text-[#1A1F2C]"} transition-colors duration-300`}>
      {showNav && <AppNavbar />}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn("flex-1 max-w-md mx-auto w-full px-4 pb-24", className)}
      >
        {children}
      </motion.main>
      <AppBottomNav />
    </div>
  );
}
