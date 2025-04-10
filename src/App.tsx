
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
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
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
