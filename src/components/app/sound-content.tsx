
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Headphones, Music, Speaker, Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function SoundContent() {
  const [isMuted, setIsMuted] = useState(false);
  const [masterVolume, setMasterVolume] = useState(75);
  const [mediaVolume, setMediaVolume] = useState(80);
  const [callVolume, setCallVolume] = useState(70);
  const [notificationVolume, setNotificationVolume] = useState(60);
  const { toast } = useToast();

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Sound Enabled" : "Sound Muted",
      description: isMuted ? "All audio outputs are now enabled" : "All audio outputs are now muted",
    });
  };

  const VolumeIcon = () => {
    if (isMuted) return <VolumeX />;
    if (masterVolume < 30) return <Volume />;
    if (masterVolume < 70) return <Volume1 />;
    return <Volume2 />;
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Sound Settings</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">{isMuted ? "Muted" : "On"}</span>
          <Switch checked={!isMuted} onCheckedChange={() => toggleMute()} />
        </div>
      </div>

      <Card className="bg-[#252A37] border-none p-6 rounded-lg text-white">
        <div className="flex flex-col items-center text-center">
          <div className={`p-6 rounded-full ${isMuted ? "bg-[#1A1F2C]" : "bg-[#00A16C]"} mb-4`}>
            <VolumeIcon />
          </div>
          <h2 className="text-lg font-medium">Master Volume</h2>
          <p className="text-3xl font-bold mt-2">{isMuted ? "0%" : `${masterVolume}%`}</p>
        </div>
        <div className="mt-6">
          <Slider
            value={[isMuted ? 0 : masterVolume]}
            max={100}
            step={1}
            onValueChange={(value) => {
              if (isMuted && value[0] > 0) {
                setIsMuted(false);
              }
              setMasterVolume(value[0]);
            }}
            className={isMuted ? "opacity-50" : ""}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">0%</span>
          <span className="text-xs text-gray-400">100%</span>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-sm font-medium">Audio Channels</h2>
        <div className="space-y-3">
          <VolumeControl 
            icon={<Music />} 
            title="Media"
            value={isMuted ? 0 : mediaVolume}
            onChange={(value) => setMediaVolume(value)}
            disabled={isMuted}
          />
          <VolumeControl 
            icon={<Headphones />} 
            title="Call"
            value={isMuted ? 0 : callVolume}
            onChange={(value) => setCallVolume(value)}
            disabled={isMuted}
          />
          <VolumeControl 
            icon={<Speaker />} 
            title="Notification"
            value={isMuted ? 0 : notificationVolume}
            onChange={(value) => setNotificationVolume(value)}
            disabled={isMuted}
          />
        </div>
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          className={`w-36 ${
            isMuted ? "bg-[#00A16C] hover:bg-[#00A16C]/90" : "bg-[#1A1F2C] hover:bg-[#23293A]"
          } text-white border-none`}
          onClick={toggleMute}
        >
          {isMuted ? "Unmute" : "Mute All"}
        </Button>
      </div>
    </div>
  );
}

interface VolumeControlProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

function VolumeControl({ icon, title, value, onChange, disabled }: VolumeControlProps) {
  return (
    <Card className="bg-[#252A37] border-none p-4 rounded-lg text-white">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-full ${disabled ? "bg-[#1A1F2C]" : "bg-[#00A16C]"}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-1">{title}</h3>
          <Slider
            value={[value]}
            max={100}
            step={1}
            onValueChange={(val) => onChange(val[0])}
            className={disabled ? "opacity-50" : ""}
            disabled={disabled}
          />
        </div>
        <div className="text-sm font-medium ml-2 w-10 text-right">
          {value}%
        </div>
      </div>
    </Card>
  );
}
