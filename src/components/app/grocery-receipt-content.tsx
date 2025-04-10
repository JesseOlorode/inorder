
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, Check, Calendar, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function GroceryReceiptContent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<{ name: string; amount: string; expiryDays: string }[]>([]);
  const [showAddExpiry, setShowAddExpiry] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  
  const mockScanReceipt = () => {
    setIsScanning(true);
    
    // Simulate receipt scanning
    setTimeout(() => {
      setIsScanning(false);
      setScannedItems([
        { name: "Fresh Milk", amount: "1", expiryDays: "" },
        { name: "Eggs", amount: "12", expiryDays: "" },
        { name: "Bread", amount: "1", expiryDays: "" },
        { name: "Apples", amount: "5", expiryDays: "" }
      ]);
      
      toast({
        title: "Receipt scanned successfully",
        description: "4 items detected in your receipt"
      });
    }, 2000);
  };
  
  const handleExpiryUpdate = (expiryDays: string) => {
    setScannedItems(scannedItems.map((item, index) => 
      index === currentItemIndex 
        ? { ...item, expiryDays } 
        : item
    ));
    setShowAddExpiry(false);
  };
  
  const openExpiryDialog = (index: number) => {
    setCurrentItemIndex(index);
    setShowAddExpiry(true);
  };
  
  const handleSaveItems = () => {
    // Save items logic would go here
    
    toast({
      title: "Items saved to grocery list",
      description: `${scannedItems.length} items have been added to your grocery list.`
    });
    
    navigate("/grocery-management");
  };

  return (
    <div className="py-4 pb-20">
      <h1 className="text-xl font-semibold mb-6 text-white">Scan Receipt</h1>
      
      {!scannedItems.length ? (
        <>
          <Card className="bg-[#252A37] border-none p-8 rounded-lg flex flex-col items-center justify-center mb-6">
            <div className="mb-4 text-[#00A16C]">
              {isScanning ? (
                <div className="animate-pulse">
                  <Camera size={64} />
                </div>
              ) : (
                <Camera size={64} />
              )}
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {isScanning ? "Scanning..." : "Scan Receipt"}
            </h3>
            <p className="text-gray-400 text-center mb-4">
              {isScanning 
                ? "Please hold still, we're analyzing your receipt"
                : "Use your camera to scan your grocery receipt and automatically add items"}
            </p>
            <Button 
              onClick={mockScanReceipt}
              disabled={isScanning}
              className="bg-[#00A16C] hover:bg-[#00916A] text-white"
            >
              {isScanning ? "Scanning..." : "Open Camera"}
            </Button>
          </Card>
          
          <div className="text-center">
            <p className="text-gray-400 mb-4">Or upload receipt manually</p>
            <Button 
              variant="outline" 
              className="bg-transparent border-[#3A3F4B] text-white hover:bg-[#252A37]"
            >
              <Upload size={18} className="mr-2" />
              Upload Receipt
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-400 mb-4">
            The following items were detected from your receipt. You can edit the details and add expiration dates.
          </p>
          
          <div className="space-y-4 mb-6">
            {scannedItems.map((item, index) => (
              <Card key={index} className="bg-[#252A37] border-none p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <ShoppingBag size={16} className="text-[#00A16C] mr-2" />
                      <h3 className="font-medium text-white">{item.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Quantity: {item.amount}</p>
                    
                    {item.expiryDays && (
                      <div className="flex items-center mt-1 text-sm text-gray-400">
                        <Calendar size={14} className="mr-1" />
                        <span>Expires in {item.expiryDays} days</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openExpiryDialog(index)}
                    className="bg-transparent border-[#3A3F4B] text-white hover:bg-[#252A37]"
                  >
                    {item.expiryDays ? "Edit Expiry" : "Add Expiry"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex gap-4">
            <Button 
              className="flex-1 bg-[#00A16C] hover:bg-[#00916A] text-white"
              onClick={handleSaveItems}
            >
              <Check size={18} className="mr-2" />
              Save Items
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 bg-transparent border-[#3A3F4B] text-white hover:bg-[#252A37]"
              onClick={mockScanReceipt}
            >
              <Camera size={18} className="mr-2" />
              Scan Again
            </Button>
          </div>
        </>
      )}
      
      <Dialog open={showAddExpiry} onOpenChange={setShowAddExpiry}>
        <DialogContent className="bg-[#252A37] text-white border-[#3A3F4B]">
          <DialogHeader>
            <DialogTitle>Add Expiration Date</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-400">
              Set an expiration date for {scannedItems[currentItemIndex]?.name}
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="expiryDays">Days until expiry</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="expiryDays"
                  type="number"
                  min="1"
                  placeholder="Enter days"
                  className="bg-[#1A1F2C] border-[#3A3F4B] text-white pl-10"
                  defaultValue={scannedItems[currentItemIndex]?.expiryDays}
                  onChange={(e) => handleExpiryUpdate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-[#3A3F4B] text-white hover:bg-[#252A37]"
                onClick={() => setShowAddExpiry(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[#00A16C] hover:bg-[#00916A] text-white"
                onClick={() => setShowAddExpiry(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
