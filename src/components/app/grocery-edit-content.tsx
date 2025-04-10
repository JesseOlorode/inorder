
import { useState } from "react";
import { Search, Save, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function GroceryEditContent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const groceryItems = [
    { id: 1, name: "Chocolate", category: "Chocolates", selected: false },
    { id: 2, name: "Chocolate Cookies", category: "Chocolates", selected: false },
    { id: 3, name: "Coconut Croissant", category: "Croissant", selected: false },
    { id: 4, name: "Pumpkin Latte", category: "Protein Bar", selected: false },
    { id: 5, name: "Chia Pudding", category: "Chia Pudding", selected: false },
    { id: 6, name: "Chocolate Cookies", category: "Cookies", selected: false },
  ];
  
  const [items, setItems] = useState(groceryItems);
  
  const handleToggleSelect = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };
  
  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your grocery items have been updated."
    });
    navigate("/grocery-management");
  };
  
  const handleDeleteSelected = () => {
    const selectedItems = items.filter(item => item.selected);
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select items to delete.",
        variant: "destructive"
      });
      return;
    }
    
    setItems(items.filter(item => !item.selected));
    toast({
      title: `${selectedItems.length} item(s) deleted`,
      description: "Selected grocery items have been removed."
    });
  };
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-4 pb-20">
      <h1 className="text-xl font-semibold mb-6 text-white">Edit Grocery Items</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products"
          className="w-full bg-[#252A37] border-none rounded-full pl-10 pr-4 py-2 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Item List */}
      <div className="space-y-4 mb-8">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-[#252A37] border-none p-3 flex items-center">
            <Checkbox 
              checked={item.selected}
              onCheckedChange={() => handleToggleSelect(item.id)}
              className="mr-3 border-[#00A16C]"
            />
            <div className="flex-1">
              <p className="text-white">{item.name}</p>
              <p className="text-gray-400 text-sm">{item.category}</p>
            </div>
          </Card>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No items match your search
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <Button 
          onClick={handleDeleteSelected}
          className="flex-1 bg-red-500 hover:bg-red-600"
        >
          <Trash2 size={18} className="mr-2" />
          Delete Selected
        </Button>
        <Button 
          onClick={handleSaveChanges}
          className="flex-1 bg-[#00A16C] hover:bg-[#00916A]"
        >
          <Save size={18} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
