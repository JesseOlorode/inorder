
import { Home, Search, Heart, Plus, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/theme-context";

export function AppBottomNav() {
  const location = useLocation();
  const { theme } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${theme === "dark" ? "bg-[#252A37]" : "bg-[#252A37]"} border-t border-gray-800 py-2 shadow-lg z-50`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link to="/dashboard" className={`flex flex-col items-center p-2 ${isActive("/dashboard") ? "text-[#00A16C]" : "text-gray-400"}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center p-2 ${isActive("/search") ? "text-[#00A16C]" : "text-gray-400"}`}>
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link to="/create-task" className="flex flex-col items-center">
          <div className="bg-[#00A16C] rounded-full p-3 -mt-6 shadow-md">
            <Plus size={24} className="text-white" />
          </div>
          <span className="text-xs mt-1 text-gray-400">Add</span>
        </Link>
        <Link to="/favorites" className={`flex flex-col items-center p-2 ${isActive("/favorites") ? "text-[#00A16C]" : "text-gray-400"}`}>
          <Heart size={24} />
          <span className="text-xs mt-1">Favorites</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive("/profile") ? "text-[#00A16C]" : "text-gray-400"}`}>
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
