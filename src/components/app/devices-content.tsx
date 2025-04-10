
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Airplay, Battery, Bluetooth, Home, Info, Laptop, MessageSquare, 
  Mic, Moon, MoreVertical, Power, Smartphone, Tv, Wifi 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function DevicesContent() {
  const [devices, setDevices] = useState([
    { 
      id: 1, 
      name: "Smart Speaker", 
      type: "speaker", 
      connected: true, 
      battery: 80,
      icon: Home
    },
    { 
      id: 2, 
      name: "Smart TV", 
      type: "tv", 
      connected: false, 
      battery: null,
      icon: Tv
    },
    { 
      id: 3, 
      name: "Air Purifier", 
      type: "purifier", 
      connected: true, 
      battery: 45,
      icon: Mic
    },
    { 
      id: 4, 
      name: "Smartphone", 
      type: "phone", 
      connected: true, 
      battery: 92,
      icon: Smartphone
    },
    { 
      id: 5, 
      name: "Laptop", 
      type: "laptop", 
      connected: true, 
      battery: 66,
      icon: Laptop
    },
  ]);
  
  const { toast } = useToast();

  const toggleDeviceConnection = (deviceId: number) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, connected: !device.connected } 
        : device
    ));
    
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      toast({
        title: device.connected ? `${device.name} Disconnected` : `${device.name} Connected`,
        description: device.connected 
          ? `${device.name} has been disconnected` 
          : `${device.name} is now connected`,
      });
    }
  };

  const deviceCategories = [
    { name: "All", count: devices.length },
    { name: "Connected", count: devices.filter(d => d.connected).length },
    { name: "Disconnected", count: devices.filter(d => !d.connected).length },
  ];

  return (
    <div className="space-y-6 pt-4">
      <div>
        <h1 className="text-xl font-medium">Connected Devices</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {deviceCategories.map((category) => (
          <Button 
            key={category.name}
            variant={category.name === "All" ? "default" : "outline"}
            className={
              category.name === "All" 
                ? "bg-[#00A16C] hover:bg-[#00A16C]/90" 
                : "bg-[#252A37] text-white hover:bg-[#1A1F2C] border-none"
            }
            size="sm"
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">My Devices</h2>
          <Button size="sm" className="bg-[#252A37] text-white hover:bg-[#1A1F2C]">
            <Bluetooth className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
        
        <div className="space-y-3">
          {devices.map((device) => (
            <Card key={device.id} className="bg-[#252A37] border-none p-4 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${device.connected ? "bg-[#00A16C]" : "bg-[#1A1F2C]"}`}>
                    <device.icon className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{device.name}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>{device.connected ? "Connected" : "Disconnected"}</span>
                      {device.battery !== null && (
                        <div className="flex items-center ml-2">
                          <span>•</span>
                          <Battery className="h-3 w-3 ml-1 mr-1" />
                          <span>{device.battery}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Switch 
                    checked={device.connected} 
                    onCheckedChange={() => toggleDeviceConnection(device.id)}
                    className="mr-2"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Device Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Info className="mr-2 h-4 w-4" />
                        <span>Device Info</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Airplay className="mr-2 h-4 w-4" />
                        <span>Cast Screen</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Sleep Mode</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Power className="mr-2 h-4 w-4" />
                        <span>Power Off</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Connectivity</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="bg-[#252A37] border-none p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#00A16C] p-2 rounded-full">
                  <Wifi className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium">WiFi</h3>
                  <p className="text-xs text-gray-400">Connected to "Home Network"</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-[#1A1F2C] border-none text-white hover:bg-[#23293A]">
                Settings
              </Button>
            </div>
          </Card>
          <Card className="bg-[#252A37] border-none p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#1A1F2C] p-2 rounded-full">
                  <Bluetooth className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Bluetooth</h3>
                  <p className="text-xs text-gray-400">Disconnected</p>
                </div>
              </div>
              <Switch />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
