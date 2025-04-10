
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function CalendarContent() {
  // Current date for display
  const currentMonth = "November 2024";
  const currentDate = new Date();
  
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
    <div className="py-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">Today's Task</h1>
        <div className="flex items-center gap-1">
          <button className="bg-[#252A37] rounded-full p-1 text-white">
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium">{currentMonth}</span>
          <button className="bg-[#252A37] rounded-full p-1 text-white">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Date Picker */}
      <div className="flex justify-between mb-6 overflow-x-auto py-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              day.isActive 
                ? "bg-[#00A16C] text-white" 
                : "bg-[#252A37] text-white"
            } rounded-lg px-3 py-2 min-w-[40px]`}
          >
            <span className="text-xs font-medium">{day.day}</span>
            <span className="text-lg font-bold">{day.date}</span>
          </div>
        ))}
      </div>
      
      {/* Task Timeline */}
      <div className="space-y-4">
        {todayTasks.map((task) => (
          <div key={task.id} className="flex gap-4">
            {/* Time Column */}
            <div className="w-16 text-right">
              <span className="text-xs text-gray-400">{task.time}</span>
            </div>
            
            {/* Task Column */}
            <div className="flex-1 bg-[#252A37] rounded-lg p-3 relative text-white">
              {/* Colored indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.color} rounded-l-lg`}></div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium pl-2">{task.title}</span>
                <button>
                  <MoreHorizontal size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
