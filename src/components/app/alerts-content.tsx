
import { Bell, Check, Clock, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function AlertsContent() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Meeting Reminder", description: "Meeting with design team in 30 minutes", time: "10:00 AM", read: false },
    { id: 2, title: "Task Completed", description: "Project proposal has been approved", time: "Yesterday", read: true },
    { id: 3, title: "New Message", description: "You have a new message from Sarah", time: "Yesterday", read: false },
    { id: 4, title: "System Update", description: "System update available. Tap to install", time: "2 days ago", read: true },
  ]);
  
  const { toast } = useToast();

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read",
    });
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed",
    });
  };
  
  const clearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "All notifications have been removed",
    });
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Notifications</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">{notificationsEnabled ? "On" : "Off"}</span>
          <Switch 
            checked={notificationsEnabled} 
            onCheckedChange={setNotificationsEnabled} 
          />
        </div>
      </div>

      {notificationsEnabled && (
        <>
          <Card className="bg-[#252A37] border-none p-4 rounded-lg text-white">
            <h2 className="text-sm font-medium mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={18} />
                  <span>Sound</span>
                </div>
                <Switch 
                  checked={soundEnabled} 
                  onCheckedChange={setSoundEnabled} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={18} />
                  <span>Vibration</span>
                </div>
                <Switch 
                  checked={vibrationEnabled} 
                  onCheckedChange={setVibrationEnabled} 
                />
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium">Recent Notifications</h2>
            {notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-[#00A16C] hover:text-[#00A16C]/90"
                onClick={clearAll}
              >
                Clear All
              </Button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-gray-400">
              <Bell size={48} className="mb-2" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`bg-[#252A37] border-none p-3 rounded-lg ${notification.read ? 'text-gray-300' : 'text-white border-l-4 border-[#00A16C]'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="bg-[#1A1F2C] p-2 rounded-full">
                        <Bell size={16} className={notification.read ? 'text-gray-400' : 'text-[#00A16C]'} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{notification.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{notification.description}</p>
                        <div className="flex items-center text-xs text-gray-400 mt-2">
                          <Clock size={12} className="mr-1" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-gray-400 hover:text-[#00A16C] hover:bg-transparent"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check size={16} />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-gray-400 hover:text-red-400 hover:bg-transparent"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
      
      {!notificationsEnabled && (
        <div className="h-40 flex flex-col items-center justify-center text-gray-400">
          <Bell size={48} className="mb-2" />
          <p>Notifications are turned off</p>
          <Button className="mt-4 bg-[#00A16C]" onClick={() => setNotificationsEnabled(true)}>
            Turn On Notifications
          </Button>
        </div>
      )}
    </div>
  );
}
