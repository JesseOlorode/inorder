
import { Avatar } from "@/components/ui/avatar";
import { ChevronRight, Moon, Key, Globe, Info, FileText, Share2, LogOut } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@radix-ui/react-switch";

export function ProfileContent() {
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
      <div className="bg-[#252A37] rounded-lg overflow-hidden">
        <h2 className="text-sm font-medium p-4 pb-2">Account Settings</h2>
        
        <div className="border-b border-gray-700">
          <ProfileSettingSwitch
            icon={<Moon size={18} />}
            label="Mode"
            description="Dark mode"
          />
        </div>
        
        <div className="border-b border-gray-700">
          <ProfileSettingLink
            icon={<Key size={18} />}
            label="Change Password"
          />
        </div>
        
        <div>
          <ProfileSettingLink
            icon={<Globe size={18} />}
            label="Language"
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-[#252A37] rounded-lg overflow-hidden">
        <h2 className="text-sm font-medium p-4 pb-2">Preferences</h2>
        
        <div className="border-b border-gray-700">
          <ProfileSettingLink
            icon={<Info size={18} />}
            label="About App"
          />
        </div>
        
        <div className="border-b border-gray-700">
          <ProfileSettingLink
            icon={<FileText size={18} />}
            label="Terms & Conditions"
          />
        </div>
        
        <div className="border-b border-gray-700">
          <ProfileSettingLink
            icon={<FileText size={18} />}
            label="Privacy Policy"
          />
        </div>
        
        <div>
          <ProfileSettingLink
            icon={<Share2 size={18} />}
            label="Share This App"
          />
        </div>
      </div>

      {/* Logout Button */}
      <button className="bg-[#00C853] text-black font-medium w-full py-3 rounded-lg flex justify-center items-center gap-2">
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
}

function ProfileSettingLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#2A303D]">
      <div className="flex items-center gap-4">
        <div className="text-[#00C853]">{icon}</div>
        <span className="text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}

function ProfileSettingSwitch({ icon, label, description }: { icon: React.ReactNode; label: string; description: string }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#2A303D]">
      <div className="flex items-center gap-4">
        <div className="text-[#00C853]">{icon}</div>
        <div>
          <div className="text-sm">{label}</div>
          <div className="text-xs text-gray-400">{description}</div>
        </div>
      </div>
      <Switch defaultChecked id="dark-mode" className="bg-[#00C853] h-5 w-10 rounded-full" />
    </div>
  );
}
