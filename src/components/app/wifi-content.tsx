
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Wifi, WifiOff } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function WiFiContent() {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [availableNetworks, setAvailableNetworks] = useState([
    { id: 1, name: "Home Network", secured: true, strength: "High", connected: true },
    { id: 2, name: "Neighbor's WiFi", secured: true, strength: "Medium", connected: false },
    { id: 3, name: "Public WiFi", secured: false, strength: "Low", connected: false },
    { id: 4, name: "Office Network", secured: true, strength: "High", connected: false },
  ]);
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
          <h2 className="text-sm font-medium">Available Networks</h2>
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
    </div>
  );
}
