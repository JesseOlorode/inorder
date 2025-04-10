
import { AppNavbar } from "@/components/app/app-navbar";
import { TaskManagementContent } from "@/components/app/task-management-content";
import { AppBottomNav } from "@/components/app/app-bottom-nav";
import { useTheme } from "@/contexts/theme-context";

const TaskManagement = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-[#1A1F2C] font-inter-dark" : "bg-[#F7F9FC] font-inter-light"}`}>
      <AppNavbar />
      <div className="flex-1 container mx-auto px-4 pb-16">
        <TaskManagementContent />
      </div>
      <AppBottomNav />
    </div>
  );
};

export default TaskManagement;
