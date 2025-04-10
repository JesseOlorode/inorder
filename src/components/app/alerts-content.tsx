
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff, Clock, Info, MessageSquare, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function AlertsContent() {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [alertSettings, setAlertSettings] = useState({
    messages: true,
    calendar: true,
    system: true,
    security: true
  });
  const { toast } = useToast();

  const toggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
    toast({
      title: alertsEnabled ? "Alerts Disabled" : "Alerts Enabled",
      description: alertsEnabled 
        ? "You will not receive any notifications" 
        : "You will now receive notifications",
    });
  };

  const toggleAlertType = (type: keyof typeof alertSettings) => {
    setAlertSettings({
      ...alertSettings,
      [type]: !alertSettings[type]
    });
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alerts ${alertSettings[type] ? 'Disabled' : 'Enabled'}`,
      description: `You will ${alertSettings[type] ? 'no longer' : 'now'} receive ${type} alerts`,
    });
  };

  const recentAlerts = [
    { id: 1, type: "message", title: "New Message", description: "John sent you a message", time: "5 min ago" },
    { id: 2, type: "calendar", title: "Meeting Reminder", description: "Team meeting in 30 minutes", time: "10 min ago" },
    { id: 3, type: "system", title: "System Update", description: "New update available", time: "1 hour ago" },
    { id: 4, type: "security", title: "Security Alert", description: "New login from unknown device", time: "2 hours ago" },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="text-blue-400" />;
      case "calendar": return <Clock className="text-amber-400" />;
      case "system": return <Info className="text-purple-400" />;
      case "security": return <Shield className="text-red-400" />;
      default: return <Bell className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Alerts & Notifications</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">{alertsEnabled ? "On" : "Off"}</span>
          <Switch checked={alertsEnabled} onCheckedChange={toggleAlerts} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium">Alert Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AlertTypeCard 
            icon={<MessageSquare />}
            title="Messages"
            description="Alerts for new messages and comments"
            enabled={alertsEnabled && alertSettings.messages}
            onToggle={() => toggleAlertType("messages")}
            disabled={!alertsEnabled}
          />
          <AlertTypeCard 
            icon={<Clock />}
            title="Calendar"
            description="Reminders for events and deadlines"
            enabled={alertsEnabled && alertSettings.calendar}
            onToggle={() => toggleAlertType("calendar")}
            disabled={!alertsEnabled}
          />
          <AlertTypeCard 
            icon={<Info />}
            title="System"
            description="System updates and information"
            enabled={alertsEnabled && alertSettings.system}
            onToggle={() => toggleAlertType("system")}
            disabled={!alertsEnabled}
          />
          <AlertTypeCard 
            icon={<Shield />}
            title="Security"
            description="Security alerts and warnings"
            enabled={alertsEnabled && alertSettings.security}
            onToggle={() => toggleAlertType("security")}
            disabled={!alertsEnabled}
          />
        </div>
      </div>

      {alertsEnabled ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Recent Alerts</h2>
            <Button variant="link" className="text-[#00A16C] p-0 h-auto">Clear All</Button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <Card key={alert.id} className="bg-[#252A37] border-none p-4 rounded-lg text-white">
                <div className="flex items-start gap-3">
                  <div className="bg-[#1A1F2C] p-2 rounded-full mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm text-gray-400">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-40 flex flex-col items-center justify-center text-gray-400">
          <BellOff size={48} className="mb-2" />
          <p>All alerts are currently disabled</p>
          <Button className="mt-4 bg-[#00A16C]" onClick={toggleAlerts}>
            Enable Alerts
          </Button>
        </div>
      )}
    </div>
  );
}

interface AlertTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

function AlertTypeCard({ icon, title, description, enabled, onToggle, disabled }: AlertTypeCardProps) {
  return (
    <Card className="bg-[#252A37] border-none p-4 rounded-lg text-white">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${enabled ? "bg-[#00A16C]" : "bg-[#1A1F2C]"}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        <Switch 
          checked={enabled} 
          onCheckedChange={onToggle}
          disabled={disabled}
        />
      </div>
    </Card>
  );
}
