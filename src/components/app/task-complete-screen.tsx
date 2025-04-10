
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/theme-context";
import { motion } from "framer-motion";

interface TaskCompleteScreenProps {
  message: string;
  taskTitle?: string;
}

export function TaskCompleteScreen({ message, taskTitle }: TaskCompleteScreenProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[80vh] text-center px-4"
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.1
        }}
        className="relative mb-10"
      >
        {/* Main text */}
        <div className="relative">
          <div className="text-[#5ad67d] text-6xl font-bold relative z-10 drop-shadow-sm">you did</div>
          <div className="text-[#5ad67d] text-6xl font-bold relative z-10 drop-shadow-sm">great</div>
        </div>
        
        {/* Star sparkle icon */}
        <motion.div 
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -top-4 right-0"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.4 8.8H21.6L15.6 13.2L18 20L12 15.6L6 20L8.4 13.2L2.4 8.8H9.6L12 2Z" fill="#a3f9b9" />
          </svg>
        </motion.div>
        
        {/* Small star sparkle */}
        <motion.div 
          animate={{ 
            rotate: [0, -15, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
          className="absolute top-2 right-6"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.4 8.8H21.6L15.6 13.2L18 20L12 15.6L6 20L8.4 13.2L2.4 8.8H9.6L12 2Z" fill="#a3f9b9" />
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`${
          theme === "dark" 
            ? "bg-[#252A37] text-[#F5EFE0] border border-[#3A3F4C]" 
            : "bg-[#F5EFE0] text-[#1A1F2C] border border-[#1A1F2C]/10"
          } rounded-lg p-6 w-full max-w-md mb-8 shadow-lg`}
      >
        <p className="text-lg mb-4 font-medium italic">"{message}"</p>
        {taskTitle && (
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center`}>
            <div className="h-2 w-2 rounded-full bg-[#5ad67d] mr-2"></div>
            <p>Task: {taskTitle}</p>
          </div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          onClick={() => navigate("/create-task")}
          className="w-full bg-gradient-to-r from-[#00C853] to-[#09AB8B] hover:from-[#00B348] hover:to-[#089E81] text-black font-medium py-6 rounded-md mb-4 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
        >
          Create Another Task
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-6 max-w-xs`}
      >
        One step at a time. You'll get there.
        <br />
        Remember: Small progress is still progress!
      </motion.div>
    </motion.div>
  );
}
