
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { BellRing, Calendar, Clock, Home, Mic, Volume2, Wifi, BarChart2, MessageSquare, ShoppingCart, CloudSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/theme-context";
import { motion } from "framer-motion";

export function DashboardContent() {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-6 pt-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`${theme === "dark" ? 'text-gray-400' : 'text-gray-500'}`}>Good Morning</h2>
          <h1 className="text-xl font-medium">Username</h1>
        </div>
        <Link to="/profile">
          <Avatar className="h-10 w-10 rounded-full border-2 border-[#00A16C] cursor-pointer hover:scale-105 transition-transform">
            <img src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
        </Link>
      </div>

      {/* Weather & Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/weather">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Card className={`${theme === "dark" ? "bg-[#252A37]" : "bg-white"} border-none p-3 rounded-lg ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"} shadow-md hover:shadow-lg transition-all`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">29°C</div>
                  <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Los Angeles, USA</div>
                </div>
                <div className="text-[#FFD639] animate-pulse-gentle">
                  <CloudSun size={32} />
                </div>
              </div>
            </Card>
          </motion.div>
        </Link>
        <Link to="/statistics">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Card className={`${theme === "dark" ? "bg-[#252A37]" : "bg-white"} border-none p-3 rounded-lg ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"} shadow-md hover:shadow-lg transition-all`}>
              <div className="text-xl font-bold">60%</div>
              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Productivity</div>
            </Card>
          </motion.div>
        </Link>
      </div>

      {/* Grocery Management Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Grocery Management</h2>
          <Link to="/grocery-management" className="text-xs text-[#00A16C] hover:text-[#00c082] font-medium transition-colors">See All</Link>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <Card className={`${theme === "dark" ? "bg-[#252A37]" : "bg-white"} border-none p-4 rounded-lg ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"} shadow-md hover:shadow-lg transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#00A16C] to-[#00c082] rounded-full p-3 shadow-md">
                  <ShoppingCart size={24} className="text-white animate-float" />
                </div>
                <div>
                  <h3 className="font-medium">Grocery List</h3>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>8 items in your cart</p>
                </div>
              </div>
              <Link 
                to="/grocery-management" 
                className={`${theme === "dark" ? "bg-[#1A1F2C]" : "bg-gray-100"} hover:${theme === "dark" ? "bg-[#23293A]" : "bg-gray-200"} transition-colors text-[#00A16C] hover:text-[#00c082] text-sm px-4 py-2 rounded-lg font-medium`}
              >
                Open
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Calendar Task Management Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Task Calendar</h2>
          <Link to="/calendar" className="text-xs text-[#00A16C] hover:text-[#00c082] font-medium transition-colors">See All</Link>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <Card className={`${theme === "dark" ? "bg-[#252A37]" : "bg-white"} border-none p-4 rounded-lg ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"} shadow-md hover:shadow-lg transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#4E7BFF] to-[#6989ff] rounded-full p-3 shadow-md">
                  <Calendar size={24} className="text-white animate-float" />
                </div>
                <div>
                  <h3 className="font-medium">Today's Tasks</h3>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>3 tasks scheduled today</p>
                </div>
              </div>
              <Link 
                to="/calendar" 
                className={`${theme === "dark" ? "bg-[#1A1F2C]" : "bg-gray-100"} hover:${theme === "dark" ? "bg-[#23293A]" : "bg-gray-200"} transition-colors text-[#4E7BFF] hover:text-[#6989ff] text-sm px-4 py-2 rounded-lg font-medium`}
              >
                Open
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Access Section */}
      <div>
        <h2 className="text-sm font-medium mb-3">Quick Access</h2>
        <div className="grid grid-cols-4 gap-4">
          <Link to="/wifi">
            <QuickAccessItem 
              icon={<Wifi size={20} className="text-[#F97316]" />} 
              label="Wi-Fi" 
              bgColor={theme === "dark" ? "from-[#F97316]/20 to-[#F97316]/10" : "from-[#F97316]/10 to-[#F97316]/5"} 
            />
          </Link>
          <Link to="/statistics">
            <QuickAccessItem 
              icon={<BarChart2 size={20} className="text-[#8B5CF6]" />} 
              label="Statistics" 
              bgColor={theme === "dark" ? "from-[#8B5CF6]/20 to-[#8B5CF6]/10" : "from-[#8B5CF6]/10 to-[#8B5CF6]/5"} 
            />
          </Link>
          <Link to="/sound">
            <QuickAccessItem 
              icon={<Volume2 size={20} className="text-[#0EA5E9]" />} 
              label="Sound" 
              bgColor={theme === "dark" ? "from-[#0EA5E9]/20 to-[#0EA5E9]/10" : "from-[#0EA5E9]/10 to-[#0EA5E9]/5"} 
            />
          </Link>
          <Link to="/alerts">
            <QuickAccessItem 
              icon={<BellRing size={20} className="text-[#D946EF]" />} 
              label="Alerts" 
              bgColor={theme === "dark" ? "from-[#D946EF]/20 to-[#D946EF]/10" : "from-[#D946EF]/10 to-[#D946EF]/5"} 
            />
          </Link>
        </div>
      </div>

      {/* Devices Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Devices</h2>
          <Link to="/devices" className="text-xs text-[#00A16C] hover:text-[#00c082] font-medium transition-colors">See All</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Link to="/devices">
            <DeviceItem 
              icon={<Home className="text-white" />} 
              label="Speaker" 
              status="Connected" 
              bgColor="from-[#1EAEDB] to-[#33C3F0]"
            />
          </Link>
          <Link to="/devices">
            <DeviceItem 
              icon={<MessageSquare className="text-white" />} 
              label="Smart TV" 
              status="Disconnected" 
              bgColor="from-[#9b87f5] to-[#a599f7]"
            />
          </Link>
          <Link to="/devices">
            <DeviceItem 
              icon={<Mic className="text-white" />} 
              label="Air Purifier" 
              status="Connected" 
              bgColor="from-[#F97316] to-[#fb8f4c]"
            />
          </Link>
        </div>
      </div>

      {/* Daily Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Today's Tasks</h2>
          <Link to="/task-management" className="text-xs text-[#00A16C] hover:text-[#00c082] font-medium transition-colors">See All</Link>
        </div>
        <div className="space-y-3">
          <Link to="/task-management">
            <TaskItem 
              title="Meeting with Client" 
              time="10:30 AM" 
              completed={false} 
            />
          </Link>
          <Link to="/task-management">
            <TaskItem 
              title="Check Emails" 
              time="12:00 PM" 
              completed={true} 
            />
          </Link>
          <Link to="/task-management">
            <TaskItem 
              title="Lunch with Team" 
              time="1:30 PM" 
              completed={false} 
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuickAccessItem({ icon, label, bgColor }: { icon: React.ReactNode; label: string; bgColor: string }) {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      whileHover={{ scale: 1.08 }} 
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="flex flex-col items-center"
    >
      <div className={`bg-gradient-to-br ${bgColor} ${theme === "dark" ? "bg-[#252A37]/80" : "bg-white"} rounded-full p-3 mb-1 shadow-md`}>
        {icon}
      </div>
      <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} font-medium`}>{label}</span>
    </motion.div>
  );
}

function DeviceItem({ icon, label, status, bgColor }: { icon: React.ReactNode; label: string; status: string; bgColor: string }) {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`${theme === "dark" ? "bg-[#252A37]" : "bg-white"} rounded-lg p-3 flex flex-col items-center ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"} shadow-md hover:shadow-lg transition-all`}
    >
      <div className={`bg-gradient-to-br ${bgColor} rounded-full p-2 mb-2 shadow-md`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
      <span className={`text-xs ${status === "Connected" ? "text-[#00A16C]" : "text-[#F97316]"} font-medium`}>{status}</span>
    </motion.div>
  );
}

function TaskItem({ title, time, completed }: { title: string; time: string; completed: boolean }) {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`${theme === "dark" ? "bg-[#252A37]" : "bg-white"} rounded-lg p-3 flex items-center justify-between ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"} ${completed ? "opacity-70" : ""} shadow-md hover:shadow-lg transition-all`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${completed ? "bg-[#00A16C]" : "bg-[#FFC107]"}`}></div>
        <div>
          <div className={`text-sm font-medium ${completed ? "line-through" : ""}`}>{title}</div>
          <div className={`flex items-center text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            <Clock size={12} className="mr-1" />
            {time}
          </div>
        </div>
      </div>
      <div className={`${theme === "dark" ? "bg-[#1A1F2C]" : "bg-gray-100"} rounded-full p-1 shadow-sm`}>
        <Calendar size={16} className={completed ? "text-[#00A16C]" : ""} />
      </div>
    </motion.div>
  );
}
