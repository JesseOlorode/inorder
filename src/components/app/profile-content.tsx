
import { Avatar } from "@/components/ui/avatar";
import { ChevronRight, Moon, Key, Globe, Info, FileText, Share2, LogOut } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-context";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProfileContent() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // State for dialogs
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  
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

  // Password change form
  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onPasswordSubmit = (data) => {
    // Check if passwords match
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally call an API to change the password
    console.log("Password change data:", data);
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully",
    });
    setPasswordDialogOpen(false);
    passwordForm.reset();
  };

  // Language selection
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
  ];

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    toast({
      title: "Language Changed",
      description: `Language has been set to ${languages.find(lang => lang.value === value)?.label}`,
    });
    setLanguageDialogOpen(false);
  };

  return (
    <div className="space-y-6 py-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-2">
        <Avatar className="h-20 w-20 rounded-full border-2 border-[#00C853]">
          <img src="https://github.com/shadcn.png" alt="Profile" />
        </Avatar>
        <h1 className="text-xl font-medium">Jonathan Peterson</h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>hello@reallygreatsite.com</p>
      </div>

      {/* Account Settings */}
      <div className={`${theme === 'dark' ? 'bg-[#252A37]' : 'bg-white'} rounded-lg overflow-hidden`}>
        <h2 className="text-sm font-medium p-4 pb-2">Account Settings</h2>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingSwitch
            icon={<Moon size={18} />}
            label="Mode"
            description={theme === 'dark' ? "Dark mode" : "Light mode"}
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingLink
            icon={<Key size={18} />}
            label="Change Password"
            onClick={() => setPasswordDialogOpen(true)}
          />
        </div>
        
        <div>
          <ProfileSettingLink
            icon={<Globe size={18} />}
            label="Language"
            onClick={() => setLanguageDialogOpen(true)}
          />
        </div>
      </div>

      {/* Preferences */}
      <div className={`${theme === 'dark' ? 'bg-[#252A37]' : 'bg-white'} rounded-lg overflow-hidden`}>
        <h2 className="text-sm font-medium p-4 pb-2">Preferences</h2>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingLink
            icon={<Info size={18} />}
            label="About App"
            onClick={() => {
              toast({
                title: "About App",
                description: "TaskMaster v1.2.0 - Your ultimate productivity companion.",
              });
            }}
          />
        </div>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingLink
            icon={<FileText size={18} />}
            label="Terms & Conditions"
            onClick={() => {
              toast({
                title: "Terms & Conditions",
                description: "The full terms and conditions would appear in a modal here.",
              });
            }}
          />
        </div>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingLink
            icon={<FileText size={18} />}
            label="Privacy Policy"
            onClick={() => {
              toast({
                title: "Privacy Policy",
                description: "The privacy policy would appear in a modal here.",
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

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className={theme === 'dark' ? 'bg-[#252A37] text-white border-gray-700' : 'bg-white'}>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
              Update your password to keep your account secure.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter current password" 
                        {...field} 
                        className={theme === 'dark' ? 'bg-[#1A1F2C] border-gray-700' : ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter new password" 
                        {...field} 
                        className={theme === 'dark' ? 'bg-[#1A1F2C] border-gray-700' : ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Confirm new password" 
                        {...field} 
                        className={theme === 'dark' ? 'bg-[#1A1F2C] border-gray-700' : ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setPasswordDialogOpen(false)}
                  className={theme === 'dark' ? 'border-gray-700' : ''}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#00C853] hover:bg-[#00B04C] text-black">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Language Selection Dialog */}
      <Dialog open={languageDialogOpen} onOpenChange={setLanguageDialogOpen}>
        <DialogContent className={theme === 'dark' ? 'bg-[#252A37] text-white border-gray-700' : 'bg-white'}>
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
              Choose your preferred language for the app.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select 
              value={selectedLanguage} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className={theme === 'dark' ? 'bg-[#1A1F2C] border-gray-700' : ''}>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className={theme === 'dark' ? 'bg-[#252A37] text-white border-gray-700' : ''}>
                {languages.map((lang) => (
                  <SelectItem 
                    key={lang.value} 
                    value={lang.value}
                    className={theme === 'dark' ? 'focus:bg-[#1A1F2C] focus:text-white' : ''}
                  >
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setLanguageDialogOpen(false)}
              className={theme === 'dark' ? 'border-gray-700' : ''}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  const { theme } = useTheme();
  
  return (
    <div 
      className={`flex items-center justify-between p-4 ${
        theme === 'dark' 
          ? 'hover:bg-[#2A303D] text-white' 
          : 'hover:bg-gray-100 text-[#1A1F2C]'
      } cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="text-[#00C853]">{icon}</div>
        <span className="text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
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
  const { theme } = useTheme();
  
  return (
    <div className={`flex items-center justify-between p-4 ${
      theme === 'dark' 
        ? 'hover:bg-[#2A303D] text-white' 
        : 'hover:bg-gray-100 text-[#1A1F2C]'
    }`}>
      <div className="flex items-center gap-4">
        <div className="text-[#00C853]">{icon}</div>
        <div>
          <div className="text-sm">{label}</div>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{description}</div>
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
