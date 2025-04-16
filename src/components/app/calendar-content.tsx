
import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, User, Check, Trash, X } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; // Added missing Button import
import { getRandomMotivationalMessage } from "@/utils/motivational-messages";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

export function CalendarContent() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(16); // Default to current day
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const currentMonth = format(currentDate, "MMMM yyyy");
  
  const generateCalendarDays = () => {
    const days = [];
    const startDate = subDays(currentDate, 3);
    
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      days.push({
        date: format(date, "d"),
        day: format(date, "EEE"),
        isActive: i === 3, // Default active is the middle day
        fullDate: date
      });
    }
    
    return days;
  };
  
  const [calendarDays, setCalendarDays] = useState(generateCalendarDays());
  
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, time: "9:00 AM", title: "Team meeting", color: "bg-blue-500", completed: false, 
      description: "Weekly team sync meeting to discuss project progress, blockers, and next steps. Join the video call through the meeting link." },
    { id: 2, time: "10:30 AM", title: "Client call", color: "bg-purple-500", completed: false,
      description: "Discuss project requirements with the client. Prepare presentation and progress report before the call." },
    { id: 3, time: "12:00 PM", title: "Lunch break", color: "bg-orange-500", completed: false,
      description: "Take a break and enjoy your lunch. Remember to step away from your desk for better productivity in the afternoon." },
    { id: 4, time: "2:30 PM", title: "Project review", color: "bg-green-500", completed: false,
      description: "Internal review of the current project milestones. Prepare documentation and demo for the team." },
    { id: 5, time: "4:00 PM", title: "Team check-in", color: "bg-blue-500", completed: false,
      description: "Quick check-in with team members to ensure everyone is on track for the day's deliverables." },
    { id: 6, time: "5:30 PM", title: "End of day", color: "bg-red-500", completed: false,
      description: "Wrap up your work for the day. Update task status and prepare your to-do list for tomorrow." },
  ]);
  
  const goToPreviousWeek = () => {
    const newDate = subDays(currentDate, 7);
    setCurrentDate(newDate);
    setCalendarDays(generateCalendarDays());
  };
  
  const goToNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    setCurrentDate(newDate);
    setCalendarDays(generateCalendarDays());
  };
  
  const handleDayClick = (index) => {
    const newCalendarDays = calendarDays.map((day, i) => ({
      ...day,
      isActive: i === index
    }));
    
    setCalendarDays(newCalendarDays);
    setSelectedDay(parseInt(newCalendarDays[index].date));
    
    const taskPrefix = `${newCalendarDays[index].date}:`;
    const updatedTasks = [
      { id: 1, time: `${taskPrefix}00 AM`, title: "Team meeting", color: "bg-blue-500", completed: false, 
        description: "Weekly team sync meeting to discuss project progress, blockers, and next steps." },
      { id: 2, time: `${taskPrefix}30 AM`, title: "Client call", color: "bg-purple-500", completed: false, 
        description: "Discuss project requirements with the client. Prepare presentation and progress report." },
      { id: 3, time: `${taskPrefix}00 PM`, title: "Lunch break", color: "bg-orange-500", completed: false, 
        description: "Take a break and enjoy your lunch. Remember to step away from your desk." },
      { id: 4, time: `${taskPrefix}30 PM`, title: "Project review", color: "bg-green-500", completed: false, 
        description: "Internal review of the current project milestones. Prepare documentation and demo." },
      { id: 5, time: `${taskPrefix}00 PM`, title: "Team check-in", color: "bg-blue-500", completed: false, 
        description: "Quick check-in with team members to ensure everyone is on track for the day's deliverables." },
      { id: 6, time: `${taskPrefix}30 PM`, title: "End of day", color: "bg-red-500", completed: false, 
        description: "Wrap up your work for the day. Update task status and prepare your to-do list for tomorrow." },
    ];
    
    setTodayTasks(updatedTasks);
  };

  const completeTask = (taskId) => {
    const updatedTasks = todayTasks.map(task => 
      task.id === taskId ? {...task, completed: true} : task
    );
    setTodayTasks(updatedTasks);
    
    const completedTask = todayTasks.find(task => task.id === taskId);
    const taskTitle = completedTask ? completedTask.title : "";
    
    navigate("/task-complete", { 
      state: { 
        message: getRandomMotivationalMessage(),
        taskTitle: taskTitle
      }
    });
  };
  
  const deleteTask = (taskId) => {
    setTodayTasks(todayTasks.filter(task => task.id !== taskId));
  };

  const showTaskDetails = (task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  };

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-800 rounded-full p-1">
            <ChevronLeft size={18} className="text-white" />
          </div>
          <h1 className="text-lg font-medium">Today's Task</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-neutral-800 rounded-full w-8 h-8 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{currentMonth}</h2>
        <div className="flex gap-1">
          <button 
            className="bg-neutral-800 rounded-full p-1"
            onClick={goToPreviousWeek}
            aria-label="Previous week"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            className="bg-neutral-800 rounded-full p-1"
            onClick={goToNextWeek}
            aria-label="Next week"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between gap-2 mb-6 overflow-x-auto py-2">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(index)}
            className={`flex flex-col items-center rounded-lg px-3 py-2 min-w-[38px] transition-colors ${
              day.isActive 
                ? "bg-[#00A16C] text-white" 
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }`}
          >
            <span className="text-xs font-medium">{day.day}</span>
            <span className="text-lg font-bold">{day.date}</span>
          </button>
        ))}
      </div>
      
      <div className="relative">
        <div className="absolute top-0 left-0 space-y-[70px] text-xs text-neutral-400 font-medium">
          <div>9:00 AM</div>
          <div>10:30 AM</div>
          <div>1:00 PM</div>
          <div>3:00 PM</div>
          <div>5:00 PM</div>
        </div>

        {todayTasks.map((task, index) => (
          <div
            key={task.id}
            className={`absolute left-[50px] right-0 ${task.color} rounded-lg p-2 w-[85%] ${task.completed ? "opacity-50" : ""} cursor-pointer hover:brightness-90 transition-all`}
            style={{ top: `${index * 70}px` }}
            onClick={() => showTaskDetails(task)}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">{task.time}</span>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none" onClick={(e) => e.stopPropagation()}>
                  <div className="hover:bg-black/20 rounded-full p-1 transition-colors">
                    <MoreHorizontal size={14} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-800 border border-neutral-700">
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      completeTask(task.id);
                    }}
                    className="focus:bg-neutral-700 focus:text-white"
                    disabled={task.completed}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    <span>Complete Task</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    className="focus:bg-neutral-700 focus:text-white"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete Task</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h3 className={`text-sm font-bold ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
          </div>
        ))}

        <div className="absolute top-0 left-[40px] bottom-0 w-px bg-neutral-800 h-[350px]">
          {[0, 70, 140, 210, 280].map((position, index) => (
            <div key={index} className="absolute -left-1 w-2 h-2 rounded-full bg-neutral-800" style={{ top: position + 'px' }}></div>
          ))}
        </div>
      </div>

      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="bg-neutral-800 text-white border-neutral-700">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedTask?.title}
            </DialogTitle>
            <div className="text-sm text-neutral-400 mt-1">{selectedTask?.time}</div>
          </DialogHeader>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Description:</h4>
            <p className="text-sm text-neutral-300">{selectedTask?.description}</p>
          </div>
          <div className="flex justify-end mt-6 gap-2">
            <Button 
              variant="outline" 
              onClick={() => setTaskDialogOpen(false)}
              className="bg-neutral-700 hover:bg-neutral-600 text-white border-none"
            >
              Close
            </Button>
            {!selectedTask?.completed && (
              <Button 
                onClick={() => {
                  completeTask(selectedTask?.id);
                  setTaskDialogOpen(false);
                }}
                className="bg-[#00A16C] hover:bg-[#00A16C]/90"
              >
                Complete Task
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-[420px] bg-neutral-800 rounded-lg p-4 text-center">
        <h3 className="text-sm font-bold">One step at a time. You'll get there.</h3>
        <p className="text-xs text-neutral-400 mt-1">Break down large tasks into smaller, manageable steps for better progress.</p>
      </div>
    </div>
  );
}
