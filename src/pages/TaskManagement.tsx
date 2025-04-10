
import { AppNavbar } from "@/components/app/app-navbar";
import { TaskManagementContent } from "@/components/app/task-management-content";
import { AppBottomNav } from "@/components/app/app-bottom-nav";

const TaskManagement = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <AppNavbar />
      <div className="flex-1 container mx-auto px-4 pb-16">
        <TaskManagementContent />
      </div>
      <AppBottomNav />
    </div>
  );
};

export default TaskManagement;
