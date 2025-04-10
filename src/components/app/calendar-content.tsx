
import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, User } from "lucide-react";
import { format, addDays, subDays } from "date-fns";

export function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(16); // Default to current day
  const currentMonth = format(currentDate, "MMMM yyyy");
  
  // Generate calendar days based on current date
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
  
  // Mock tasks for the current day - will change based on selected date
  const [todayTasks, setTodayTasks] = useState([
    { id: 1, time: "9:00 AM", title: "Team meeting", color: "bg-blue-500" },
    { id: 2, time: "10:30 AM", title: "Client call", color: "bg-purple-500" },
    { id: 3, time: "12:00 PM", title: "Lunch break", color: "bg-orange-500" },
    { id: 4, time: "2:30 PM", title: "Project review", color: "bg-green-500" },
    { id: 5, time: "4:00 PM", title: "Team check-in", color: "bg-blue-500" },
    { id: 6, time: "5:30 PM", title: "End of day", color: "bg-red-500" },
  ]);
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newDate = subDays(currentDate, 7);
    setCurrentDate(newDate);
    setCalendarDays(generateCalendarDays());
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    setCurrentDate(newDate);
    setCalendarDays(generateCalendarDays());
  };
  
  // Handle day selection
  const handleDayClick = (index) => {
    const newCalendarDays = calendarDays.map((day, i) => ({
      ...day,
      isActive: i === index
    }));
    
    setCalendarDays(newCalendarDays);
    setSelectedDay(parseInt(newCalendarDays[index].date));
    
    // Update tasks based on selected day
    // For demo purposes, we're just changing the time prefix to show interactivity
    const taskPrefix = `${newCalendarDays[index].date}:`;
    const updatedTasks = [
      { id: 1, time: `${taskPrefix}00 AM`, title: "Team meeting", color: "bg-blue-500" },
      { id: 2, time: `${taskPrefix}30 AM`, title: "Client call", color: "bg-purple-500" },
      { id: 3, time: `${taskPrefix}00 PM`, title: "Lunch break", color: "bg-orange-500" },
      { id: 4, time: `${taskPrefix}30 PM`, title: "Project review", color: "bg-green-500" },
      { id: 5, time: `${taskPrefix}00 PM`, title: "Team check-in", color: "bg-blue-500" },
      { id: 6, time: `${taskPrefix}30 PM`, title: "End of day", color: "bg-red-500" },
    ];
    
    setTodayTasks(updatedTasks);
  };

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
      
      {/* Date Picker */}
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
      
      {/* Task Timeline */}
      <div className="relative">
        {/* Time Labels */}
        <div className="absolute top-0 left-0 space-y-[70px] text-xs text-neutral-400 font-medium">
          <div>9:00 AM</div>
          <div>10:30 AM</div>
          <div>1:00 PM</div>
          <div>3:00 PM</div>
          <div>5:00 PM</div>
        </div>

        {/* Dynamic Tasks */}
        {todayTasks.map((task, index) => (
          <div
            key={task.id}
            className={`absolute left-[50px] right-0 ${task.color} rounded-lg p-2 w-[85%]`}
            style={{ top: `${index * 70}px` }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">{task.time}</span>
              <button>
                <MoreHorizontal size={14} />
              </button>
            </div>
            <h3 className="text-sm font-bold">{task.title}</h3>
          </div>
        ))}

        {/* Vertical time line */}
        <div className="absolute top-0 left-[40px] bottom-0 w-px bg-neutral-800 h-[350px]">
          {[0, 70, 140, 210, 280].map((position, index) => (
            <div key={index} className="absolute -left-1 w-2 h-2 rounded-full bg-neutral-800" style={{ top: position + 'px' }}></div>
          ))}
        </div>
      </div>

      {/* Bottom message */}
      <div className="mt-[370px] bg-neutral-800 rounded-lg p-4 text-center">
        <h3 className="text-sm font-bold">One step at a time. You'll get there.</h3>
        <p className="text-xs text-neutral-400 mt-1">Break down large tasks into smaller, manageable steps for better progress.</p>
      </div>
    </div>
  );
}
