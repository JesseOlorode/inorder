
import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, User } from "lucide-react";
import { format } from "date-fns";

export function CalendarContent() {
  const [currentDate] = useState(new Date());
  const currentMonth = format(currentDate, "MMMM yyyy");
  
  // Mock tasks for the current day
  const todayTasks = [
    { id: 1, time: "9:00 AM", title: "Team meeting", color: "bg-blue-500" },
    { id: 2, time: "10:30 AM", title: "Client call", color: "bg-purple-500" },
    { id: 3, time: "12:00 PM", title: "Lunch break", color: "bg-orange-500" },
    { id: 4, time: "2:30 PM", title: "Project review", color: "bg-green-500" },
    { id: 5, time: "4:00 PM", title: "Team check-in", color: "bg-blue-500" },
    { id: 6, time: "5:30 PM", title: "End of day", color: "bg-red-500" },
  ];
  
  // Mock calendar days
  const calendarDays = [
    { date: 14, day: "Mon" },
    { date: 15, day: "Tue" },
    { date: 16, day: "Wed" },
    { date: 17, day: "Thu", isActive: true },
    { date: 18, day: "Fri" },
    { date: 19, day: "Sat" },
    { date: 20, day: "Sun" },
  ];

  return (
    <div className="bg-black min-h-screen text-white p-4">
      {/* Header */}
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
      
      {/* Month */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{currentMonth}</h2>
        <div className="flex gap-1">
          <button className="bg-neutral-800 rounded-full p-1">
            <ChevronLeft size={16} />
          </button>
          <button className="bg-neutral-800 rounded-full p-1">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Date Picker */}
      <div className="flex justify-between gap-2 mb-6 overflow-x-auto py-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center rounded-lg px-3 py-2 min-w-[38px] ${
              day.isActive 
                ? "bg-[#00A16C] text-white" 
                : "bg-neutral-800 text-white"
            }`}
          >
            <span className="text-xs font-medium">{day.day}</span>
            <span className="text-lg font-bold">{day.date}</span>
          </div>
        ))}
      </div>
      
      {/* Time Labels */}
      <div className="space-y-6 mb-10">
        {["8:00 AM", "9:00 AM", "10:00 AM", "12:00 PM", "1:00 PM", "3:00 PM", "5:00 PM"].map((time, index) => (
          <div key={index} className="text-xs text-neutral-400 font-medium">
            {time}
          </div>
        ))}
      </div>

      {/* Task Cards */}
      <div className="relative">
        {/* Task at 9:00 AM */}
        <div className="absolute top-[30px] left-[50px] right-0 bg-blue-500 rounded-lg p-2 w-[85%]">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">9:00 AM - 10:00 AM</span>
            <button>
              <MoreHorizontal size={14} />
            </button>
          </div>
          <h3 className="text-sm font-bold">Team Meeting</h3>
        </div>

        {/* Task at 10:30 AM */}
        <div className="absolute top-[100px] left-[50px] right-0 bg-purple-500 rounded-lg p-2 w-[85%]">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">10:30 AM - 11:30 AM</span>
            <button>
              <MoreHorizontal size={14} />
            </button>
          </div>
          <h3 className="text-sm font-bold">Client Call</h3>
        </div>

        {/* Task at 1:00 PM */}
        <div className="absolute top-[230px] left-[50px] right-0 bg-orange-500 rounded-lg p-2 w-[85%]">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">1:00 PM - 2:00 PM</span>
            <button>
              <MoreHorizontal size={14} />
            </button>
          </div>
          <h3 className="text-sm font-bold">Lunch Break</h3>
        </div>

        {/* Task at 3:00 PM */}
        <div className="absolute top-[300px] left-[50px] right-0 bg-green-500 rounded-lg p-2 w-[85%]">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">3:00 PM - 4:00 PM</span>
            <button>
              <MoreHorizontal size={14} />
            </button>
          </div>
          <h3 className="text-sm font-bold">Project Review</h3>
        </div>

        {/* Task at 5:00 PM */}
        <div className="absolute top-[370px] left-[50px] right-0 bg-red-500 rounded-lg p-2 w-[85%]">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">5:00 PM - 6:00 PM</span>
            <button>
              <MoreHorizontal size={14} />
            </button>
          </div>
          <h3 className="text-sm font-bold">End of Day</h3>
        </div>

        {/* Vertical time line */}
        <div className="absolute top-0 left-[40px] bottom-0 w-px bg-neutral-800 h-[400px]">
          {[0, 70, 140, 210, 280, 350].map((position, index) => (
            <div key={index} className="absolute -left-1 w-2 h-2 rounded-full bg-neutral-800" style={{ top: position + 'px' }}></div>
          ))}
        </div>
      </div>

      {/* Bottom message */}
      <div className="mt-[440px] bg-neutral-800 rounded-lg p-4 text-center">
        <h3 className="text-sm font-bold">One step at a time. You'll get there.</h3>
        <p className="text-xs text-neutral-400 mt-1">Break down large tasks into smaller, manageable steps for better progress.</p>
      </div>
    </div>
  );
}
