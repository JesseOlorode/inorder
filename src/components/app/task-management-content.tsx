
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Check, Edit, MoreHorizontal, Trash } from "lucide-react";
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

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  dueDate: z.string().min(1, "Due date is required"),
  notes: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  remindMe: z.boolean().default(false),
});

// Task interface for type safety
interface Task {
  id: number;
  title: string;
  dueDate: string;
  notes?: string;
  category: string;
  remindMe: boolean;
  completed: boolean;
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
      completed: false
    },
    {
      id: 2,
      title: "Grocery Shopping",
      dueDate: "2025-04-11",
      notes: "Buy vegetables and fruits",
      category: "personal",
      remindMe: true,
      completed: false
    },
    {
      id: 3,
      title: "Call Doctor",
      dueDate: "2025-04-13",
      notes: "Annual checkup",
      category: "health",
      remindMe: false,
      completed: false
    }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      dueDate: "",
      notes: "",
      category: "",
      remindMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Add task to the list
    const newTask: Task = {
      id: tasks.length + 1,
      title: values.title,
      dueDate: values.dueDate,
      notes: values.notes,
      category: values.category,
      remindMe: values.remindMe,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    
    // Reset form
    form.reset();
  }

  const completeTask = (taskId: number) => {
    // Mark task as completed
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? {...task, completed: true} : task
    );
    setTasks(updatedTasks);
    
    // Navigate to the task complete screen
    navigate("/task-complete");
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className={`py-4 ${theme === "dark" ? "font-inter-dark" : "font-inter-light"}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl ${theme === "dark" ? "font-medium" : "font-semibold"}`}>
          Manage your life with ease with our task management tool
        </h1>
      </div>
      
      {/* Tasks section */}
      <div className="mb-8">
        <h2 className={`text-lg ${theme === "dark" ? "font-medium" : "font-semibold"} mb-4`}>Your Tasks</h2>
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
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={theme === "dark" ? "font-light" : "font-medium"}>Task Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter task title"
                    className={`bg-white text-black border-none ${theme === "dark" ? "placeholder:text-gray-400" : "placeholder:text-gray-500"}`}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={theme === "dark" ? "font-light" : "font-medium"}>Due Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="bg-white text-black border-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={theme === "dark" ? "font-light" : "font-medium"}>Notes</FormLabel>
                <FormControl>
                  <div className="bg-white rounded-md border">
                    <textarea
                      className={`w-full min-h-[100px] bg-transparent p-3 text-black outline-none ${theme === "dark" ? "placeholder:text-gray-400" : "placeholder:text-gray-500"}`}
                      placeholder="Add notes"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={theme === "dark" ? "font-light" : "font-medium"}>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white text-black border-none">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="remindMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-400 data-[state=checked]:bg-[#00A16C] data-[state=checked]:border-[#00A16C]"
                  />
                </FormControl>
                <FormLabel className={`text-sm ${theme === "dark" ? "font-light" : "font-medium"}`}>Remind me about this task</FormLabel>
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className={`w-full bg-[#00A16C] text-white ${theme === "dark" ? "font-medium" : "font-semibold"} py-6 rounded`}
          >
            Add Task
          </Button>
        </form>
      </Form>
    </div>
  );
}
