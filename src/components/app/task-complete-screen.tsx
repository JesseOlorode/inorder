
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/theme-context";

interface TaskCompleteScreenProps {
  message: string;
  taskTitle?: string;
}

export function TaskCompleteScreen({ message, taskTitle }: TaskCompleteScreenProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <div className="relative mb-10">
        {/* Main text without shadow effect */}
        <div className="relative">
          <div className="text-[#5ad67d] text-6xl font-bold relative z-10">you did</div>
          <div className="text-[#5ad67d] text-6xl font-bold relative z-10">great</div>
        </div>
        
        {/* Star sparkle icon */}
        <div className="absolute -top-4 right-0">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.4 8.8H21.6L15.6 13.2L18 20L12 15.6L6 20L8.4 13.2L2.4 8.8H9.6L12 2Z" fill="#a3f9b9" />
          </svg>
        </div>
        
        {/* Small star sparkle */}
        <div className="absolute top-2 right-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.4 8.8H21.6L15.6 13.2L18 20L12 15.6L6 20L8.4 13.2L2.4 8.8H9.6L12 2Z" fill="#a3f9b9" />
          </svg>
        </div>
      </div>
      
      <div className={`${
        theme === "dark" 
          ? "bg-[#252A37] text-[#F5EFE0]" 
          : "bg-[#F5EFE0] text-[#1A1F2C] border border-[#1A1F2C]/10"
        } rounded-lg p-6 w-full max-w-md mb-8 shadow-md`}>
        <p className="text-lg mb-4">"{message}"</p>
        {taskTitle && <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Task: {taskTitle}</p>}
      </div>
      
      <Button
        onClick={() => navigate("/create-task")}
        className="w-full bg-[#00C853] text-black font-medium py-6 rounded mb-4"
      >
        Create Another Task
      </Button>
      
      <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-6 max-w-xs`}>
        One step at a time. You'll get there.
        <br />
        Remember: Small progress is still progress!
      </div>
    </div>
  );
}
