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
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Create a wrapper component to handle redirects
const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if this is a page refresh by looking at performance navigation type
    const isPageRefresh = window.performance && 
      window.performance.navigation && 
      window.performance.navigation.type === 1;
      
    // Alternative method for newer browsers
    const isPageRefreshNew = sessionStorage.getItem("app_loaded") !== "true";
    
    // Set a flag that we've loaded the app
    sessionStorage.setItem("app_loaded", "true");
    
    // If it's a refresh or new session and we're not on splash or matrix loading
    if ((isPageRefresh || isPageRefreshNew) && 
        location.pathname !== "/" && 
        location.pathname !== "/matrix-loading") {
      // Clear visited flag
      sessionStorage.removeItem("visited");
      // Redirect to splash screen
      navigate("/");
      return;
    }
    
    // Normal navigation checks (keep the existing behavior)
    if (
      location.pathname !== "/" && 
      location.pathname !== "/index" && 
      location.pathname !== "/matrix-loading" && 
      sessionStorage.getItem("visited") !== "true"
    ) {
      // Redirect to splash screen
      navigate("/");
    }
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
