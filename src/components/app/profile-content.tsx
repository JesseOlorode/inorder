
import { Avatar } from "@/components/ui/avatar";
import { ChevronRight, Moon, Key, Globe, Info, FileText, Share2, LogOut } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-context";
import { useLanguage } from "@/contexts/language-context";
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
import { ScrollArea } from "@/components/ui/scroll-area";

export function ProfileContent() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  
  // State for dialogs
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  
  const handleLogout = () => {
    toast({
      title: t("loggedOut"),
      description: t("logoutDescription"),
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
        title: t("sharingTitle"),
        description: t("sharingDescription"),
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
        description: t("passwordsDontMatch"),
        variant: "destructive",
      });
      return;
    }

    // Here you would normally call an API to change the password
    console.log("Password change data:", data);
    toast({
      title: t("passwordChanged"),
      description: t("passwordUpdated"),
    });
    setPasswordDialogOpen(false);
    passwordForm.reset();
  };

  // Language selection
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Español" },
    { value: "french", label: "Français" },
    { value: "german", label: "Deutsch" },
    { value: "chinese", label: "中文" },
  ];

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    setLanguage(value);
    toast({
      title: t("languageChanged"),
      description: `${t("language")} ${languages.find(lang => lang.value === value)?.label}`,
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
        <h2 className="text-sm font-medium p-4 pb-2">{t("accountSettings")}</h2>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingSwitch
            icon={<Moon size={18} />}
            label={t("mode")}
            description={theme === 'dark' ? t("darkMode") : t("lightMode")}
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingLink
            icon={<Key size={18} />}
            label={t("changePassword")}
            onClick={() => setPasswordDialogOpen(true)}
          />
        </div>
        
        <div>
          <ProfileSettingLink
            icon={<Globe size={18} />}
            label={t("language")}
            onClick={() => setLanguageDialogOpen(true)}
          />
        </div>
      </div>

      {/* Preferences */}
      <div className={`${theme === 'dark' ? 'bg-[#252A37]' : 'bg-white'} rounded-lg overflow-hidden`}>
        <h2 className="text-sm font-medium p-4 pb-2">{t("preferences")}</h2>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingLink
            icon={<Info size={18} />}
            label={t("aboutApp")}
            onClick={() => {
              toast({
                title: t("appInfoTitle"),
                description: t("appInfoDescription"),
              });
            }}
          />
        </div>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingLink
            icon={<FileText size={18} />}
            label={t("termsConditions")}
            onClick={() => setTermsDialogOpen(true)}
          />
        </div>
        
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <ProfileSettingLink
            icon={<FileText size={18} />}
            label={t("privacyPolicy")}
            onClick={() => {
              toast({
                title: t("privacyTitle"),
                description: t("privacyDescription"),
              });
            }}
          />
        </div>
        
        <div>
          <ProfileSettingLink
            icon={<Share2 size={18} />}
            label={t("shareThisApp")}
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
        <span>{t("logout")}</span>
      </Button>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className={theme === 'dark' ? 'bg-[#252A37] text-white border-gray-700' : 'bg-white'}>
          <DialogHeader>
            <DialogTitle>{t("changePassword")}</DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
              {t("updatePassword")}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("currentPassword")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={t("currentPassword")} 
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
                    <FormLabel>{t("newPassword")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={t("newPassword")} 
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
                    <FormLabel>{t("confirmPassword")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={t("confirmPassword")} 
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
                  {t("cancel")}
                </Button>
                <Button type="submit" className="bg-[#00C853] hover:bg-[#00B04C] text-black">
                  {t("saveChanges")}
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
            <DialogTitle>{t("selectLanguage")}</DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
              {t("chooseLanguage")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select 
              value={selectedLanguage} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className={theme === 'dark' ? 'bg-[#1A1F2C] border-gray-700' : ''}>
                <SelectValue placeholder={t("selectLanguage")} />
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
              {t("cancel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Terms and Conditions Dialog */}
      <Dialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen}>
        <DialogContent className={`${theme === 'dark' ? 'bg-[#252A37] text-white border-gray-700' : 'bg-white'} max-w-3xl max-h-[80vh]`}>
          <DialogHeader>
            <DialogTitle>{t("termsConditions")}</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="mt-2 h-[60vh] pr-4 pb-4">
            <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
              <div dangerouslySetInnerHTML={{ 
                __html: t("termsAndConditionsText")
                  .replace(/# (.*)/g, '<h1 class="text-xl font-bold my-4">$1</h1>')
                  .replace(/## (.*)/g, '<h2 class="text-lg font-semibold my-3">$1</h2>')
                  .replace(/\n\n/g, '<p class="my-2"></p>')
                  .replace(/\n/g, '<br />')
              }} />
            </div>
          </ScrollArea>
          
          <DialogFooter className="mt-4">
            <Button 
              onClick={() => setTermsDialogOpen(false)} 
              className="bg-[#00C853] hover:bg-[#00B04C] text-black font-medium"
            >
              I Accept
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
