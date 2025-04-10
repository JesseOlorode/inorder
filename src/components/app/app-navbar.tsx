
import { ArrowLeft, Bell, MoreVertical, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/theme-context";

export function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("profile")) return "Profile";
    if (path.includes("create-task")) return "Task Management";
    if (path.includes("task-management")) return "Task Management";
    if (path.includes("grocery")) return "Smart Grocery Management";
    if (path.includes("calendar")) return "Today's Task";
    if (path.includes("weather")) return "Weather";
    if (path.includes("search")) return "Search";
    if (path.includes("favorites")) return "Favorites";
    if (path.includes("wifi")) return "WiFi Settings";
    if (path.includes("statistics")) return "Statistics";
    if (path.includes("sound")) return "Sound Settings";
    if (path.includes("alerts")) return "Alerts";
    if (path.includes("devices")) return "Devices";
    return "Dashboard";
  };

  // Handle navigation for header buttons
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleSearchClick = () => {
    navigate("/search");
  };
  
  const handleNotificationsClick = () => {
    navigate("/alerts");
  };
  
  const handleMoreClick = () => {
    // This could open a dropdown menu in the future
    // For now, navigate to profile
    navigate("/profile");
  };

  return (
    <header className="bg-[#00A16C] text-white p-4">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center">
          <button 
            onClick={handleBackClick} 
            className="mr-4"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center">
            <div 
              className="font-bold text-lg mr-2"
              onClick={() => navigate('/dashboard')}
              style={{ cursor: 'pointer' }}
            >
              InOrder
            </div>
            <h1 className="text-lg font-medium truncate">| {getPageTitle()}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleSearchClick} aria-label="Search">
            <Search size={20} />
          </button>
          <button onClick={handleNotificationsClick} aria-label="Notifications">
            <Bell size={20} />
          </button>
          <button onClick={handleMoreClick} aria-label="More options">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
