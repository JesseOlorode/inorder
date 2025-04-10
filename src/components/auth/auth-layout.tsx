
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-6 max-sm:p-4">
      <div className={cn("max-w-[400px] w-full mx-auto", className)}>
        {children}
      </div>
    </div>
  );
}
