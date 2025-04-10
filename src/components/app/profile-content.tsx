
import { Avatar } from "@/components/ui/avatar";
import { ChevronRight, Moon, Key, Globe, Info, FileText, Share2, LogOut } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-context";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function ProfileContent() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    // In a real app, we would clear auth state here
    setTimeout(() => navigate("/login"), 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this amazing app!",
        text: "I've been using this app and it's great!",
        url: window.location.origin,
      }).catch(err => {
        console.error("Error sharing:", err);
      });
    } else {
      toast({
        title: "Sharing",
        description: "Link copied to clipboard!",
      });
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-2">
        <Avatar className="h-20 w-20 rounded-full border-2 border-[#00C853]">
          <img src="https://github.com/shadcn.png" alt="Profile" />
        </Avatar>
        <h1 className="text-xl font-medium">Jonathan Peterson</h1>
        <p className="text-sm text-gray-400">hello@reallygreatsite.com</p>
      </div>

      {/* Account Settings */}
      <div className="bg-[#252A37] dark:bg-[#1A1F2C] rounded-lg overflow-hidden text-white">
        <h2 className="text-sm font-medium p-4 pb-2">Account Settings</h2>
        
        <div className="border-b border-gray-700">
          <ProfileSettingSwitch
            icon={<Moon size={18} />}
            label="Mode"
            description="Dark mode"
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
        
        <div className="border-b border-gray-700">
          <ProfileSettingLink
            icon={<Key size={18} />}
            label="Change Password"
            onClick={() => {
              toast({
                title: "Change Password",
                description: "Password change functionality would open here",
              });
            }}
          />
        </div>
        
        <div>
          <ProfileSettingLink
            icon={<Globe size={18} />}
            label="Language"
            onClick={() => {
              toast({
                title: "Language Settings",
                description: "Language settings would open here",
              });
            }}
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-[#252A37] dark:bg-[#1A1F2C] rounded-lg overflow-hidden text-white">
        <h2 className="text-sm font-medium p-4 pb-2">Preferences</h2>
        
        <div className="border-b border-gray-700">
          <ProfileSettingLink
            icon={<Info size={18} />}
            label="About App"
            onClick={() => {
              toast({
                title: "About App",
                description: "App information would show here",
              });
            }}
          />
        </div>
        
        <div className="border-b border-gray-700">
          <ProfileSettingLink
            icon={<FileText size={18} />}
            label="Terms & Conditions"
            onClick={() => {
              toast({
                title: "Terms & Conditions",
                description: "Terms and conditions would show here",
              });
            }}
          />
        </div>
        
        <div className="border-b border-gray-700">
          <ProfileSettingLink
            icon={<FileText size={18} />}
            label="Privacy Policy"
            onClick={() => {
              toast({
                title: "Privacy Policy",
                description: "Privacy policy would show here",
              });
            }}
          />
        </div>
        
        <div>
          <ProfileSettingLink
            icon={<Share2 size={18} />}
            label="Share This App"
            onClick={handleShare}
          />
        </div>
      </div>

      {/* Logout Button */}
      <Button 
        className="bg-[#00C853] hover:bg-[#00B04C] text-black font-medium w-full py-6 h-auto rounded-lg flex justify-center items-center gap-2" 
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </Button>
    </div>
  );
}

function ProfileSettingLink({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick?: () => void;
}) {
  return (
    <div 
      className="flex items-center justify-between p-4 hover:bg-[#2A303D] dark:hover:bg-[#222631] cursor-pointer" 
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="text-[#00C853]">{icon}</div>
        <span className="text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}

function ProfileSettingSwitch({ 
  icon, 
  label, 
  description, 
  checked, 
  onCheckedChange 
}: { 
  icon: React.ReactNode; 
  label: string; 
  description: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#2A303D] dark:hover:bg-[#222631]">
      <div className="flex items-center gap-4">
        <div className="text-[#00C853]">{icon}</div>
        <div>
          <div className="text-sm">{label}</div>
          <div className="text-xs text-gray-400">{description}</div>
        </div>
      </div>
      <Switch 
        id="dark-mode" 
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
