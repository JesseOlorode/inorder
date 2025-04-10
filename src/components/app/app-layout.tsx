
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { AppNavbar } from "./app-navbar";
import { AppBottomNav } from "./app-bottom-nav";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const [showNav, setShowNav] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#1A1F2C] text-white">
      {showNav && <AppNavbar />}
      <main className={cn("flex-1 max-w-md mx-auto w-full px-4 pb-16", className)}>
        {children}
      </main>
      <AppBottomNav />
    </div>
  );
}
