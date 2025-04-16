
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
  Mic,
  Info,
  Settings,
  Sliders,
  Volume2,
  VolumeX,
  RefreshCw,
  PlayCircle,
  PauseCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";

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
  volume?: number;
  description?: string;
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
      volume: 60,
      description: "Premium wireless speaker with voice control capability. Supports multiple streaming services.",
      icon: <Speaker className="text-white" /> 
    },
    { 
      id: 2, 
      name: "Smart TV", 
      type: "tv", 
      status: "disconnected", 
      powered: false, 
      signal: 0,
      description: "4K Ultra HD Smart TV with HDR support. Voice control and streaming apps built-in.",
      icon: <Tv className="text-white" /> 
    },
    { 
      id: 3, 
      name: "Air Purifier", 
      type: "purifier", 
      status: "connected", 
      powered: true, 
      signal: 90,
      description: "HEPA filter air purifier with air quality monitoring and automatic mode.",
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
      description: "iOS smartphone with Face ID security. 128GB storage capacity.",
      icon: <Smartphone className="text-white" /> 
    },
    { 
      id: 5, 
      name: "MacBook Pro", 
      type: "laptop", 
      status: "disconnected", 
      powered: false, 
      battery: 20,
      description: "M1 chip MacBook Pro with 16GB RAM and 512GB SSD. Supports multiple displays.",
      icon: <Laptop className="text-white" /> 
    }
  ]);
  
  const [dialogType, setDialogType] = useState<"details" | "controls" | "settings" | "info" | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
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
  
  const openDeviceDialog = (device: Device, type: "details" | "controls" | "settings") => {
    setSelectedDevice(device);
    setDialogType(type);
  };
  
  const openAboutDialog = () => {
    setDialogType("info");
  };
  
  const closeDialog = () => {
    setDialogType(null);
    setSelectedDevice(null);
  };
  
  const adjustVolume = (volume: number) => {
    if (!selectedDevice) return;
    
    setDevices(devices.map(device => {
      if (device.id === selectedDevice.id) {
        return { ...device, volume };
      }
      return device;
    }));
    
    // Update the selected device too
    setSelectedDevice({...selectedDevice, volume});
    
    toast({
      title: `${selectedDevice.name} volume adjusted`,
      description: `Volume set to ${volume}%`,
    });
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Connected Devices</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm" 
            className="bg-[#1A1F2C] hover:bg-[#23293A] h-8 px-3 text-white border-none"
            onClick={openAboutDialog}
          >
            <Info size={16} className="mr-1" />
            About
          </Button>
          <Button size="sm" className="bg-[#00A16C] hover:bg-[#00A16C]/90 h-8 px-3">
            <Plus size={16} className="mr-1" />
            Add
          </Button>
        </div>
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
                  onClick={() => openDeviceDialog(device, "controls")}
                >
                  Controls
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-[#1A1F2C] hover:bg-[#23293A] text-white border-none text-xs px-3 h-8"
                  onClick={() => openDeviceDialog(device, "settings")}
                >
                  Settings
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-[#1A1F2C] hover:bg-[#23293A] text-white border-none text-xs px-3 h-8"
                  onClick={() => openDeviceDialog(device, "details")}
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
      
      {/* Device Controls Dialog */}
      <Dialog open={dialogType === "controls"} onOpenChange={open => !open && closeDialog()}>
        <DialogContent className="bg-[#252A37] text-white border-[#1A1F2C]">
          <DialogHeader>
            <DialogTitle>{selectedDevice?.name} Controls</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {selectedDevice?.type === "speaker" && (
              <div className="space-y-4">
                <div className="flex justify-center gap-6">
                  <Button variant="outline" className="rounded-full p-3 h-12 w-12 bg-[#1A1F2C] border-none">
                    <VolumeX size={24} />
                  </Button>
                  <Button variant="outline" className="rounded-full p-3 h-12 w-12 bg-[#00A16C] border-none">
                    <PauseCircle size={24} />
                  </Button>
                  <Button variant="outline" className="rounded-full p-3 h-12 w-12 bg-[#1A1F2C] border-none">
                    <Volume2 size={24} />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm">Volume: {selectedDevice.volume}%</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={selectedDevice.volume} 
                    onChange={(e) => adjustVolume(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            
            {selectedDevice?.type === "tv" && (
              <div className="space-y-4">
                <div className="flex justify-center gap-6">
                  <Button variant="outline" className="rounded-full p-3 h-12 w-12 bg-[#1A1F2C] border-none">
                    <PlayCircle size={24} />
                  </Button>
                  <Button variant="outline" className="rounded-full p-3 h-12 w-12 bg-[#1A1F2C] border-none">
                    <PauseCircle size={24} />
                  </Button>
                </div>
              </div>
            )}
            
            {selectedDevice?.type !== "speaker" && selectedDevice?.type !== "tv" && (
              <div className="text-center">
                <p>Remote control not available for this device type.</p>
                <Button 
                  onClick={closeDialog} 
                  className="mt-4 bg-[#00A16C] hover:bg-[#00A16C]/90"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Device Settings Dialog */}
      <Dialog open={dialogType === "settings"} onOpenChange={open => !open && closeDialog()}>
        <DialogContent className="bg-[#252A37] text-white border-[#1A1F2C]">
          <DialogHeader>
            <DialogTitle>{selectedDevice?.name} Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span>Power Saving Mode</span>
              <Switch />
            </div>
            <div className="flex justify-between items-center">
              <span>Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <span>Auto-Update</span>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full bg-[#1A1F2C] text-white border-none mt-4">
              <RefreshCw size={16} className="mr-2" /> Check for Updates
            </Button>
          </div>
          <DialogFooter>
            <Button 
              onClick={closeDialog} 
              className="bg-[#00A16C] hover:bg-[#00A16C]/90"
            >
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Device Details Dialog */}
      <Dialog open={dialogType === "details"} onOpenChange={open => !open && closeDialog()}>
        <DialogContent className="bg-[#252A37] text-white border-[#1A1F2C]">
          <DialogHeader>
            <DialogTitle>{selectedDevice?.name} Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Device Information</h3>
              <div className="bg-[#1A1F2C] p-3 rounded-md">
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-400">Name:</span>
                  <span>{selectedDevice?.name}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-400">Type:</span>
                  <span className="capitalize">{selectedDevice?.type}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-400">Status:</span>
                  <span className="capitalize">{selectedDevice?.status}</span>
                </div>
                {selectedDevice?.signal !== undefined && (
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-gray-400">Signal Strength:</span>
                    <span>{selectedDevice.signal}%</span>
                  </div>
                )}
                {selectedDevice?.battery !== undefined && (
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-gray-400">Battery:</span>
                    <span>{selectedDevice.battery}%</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-gray-400">{selectedDevice?.description}</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={closeDialog} 
              className="bg-[#00A16C] hover:bg-[#00A16C]/90"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* About Dialog */}
      <Dialog open={dialogType === "info"} onOpenChange={open => !open && closeDialog()}>
        <DialogContent className="bg-[#252A37] text-white border-[#1A1F2C]">
          <DialogHeader>
            <DialogTitle className="text-xl">About InOrder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <h3 className="text-base font-medium">Smart Home Management</h3>
              <p className="text-sm text-gray-400">Version 1.0.0</p>
            </div>
            
            <p className="text-sm text-gray-300">
              InOrder helps you organize your tasks, manage groceries, control smart home devices,
              and much more - all in one place.
            </p>
            
            <div className="bg-[#1A1F2C] p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Created by</h4>
              <p className="text-sm text-gray-300">Olorode Corporations</p>
            </div>
            
            <p className="text-xs text-gray-400">
              © 2025 Olorode Corporations. All rights reserved.
            </p>
          </div>
          <DialogFooter>
            <Button 
              onClick={closeDialog} 
              className="bg-[#00A16C] hover:bg-[#00A16C]/90"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
