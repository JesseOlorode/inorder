
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Wifi, WifiOff, Plus, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function WiFiContent() {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [availableNetworks, setAvailableNetworks] = useState([
    { id: 1, name: "Home Network", secured: true, strength: "High", connected: true },
    { id: 2, name: "Neighbor's WiFi", secured: true, strength: "Medium", connected: false },
    { id: 3, name: "Public WiFi", secured: false, strength: "Low", connected: false },
    { id: 4, name: "Office Network", secured: true, strength: "High", connected: false },
  ]);
  const [addNetworkOpen, setAddNetworkOpen] = useState(false);
  const [newNetworkName, setNewNetworkName] = useState("");
  const [newNetworkPassword, setNewNetworkPassword] = useState("");
  const { toast } = useToast();

  const toggleWifi = () => {
    setWifiEnabled(!wifiEnabled);
    toast({
      title: wifiEnabled ? "WiFi Disabled" : "WiFi Enabled",
      description: wifiEnabled ? "WiFi has been turned off" : "Scanning for networks...",
    });
  };

  const connectToNetwork = (networkId: number) => {
    setAvailableNetworks(
      availableNetworks.map((network) => ({
        ...network,
        connected: network.id === networkId,
      }))
    );
    
    const network = availableNetworks.find((n) => n.id === networkId);
    toast({
      title: `Connected to ${network?.name}`,
      description: "Your device is now connected to this network",
    });
  };

  const addNetwork = () => {
    if (!newNetworkName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a network name",
        variant: "destructive"
      });
      return;
    }
    
    // Add the new network
    const newId = Math.max(...availableNetworks.map(n => n.id)) + 1;
    const newNetwork = {
      id: newId,
      name: newNetworkName,
      secured: newNetworkPassword.length > 0,
      strength: "Medium",
      connected: false
    };
    
    setAvailableNetworks([...availableNetworks, newNetwork]);
    toast({
      title: "Network Added",
      description: `'${newNetworkName}' has been added to your networks`
    });
    
    // Reset and close
    setNewNetworkName("");
    setNewNetworkPassword("");
    setAddNetworkOpen(false);
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">WiFi Settings</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">{wifiEnabled ? "On" : "Off"}</span>
          <Switch checked={wifiEnabled} onCheckedChange={toggleWifi} />
        </div>
      </div>

      {wifiEnabled ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium">Available Networks</h2>
            <Button 
              onClick={() => setAddNetworkOpen(true)}
              size="sm" 
              className="bg-[#00A16C] hover:bg-[#00A16C]/90 h-8 px-3"
            >
              <Plus size={16} className="mr-1" /> Add Network
            </Button>
          </div>
          
          <div className="space-y-3">
            {availableNetworks.map((network) => (
              <Card key={network.id} className="bg-[#252A37] border-none p-4 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${network.secured ? "bg-[#00A16C]" : "bg-amber-500"}`}>
                      <Wifi size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{network.name}</h3>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-400">{network.strength} Signal</span>
                        {network.secured && (
                          <span className="text-xs text-gray-400 ml-2">• Secured</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {network.connected ? (
                    <span className="text-xs bg-[#00A16C] px-2 py-1 rounded-full">Connected</span>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => connectToNetwork(network.id)}
                      className="bg-[#1A1F2C] hover:bg-[#23293A] text-white border-none"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-40 flex flex-col items-center justify-center text-gray-400">
          <WifiOff size={48} className="mb-2" />
          <p>WiFi is turned off</p>
          <Button className="mt-4 bg-[#00A16C]" onClick={toggleWifi}>
            Turn On WiFi
          </Button>
        </div>
      )}
      
      {/* Add Network Dialog */}
      <Dialog open={addNetworkOpen} onOpenChange={setAddNetworkOpen}>
        <DialogContent className="bg-[#252A37] text-white border-[#1A1F2C]">
          <DialogHeader>
            <DialogTitle>Add WiFi Network</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="network-name" className="text-sm font-medium">Network Name (SSID)</label>
              <Input 
                id="network-name"
                value={newNetworkName}
                onChange={(e) => setNewNetworkName(e.target.value)}
                placeholder="Enter network name"
                className="bg-[#1A1F2C] border-[#3A3F4C] text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="network-password" className="text-sm font-medium">Password</label>
              <Input 
                id="network-password"
                type="password"
                value={newNetworkPassword}
                onChange={(e) => setNewNetworkPassword(e.target.value)}
                placeholder="Enter password (leave empty for open networks)"
                className="bg-[#1A1F2C] border-[#3A3F4C] text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setAddNetworkOpen(false)}
              className="bg-[#1A1F2C] hover:bg-[#23293A] text-white border-none"
            >
              Cancel
            </Button>
            <Button 
              onClick={addNetwork}
              className="bg-[#00A16C] hover:bg-[#00A16C]/90"
            >
              Add Network
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
