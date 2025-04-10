
import { useState } from "react";
import { Check, Edit, Heart, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-context";
import { getRandomMotivationalMessage } from "@/utils/motivational-messages";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Task interface for type safety
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

export function TaskManagementContent() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Team Meeting",
      dueDate: "2025-04-12",
      notes: "Discuss project roadmap",
      category: "work",
      remindMe: true,
      completed: false,
      favorite: false
    },
    {
      id: 2,
      title: "Grocery Shopping",
      dueDate: "2025-04-11",
      notes: "Buy vegetables and fruits",
      category: "personal",
      remindMe: true,
      completed: false,
      favorite: false
    },
    {
      id: 3,
      title: "Call Doctor",
      dueDate: "2025-04-13",
      notes: "Annual checkup",
      category: "health",
      remindMe: false,
      completed: false,
      favorite: false
    }
  ]);

  const completeTask = (taskId: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? {...task, completed: true} : task
    );
    setTasks(updatedTasks);
    
    const completedTaskTitle = tasks.find(task => task.id === taskId)?.title || "";
    navigate("/task-complete", { 
      state: { 
        message: getRandomMotivationalMessage(),
        taskTitle: completedTaskTitle
      }
    });
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleFavorite = (taskId: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? {...task, favorite: !task.favorite} : task
    );
    setTasks(updatedTasks);
    
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      toast(`${task.title} ${task.favorite ? 'removed from' : 'added to'} favorites`);
    }

    // Load existing favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteTasks');
    let favorites: Task[] = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    // If the task is now a favorite, add it to favorites if not already present
    if (!task?.favorite) {
      const taskToAdd = updatedTasks.find(t => t.id === taskId);
      if (taskToAdd && !favorites.some(fav => fav.id === taskId)) {
        favorites.push(taskToAdd);
      }
    } else {
      // If the task is no longer a favorite, remove it from favorites
      favorites = favorites.filter(fav => fav.id !== taskId);
    }
    
    // Update localStorage with the updated favorites list
    localStorage.setItem('favoriteTasks', JSON.stringify(favorites));
  };

  return (
    <div className={`py-4 ${theme === "dark" ? "font-inter-dark" : "font-inter-light"}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl ${theme === "dark" ? "font-medium" : "font-semibold"}`}>
          Manage your life with ease with our task management tool
        </h1>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg ${theme === "dark" ? "font-medium" : "font-semibold"}`}>Your Tasks</h2>
          <Link to="/create-task">
            <Button
              className={`bg-[#00A16C] text-white ${theme === "dark" ? "font-medium" : "font-semibold"} py-2 px-4 rounded`}
            >
              Add New Task
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {tasks.map(task => (
            <ContextMenu key={task.id}>
              <ContextMenuTrigger>
                <div className={`
                  ${theme === "dark" ? "bg-[#252A37]" : "bg-white"} 
                  rounded-lg p-4 flex items-center justify-between 
                  ${task.completed ? "opacity-50" : ""}
                  ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"}
                  transition-all duration-200
                `}>
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
                  
                  <div className="flex items-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(task.id);
                      }}
                      className={`mr-2 p-1.5 rounded-full transition-colors ${
                        task.favorite 
                          ? 'text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30' 
                          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <Heart 
                        size={16} 
                        className={task.favorite ? 'fill-red-500' : ''} 
                      />
                    </button>
                    
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
                          onClick={() => completeTask(task.id)}
                          className={`${
                            theme === "dark" 
                              ? "focus:bg-[#1A1F2C] focus:text-[#F5EFE0]" 
                              : "focus:bg-gray-100 focus:text-[#1A1F2C]"
                          }`}
                          disabled={task.completed}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          <span>Complete Task</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => toggleFavorite(task.id)}
                          className={`${
                            theme === "dark" 
                              ? "focus:bg-[#1A1F2C] focus:text-[#F5EFE0]" 
                              : "focus:bg-gray-100 focus:text-[#1A1F2C]"
                          }`}
                        >
                          <Heart 
                            className={`mr-2 h-4 w-4 ${task.favorite ? 'fill-red-500' : ''}`} 
                          />
                          <span>{task.favorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteTask(task.id)}
                          className={`${
                            theme === "dark" 
                              ? "focus:bg-[#1A1F2C] focus:text-[#F5EFE0]" 
                              : "focus:bg-gray-100 focus:text-[#1A1F2C]"
                          }`}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete Task</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent
                className={`${
                  theme === "dark" 
                    ? "bg-[#252A37] text-[#F5EFE0] border border-gray-700" 
                    : "bg-white text-[#1A1F2C] border border-gray-200"
                }`}
              >
                <ContextMenuItem 
                  onClick={() => completeTask(task.id)}
                  className={`${
                    theme === "dark" 
                      ? "focus:bg-[#1A1F2C] focus:text-[#F5EFE0]" 
                      : "focus:bg-gray-100 focus:text-[#1A1F2C]"
                  }`}
                  disabled={task.completed}
                >
                  <Check className="mr-2 h-4 w-4" />
                  <span>Complete Task</span>
                </ContextMenuItem>
                <ContextMenuItem 
                  onClick={() => toggleFavorite(task.id)}
                  className={`${
                    theme === "dark" 
                      ? "focus:bg-[#1A1F2C] focus:text-[#F5EFE0]" 
                      : "focus:bg-gray-100 focus:text-[#1A1F2C]"
                  }`}
                >
                  <Heart 
                    className={`mr-2 h-4 w-4 ${task.favorite ? 'fill-red-500' : ''}`} 
                  />
                  <span>{task.favorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </ContextMenuItem>
                <ContextMenuItem 
                  onClick={() => deleteTask(task.id)}
                  className={`${
                    theme === "dark" 
                      ? "focus:bg-[#1A1F2C] focus:text-[#F5EFE0]" 
                      : "focus:bg-gray-100 focus:text-[#1A1F2C]"
                  }`}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete Task</span>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </div>
    </div>
  );
}
