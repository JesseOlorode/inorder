
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { BellRing, Calendar, Clock, Home, Mic, Volume2, Wifi, BarChart2, Settings, MessageSquare } from "lucide-react";

export function DashboardContent() {
  return (
    <div className="space-y-6 pt-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-400">Good Morning</h2>
          <h1 className="text-xl font-medium">Username</h1>
        </div>
        <Avatar className="h-10 w-10 rounded-full border-2 border-[#00C853]">
          <img src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </div>

      {/* Weather & Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#252A37] border-none p-3 rounded-lg">
          <div className="text-xl font-bold">29°C</div>
          <div className="text-xs text-gray-400">Los Angeles, USA</div>
        </Card>
        <Card className="bg-[#252A37] border-none p-3 rounded-lg">
          <div className="text-xl font-bold">60%</div>
          <div className="text-xs text-gray-400">Productivity</div>
        </Card>
      </div>

      {/* Quick Access Section */}
      <div>
        <h2 className="text-sm font-medium mb-3">Quick Access</h2>
        <div className="grid grid-cols-4 gap-4">
          <QuickAccessItem icon={<Wifi />} label="Wi-Fi" />
          <QuickAccessItem icon={<BarChart2 />} label="Statistics" />
          <QuickAccessItem icon={<Volume2 />} label="Sound" />
          <QuickAccessItem icon={<BellRing />} label="Alerts" />
        </div>
      </div>

      {/* Devices Section */}
      <div>
        <h2 className="text-sm font-medium mb-3">Devices</h2>
        <div className="grid grid-cols-3 gap-4">
          <DeviceItem 
            icon={<Home className="text-white" />} 
            label="Speaker" 
            status="Connected" 
          />
          <DeviceItem 
            icon={<MessageSquare className="text-white" />} 
            label="Smart TV" 
            status="Disconnected" 
          />
          <DeviceItem 
            icon={<Mic className="text-white" />} 
            label="Air Purifier" 
            status="Connected" 
          />
        </div>
      </div>

      {/* Daily Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">Today's Tasks</h2>
          <button className="text-xs text-[#00C853]">See All</button>
        </div>
        <div className="space-y-3">
          <TaskItem 
            title="Meeting with Client" 
            time="10:30 AM" 
            completed={false} 
          />
          <TaskItem 
            title="Check Emails" 
            time="12:00 PM" 
            completed={true} 
          />
          <TaskItem 
            title="Lunch with Team" 
            time="1:30 PM" 
            completed={false} 
          />
        </div>
      </div>
    </div>
  );
}

function QuickAccessItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#252A37] rounded-full p-3 mb-1">
        {icon}
      </div>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

function DeviceItem({ icon, label, status }: { icon: React.ReactNode; label: string; status: string }) {
  return (
    <div className="bg-[#252A37] rounded-lg p-3 flex flex-col items-center">
      <div className="bg-[#00C853] rounded-full p-2 mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs text-gray-400">{status}</span>
    </div>
  );
}

function TaskItem({ title, time, completed }: { title: string; time: string; completed: boolean }) {
  return (
    <div className="bg-[#252A37] rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${completed ? "bg-[#00C853]" : "bg-[#FFC107]"}`}></div>
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="flex items-center text-xs text-gray-400">
            <Clock size={12} className="mr-1" />
            {time}
          </div>
        </div>
      </div>
      <div className="bg-[#1A1F2C] rounded-full p-1">
        <Calendar size={16} />
      </div>
    </div>
  );
}
