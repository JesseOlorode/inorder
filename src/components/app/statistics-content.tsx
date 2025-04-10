
import { Card } from "@/components/ui/card";
import { BarChart, LineChart } from "recharts";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Clock, TrendingUp } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export function StatisticsContent() {
  const { theme } = useTheme();
  
  const dailyData = [
    { name: "Mon", productivity: 65, tasks: 4 },
    { name: "Tue", productivity: 59, tasks: 3 },
    { name: "Wed", productivity: 80, tasks: 6 },
    { name: "Thu", productivity: 81, tasks: 5 },
    { name: "Fri", productivity: 56, tasks: 4 },
    { name: "Sat", productivity: 55, tasks: 2 },
    { name: "Sun", productivity: 40, tasks: 1 },
  ];

  const weeklyData = [
    { name: "Week 1", productivity: 52, tasks: 14 },
    { name: "Week 2", productivity: 58, tasks: 16 },
    { name: "Week 3", productivity: 61, tasks: 18 },
    { name: "Week 4", productivity: 65, tasks: 21 },
  ];

  const monthlyData = [
    { name: "Jan", productivity: 45, tasks: 42 },
    { name: "Feb", productivity: 52, tasks: 51 },
    { name: "Mar", productivity: 49, tasks: 45 },
    { name: "Apr", productivity: 63, tasks: 62 },
    { name: "May", productivity: 59, tasks: 55 },
    { name: "Jun", productivity: 66, tasks: 68 },
  ];

  const statsCards = [
    { title: "Avg. Productivity", value: "62%", icon: <Activity className="text-[#00A16C]" /> },
    { title: "Total Tasks", value: "267", icon: <Clock className="text-[#00A16C]" /> },
    { title: "Growth", value: "+12%", icon: <TrendingUp className="text-[#00A16C]" /> },
  ];

  return (
    <div className="space-y-6 pt-4">
      <div>
        <h1 className="text-xl font-medium mb-4">Statistics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsCards.map((card, index) => (
          <Card key={index} className={`${theme === "dark" ? "bg-[#252A37]" : "bg-white"} border-none p-3 rounded-lg ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"}`}>
            <div className="flex items-center gap-2">
              <div className={`${theme === "dark" ? "bg-[#1A1F2C]" : "bg-gray-100"} p-2 rounded-full flex-shrink-0`}>
                {card.icon}
              </div>
              <div className="min-w-0">
                <h3 className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} truncate`}>{card.title}</h3>
                <p className="text-lg font-bold">{card.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className={`${theme === "dark" ? "bg-[#252A37]" : "bg-white"} border-none p-4 rounded-lg ${theme === "dark" ? "text-white" : "text-[#1A1F2C]"}`}>
        <h2 className="text-lg font-medium mb-4">Productivity Overview</h2>
        <Tabs defaultValue="daily">
          <TabsList className={`mb-4 ${theme === "dark" ? "bg-[#1A1F2C]" : "bg-gray-100"} w-full justify-start`}>
            <TabsTrigger value="daily" className="text-sm px-3">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="text-sm px-3">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-sm px-3">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#333" : "#e5e5e5"} />
                <XAxis dataKey="name" stroke={theme === "dark" ? "#999" : "#666"} fontSize={12} />
                <YAxis stroke={theme === "dark" ? "#999" : "#666"} fontSize={12} width={30} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === "dark" ? '#1A1F2C' : '#ffffff', 
                    border: 'none',
                    color: theme === "dark" ? '#ffffff' : '#1A1F2C'
                  }}
                  labelStyle={{ 
                    color: theme === "dark" ? 'white' : 'black' 
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="productivity" name="Productivity %" fill="#00A16C" />
                <Bar dataKey="tasks" name="Tasks" fill="#4E7BFF" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="weekly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#333" : "#e5e5e5"} />
                <XAxis dataKey="name" stroke={theme === "dark" ? "#999" : "#666"} fontSize={12} />
                <YAxis stroke={theme === "dark" ? "#999" : "#666"} fontSize={12} width={30} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === "dark" ? '#1A1F2C' : '#ffffff', 
                    border: 'none',
                    color: theme === "dark" ? '#ffffff' : '#1A1F2C'
                  }}
                  labelStyle={{ 
                    color: theme === "dark" ? 'white' : 'black' 
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="productivity" name="Productivity %" stroke="#00A16C" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="tasks" name="Tasks" stroke="#4E7BFF" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="monthly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#333" : "#e5e5e5"} />
                <XAxis dataKey="name" stroke={theme === "dark" ? "#999" : "#666"} fontSize={12} />
                <YAxis stroke={theme === "dark" ? "#999" : "#666"} fontSize={12} width={30} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === "dark" ? '#1A1F2C' : '#ffffff', 
                    border: 'none',
                    color: theme === "dark" ? '#ffffff' : '#1A1F2C'
                  }}
                  labelStyle={{ 
                    color: theme === "dark" ? 'white' : 'black' 
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="productivity" name="Productivity %" stroke="#00A16C" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="tasks" name="Tasks" stroke="#4E7BFF" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
