
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Home, 
  Wifi, 
  Smartphone, 
  Tv, 
  Speaker, 
  Laptop, 
  AlertCircle, 
  Check, 
  Plus, 
  Lock,
  Unlock,
  Power,
  Mic
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Device = {
  id: number;
  name: string;
  type: "speaker" | "tv" | "smartphone" | "laptop" | "purifier";
  status: "connected" | "disconnected";
  powered: boolean;
  locked?: boolean;
  signal?: number;
  battery?: number;
  icon: React.ReactNode;
};

export function DevicesContent() {
  const [devices, setDevices] = useState<Device[]>([
    { 
      id: 1, 
      name: "Living Room Speaker", 
      type: "speaker", 
      status: "connected", 
      powered: true, 
      signal: 85,
      icon: <Speaker className="text-white" /> 
    },
    { 
      id: 2, 
      name: "Smart TV", 
      type: "tv", 
      status: "disconnected", 
      powered: false, 
      signal: 0,
      icon: <Tv className="text-white" /> 
    },
    { 
      id: 3, 
      name: "Air Purifier", 
      type: "purifier", 
      status: "connected", 
      powered: true, 
      signal: 90,
      icon: <Mic className="text-white" /> 
    },
    { 
      id: 4, 
      name: "iPhone 13", 
      type: "smartphone", 
      status: "connected", 
      powered: true, 
      locked: true,
      battery: 75,
      signal: 80,
      icon: <Smartphone className="text-white" /> 
    },
    { 
      id: 5, 
      name: "MacBook Pro", 
      type: "laptop", 
      status: "disconnected", 
      powered: false, 
      battery: 20,
      icon: <Laptop className="text-white" /> 
    }
  ]);
  
  const { toast } = useToast();

  const togglePower = (id: number) => {
    setDevices(devices.map(device => {
      if (device.id === id) {
        const newPowered = !device.powered;
        return {
          ...device,
          powered: newPowered,
          status: newPowered ? "connected" : "disconnected"
        };
      }
      return device;
    }));
    
    const device = devices.find(d => d.id === id);
    toast({
      title: device?.powered ? `${device.name} turned off` : `${device.name} turned on`,
      description: device?.powered ? "Device has been powered off" : "Device is now powered on and connected",
    });
  };
  
  const toggleLock = (id: number) => {
    setDevices(devices.map(device => {
      if (device.id === id && device.locked !== undefined) {
        return { ...device, locked: !device.locked };
      }
      return device;
    }));
    
    const device = devices.find(d => d.id === id);
    if (device && device.locked !== undefined) {
      toast({
        title: device.locked ? `${device.name} unlocked` : `${device.name} locked`,
        description: device.locked ? "Device has been unlocked" : "Device has been locked for security",
      });
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Connected Devices</h1>
        <Button size="sm" className="bg-[#00A16C] hover:bg-[#00A16C]/90 h-8 px-3">
          <Plus size={16} className="mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <Card key={device.id} className="bg-[#252A37] border-none p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${device.status === "connected" ? "bg-[#00A16C]" : "bg-[#1A1F2C]"}`}>
                  {device.icon}
                </div>
                <div>
                  <h3 className="font-medium">{device.name}</h3>
                  <div className="flex items-center">
                    <span className={`text-xs ${device.status === "connected" ? "text-green-400" : "text-gray-400"}`}>
                      {device.status === "connected" ? "Connected" : "Disconnected"}
                    </span>
                    {device.signal !== undefined && device.status === "connected" && (
                      <span className="text-xs text-gray-400 ml-2">• Signal: {device.signal}%</span>
                    )}
                    {device.battery !== undefined && (
                      <span className="text-xs text-gray-400 ml-2">• Battery: {device.battery}%</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={`h-8 w-8 rounded-full ${device.powered ? "bg-[#00A16C] text-white" : "bg-[#1A1F2C] text-gray-400"} hover:text-white border-none`}
                  onClick={() => togglePower(device.id)}
                >
                  <Power size={14} />
                </Button>
                
                {device.locked !== undefined && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-[#1A1F2C] text-gray-400 hover:text-white border-none"
                    onClick={() => toggleLock(device.id)}
                  >
                    {device.locked ? <Lock size={14} /> : <Unlock size={14} />}
                  </Button>
                )}
              </div>
            </div>
            
            {device.powered && device.status === "connected" && (
              <div className="flex justify-between mt-4 pt-4 border-t border-[#1A1F2C]">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-[#1A1F2C] hover:bg-[#23293A] text-white border-none text-xs px-3 h-8"
                >
                  Controls
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-[#1A1F2C] hover:bg-[#23293A] text-white border-none text-xs px-3 h-8"
                >
                  Settings
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-[#1A1F2C] hover:bg-[#23293A] text-white border-none text-xs px-3 h-8"
                >
                  Details
                </Button>
              </div>
            )}
            
            {(!device.powered || device.status === "disconnected") && (
              <div className="flex justify-center mt-4 pt-4 border-t border-[#1A1F2C]">
                <Button 
                  size="sm" 
                  className="bg-[#00A16C] hover:bg-[#00A16C]/90 h-8 px-4"
                  onClick={() => togglePower(device.id)}
                >
                  {device.powered ? "Reconnect" : "Power On"}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
