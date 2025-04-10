
import { ArrowLeft, Bell, MoreVertical, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("profile")) return "Profile";
    if (path.includes("create-task")) return "Task Management";
    if (path.includes("task-management")) return "Task Management";
    if (path.includes("grocery")) return "Smart Grocery Management";
    if (path.includes("calendar")) return "Today's Task";
    return "Dashboard";
  };

  return (
    <header className="bg-[#00674A] text-white p-4">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-medium">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button>
            <Search size={20} />
          </button>
          <button>
            <Bell size={20} />
          </button>
          <button>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
