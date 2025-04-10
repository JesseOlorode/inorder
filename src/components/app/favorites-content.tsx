
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Check, Trash, MoreHorizontal } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Task interface
interface Task {
  id: number;
  title: string;
  dueDate: string;
  notes?: string;
  category: string;
  remindMe: boolean;
  completed: boolean;
  favorite: boolean;
}

export function FavoritesContent() {
  const { theme } = useTheme();
  const [favoriteTasks, setFavoriteTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load favorite tasks from localStorage
    const savedFavorites = localStorage.getItem('favoriteTasks');
    if (savedFavorites) {
      setFavoriteTasks(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFromFavorites = (taskId: number) => {
    // Filter out the task to be removed
    const updatedFavorites = favoriteTasks.filter(task => task.id !== taskId);
    setFavoriteTasks(updatedFavorites);
    
    // Update localStorage with the updated favorites list
    localStorage.setItem('favoriteTasks', JSON.stringify(updatedFavorites));
    
    const task = favoriteTasks.find(task => task.id === taskId);
    if (task) {
      toast(`${task.title} removed from favorites`);
    }
  };

  return (
    <div className="py-4 space-y-6">
      <h1 className="text-2xl font-medium mb-6">Favorites</h1>
      
      {favoriteTasks.length > 0 ? (
        <div className="space-y-3">
          {favoriteTasks.map(task => (
            <div 
              key={task.id}
              className={`
                ${theme === "dark" ? "bg-[#252A37]" : "bg-white"} 
                rounded-lg p-4 flex items-center justify-between 
                ${task.completed ? "opacity-50" : ""}
                ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"}
                transition-all duration-200 hover:shadow-md
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`h-4 w-4 rounded-full ${
                  task.completed 
                    ? "bg-[#00A16C]" 
                    : task.category === "work" 
                      ? "bg-blue-500" 
                      : task.category === "personal" 
                        ? "bg-purple-500" 
                        : "bg-orange-500"
                }`}></div>
                <div>
                  <h3 className={`${theme === "dark" ? "font-normal" : "font-medium"} ${task.completed ? "line-through" : ""}`}>
                    {task.title}
                  </h3>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className={`${theme === "dark" ? "hover:bg-[#1A1F2C]" : "hover:bg-gray-100"} rounded-full p-1`}>
                    <MoreHorizontal size={16} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className={`${
                    theme === "dark" 
                      ? "bg-[#252A37] text-[#F5EFE0] border border-gray-700" 
                      : "bg-white text-[#1A1F2C] border border-gray-200"
                  }`}
                >
                  <DropdownMenuItem 
                    onClick={() => removeFromFavorites(task.id)}
                    className={`${
                      theme === "dark" 
                        ? "focus:bg-[#1A1F2C] focus:text-[#F5EFE0]" 
                        : "focus:bg-gray-100 focus:text-[#1A1F2C]"
                    }`}
                  >
                    <Heart className="mr-2 h-4 w-4 fill-red-500" />
                    <span>Remove from Favorites</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-400 flex flex-col items-center">
          <Heart size={40} className="mb-4 text-gray-500" />
          <p>No favorites yet</p>
          <p className="mt-2">Items you mark as favorite will appear here</p>
          <Link to="/task-management" className="mt-6">
            <Button variant="outline" className="mt-4">
              Go to Tasks
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
