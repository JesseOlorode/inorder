
import { ArrowLeft, Bell, MoreVertical, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/theme-context";
import { useLanguage } from "@/contexts/language-context";

export function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("profile")) return t("profile");
    if (path.includes("create-task")) return t("taskManagement");
    if (path.includes("task-management")) return t("taskManagement");
    if (path.includes("grocery")) return t("groceryManagement");
    if (path.includes("calendar")) return t("todaysTask");
    if (path.includes("weather")) return t("weather");
    if (path.includes("search")) return t("search");
    if (path.includes("favorites")) return t("favorites");
    if (path.includes("wifi")) return t("wifiSettings");
    if (path.includes("statistics")) return t("statistics");
    if (path.includes("sound")) return t("soundSettings");
    if (path.includes("alerts")) return t("alerts");
    if (path.includes("devices")) return t("devices");
    return t("dashboard");
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
