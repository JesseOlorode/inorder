
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";
import Index from "./pages/Index";
import Login from "./pages/Login";
import LoginLoading from "./pages/LoginLoading";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateTask from "./pages/CreateTask";
import TaskManagement from "./pages/TaskManagement";
import GroceryManagement from "./pages/GroceryManagement";
import GroceryEdit from "./pages/GroceryEdit";
import GroceryAdd from "./pages/GroceryAdd";
import GroceryReceipt from "./pages/GroceryReceipt";
import TaskComplete from "./pages/TaskComplete";
import Calendar from "./pages/Calendar";
import Weather from "./pages/Weather";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import WiFi from "./pages/WiFi";
import Statistics from "./pages/Statistics";
import Sound from "./pages/Sound";
import Alerts from "./pages/Alerts";
import Devices from "./pages/Devices";
import SplashScreen from "./pages/SplashScreen";
import MatrixLoading from "./pages/MatrixLoading";
import BlackScreenBuffer from "./pages/BlackScreenBuffer";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Create a wrapper component to handle redirects and page refreshes
const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // On component mount, check if this is a fresh page load
    const handlePageRefresh = () => {
      // We use both localStorage (persists across browser sessions) 
      // and a timestamp check to detect page reloads reliably
      
      const lastRenderTime = localStorage.getItem('lastRenderTime');
      const currentTime = Date.now();
      
      // If there's no timestamp or it's been more than 2 seconds, consider it a page refresh
      if (!lastRenderTime || (currentTime - parseInt(lastRenderTime, 10)) > 2000) {
        // Clear visited flag on refresh for better user experience
        // but ONLY if not on a post-splash page and user hasn't visited already
        const validPostSplashPaths = ["/matrix-loading", "/login", "/login-loading", "/dashboard"];
        
        if (!validPostSplashPaths.includes(location.pathname) && sessionStorage.getItem("visited") !== "true") {
          sessionStorage.removeItem("visited");
        }
        
        // If not already on splash screen AND not visited before, redirect there on full refresh
        if (location.pathname !== "/" && !validPostSplashPaths.includes(location.pathname) && sessionStorage.getItem("visited") !== "true") {
          navigate("/");
          return;
        }
      }
      
      // Update the timestamp for next check
      localStorage.setItem('lastRenderTime', currentTime.toString());
    };
    
    // Run the refresh check when component mounts
    handlePageRefresh();
    
    // Modified navigation logic to prevent redirecting to splash when clicking bottom nav
    // Define all valid app routes that should NOT redirect to splash
    const validAppPaths = [
      "/", "/matrix-loading", "/login", "/login-loading", "/dashboard",
      "/profile", "/create-task", "/task-management", "/grocery-management",
      "/grocery-edit", "/grocery-add", "/grocery-receipt", "/task-complete",
      "/calendar", "/weather", "/search", "/favorites", "/wifi", 
      "/statistics", "/sound", "/alerts", "/devices"
    ];
    
    // Only redirect to splash if:
    // 1. Not on a valid app path
    // 2. AND the visited flag is not set
    if (!validAppPaths.includes(location.pathname) && sessionStorage.getItem("visited") !== "true") {
      // Redirect to splash screen if not visited and not on a valid path
      navigate("/");
    }
    
    // Add page visibility change listener to detect tab focus changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // When tab becomes visible again, update timestamp
        localStorage.setItem('lastRenderTime', Date.now().toString());
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [navigate, location]);
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteGuard>
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="/matrix-loading" element={<MatrixLoading />} />
                <Route path="/black-screen-buffer" element={<BlackScreenBuffer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login-loading" element={<LoginLoading />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/task-management" element={<TaskManagement />} />
                <Route path="/grocery-management" element={<GroceryManagement />} />
                <Route path="/grocery-edit" element={<GroceryEdit />} />
                <Route path="/grocery-add" element={<GroceryAdd />} />
                <Route path="/grocery-receipt" element={<GroceryReceipt />} />
                <Route path="/task-complete" element={<TaskComplete />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/wifi" element={<WiFi />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/sound" element={<Sound />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RouteGuard>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
