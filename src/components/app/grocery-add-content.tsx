
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export function GroceryAddContent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  
  const categories = [
    "Chocolates", "Croissant", "Protein Bar", "Chia Pudding", "Cookies", 
    "Vegetables", "Fruits", "Dairy", "Snacks", "Beverages"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName || !category || !price || !expiryDate) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Add item logic would go here
    
    toast({
      title: "Item added successfully",
      description: `${itemName} has been added to your grocery list.`
    });
    
    navigate("/grocery-management");
  };
  
  // Handle date input formatting
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    // Format as MM/DD
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }

    // Validate month
    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2));
      if (month < 1) {
        value = '01' + value.slice(2);
      } else if (month > 12) {
        value = '12' + value.slice(2);
      }
    }

    // Validate day if complete
    if (value.length === 5) {
      const month = parseInt(value.slice(0, 2));
      const day = parseInt(value.slice(3, 5));
      
      let maxDay = 31;
      if ([4, 6, 9, 11].includes(month)) {
        maxDay = 30;
      } else if (month === 2) {
        maxDay = 29; // Simplified, not accounting for leap years
      }
      
      if (day < 1) {
        value = value.slice(0, 3) + '01';
      } else if (day > maxDay) {
        value = value.slice(0, 3) + maxDay.toString();
      }
    }
    
    setExpiryDate(value);
  };
  
  return (
    <div className="py-4 pb-20">
      <h1 className="text-xl font-semibold mb-6 text-[#1A1F2C]">Add New Item</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#1A1F2C]">Item Name</Label>
          <Input
            id="name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
            className="bg-white border-[#3A3F4B] text-[#1A1F2C]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category" className="text-[#1A1F2C]">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-white border-[#3A3F4B] text-[#1A1F2C]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#3A3F4B] text-[#1A1F2C]">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price" className="text-[#1A1F2C]">Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              className="bg-white border-[#3A3F4B] text-[#1A1F2C] pl-8"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expiry" className="text-[#1A1F2C]">Expiry Date (MM/DD)</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={16} />
            <Input
              id="expiry"
              value={expiryDate}
              onChange={handleDateChange}
              placeholder="MM/DD"
              className="bg-white border-[#3A3F4B] text-[#1A1F2C] pl-10"
              maxLength={5}
            />
          </div>
        </div>
        
        <Card className="bg-white border-dashed border-2 border-[#3A3F4B] rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="text-[#00A16C] mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          <p className="text-gray-600 text-center">Add product image (optional)</p>
          <Button variant="outline" className="mt-3 bg-transparent border-[#3A3F4B] text-[#1A1F2C] hover:bg-gray-100">
            Upload Image
          </Button>
        </Card>
        
        <Button 
          type="submit" 
          className="w-full bg-[#00A16C] hover:bg-[#00916A] text-white"
        >
          Add Item
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full bg-transparent border-[#3A3F4B] text-[#1A1F2C] hover:bg-gray-100"
          onClick={() => navigate("/grocery-management")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
