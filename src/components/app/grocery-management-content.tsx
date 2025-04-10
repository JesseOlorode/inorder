import { useState } from "react";
import { Search, Edit, Plus, Receipt, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export function GroceryManagementContent() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  const groceryCategories = [
    {
      id: 1,
      name: "Chocolates",
      items: [
        { 
          id: 1, 
          name: "Chocolate", 
          price: "$3.99", 
          image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3",
          expiryDays: 45
        },
        { 
          id: 2, 
          name: "Chocolate Cookies", 
          price: "$4.99", 
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3",
          expiryDays: 12
        },
      ]
    },
    {
      id: 2,
      name: "Croissant",
      items: [
        { 
          id: 3, 
          name: "Coconut Croissant", 
          price: "$5.99", 
          image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3",
          expiryDays: 3
        },
      ]
    },
    {
      id: 3,
      name: "Protein Bar",
      items: [
        { 
          id: 4, 
          name: "Pumpkin Latte", 
          price: "$6.99", 
          image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3",
          expiryDays: 60
        },
      ]
    },
    {
      id: 4,
      name: "Chia Pudding",
      items: [
        { 
          id: 5, 
          name: "Chia Pudding", 
          price: "$3.49", 
          image: "https://images.unsplash.com/photo-1592842232655-e5d345cbc2d0?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3",
          expiryDays: 5
        },
      ]
    },
    {
      id: 5,
      name: "Cookies",
      items: [
        { 
          id: 6, 
          name: "Chocolate Cookies", 
          price: "$2.99", 
          image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3",
          expiryDays: 20
        },
      ]
    },
  ];

  return (
    <div className="py-4 pb-20">
      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <ActionCard 
          icon={<Edit size={18} className="text-white" />} 
          title="Edit Items" 
          onClick={() => navigate("/grocery-edit")}
        />
        <ActionCard 
          icon={<Plus size={18} className="text-white" />} 
          title="Add Item" 
          onClick={() => navigate("/grocery-add")}
        />
        <ActionCard 
          icon={<Receipt size={18} className="text-white" />} 
          title="Scan Receipt" 
          onClick={() => navigate("/grocery-receipt")}
        />
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products"
          className="w-full bg-[#252A37] border-none rounded-full pl-10 pr-4 py-2 text-sm"
        />
      </div>
      
      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <Button 
          variant="outline" 
          className={`${activeTab === "all" ? "bg-[#00A16C] text-white" : "bg-[#252A37] text-white"} rounded-full text-xs px-4 whitespace-nowrap`}
          onClick={() => setActiveTab("all")}
        >
          All
        </Button>
        <Button 
          variant="outline" 
          className={`${activeTab === "vegetables" ? "bg-[#00A16C] text-white" : "bg-[#252A37] text-white"} rounded-full text-xs px-4 whitespace-nowrap`}
          onClick={() => setActiveTab("vegetables")}
        >
          Vegetables
        </Button>
        <Button 
          variant="outline" 
          className={`${activeTab === "fruits" ? "bg-[#00A16C] text-white" : "bg-[#252A37] text-white"} rounded-full text-xs px-4 whitespace-nowrap`}
          onClick={() => setActiveTab("fruits")}
        >
          Fruits
        </Button>
        <Button 
          variant="outline" 
          className={`${activeTab === "dairy" ? "bg-[#00A16C] text-white" : "bg-[#252A37] text-white"} rounded-full text-xs px-4 whitespace-nowrap`}
          onClick={() => setActiveTab("dairy")}
        >
          Dairy
        </Button>
        <Button 
          variant="outline" 
          className={`${activeTab === "snacks" ? "bg-[#00A16C] text-white" : "bg-[#252A37] text-white"} rounded-full text-xs px-4 whitespace-nowrap`}
          onClick={() => setActiveTab("snacks")}
        >
          Snacks
        </Button>
      </div>
      
      {/* Grocery Categories and Items */}
      <div className="space-y-8">
        {groceryCategories.map((category) => (
          <div key={category.id}>
            <h2 className="text-lg font-medium mb-4">{category.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {category.items.map((item) => (
                <GroceryItem 
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  expiryDays={item.expiryDays}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroceryItem({ name, price, image, expiryDays }: { name: string; price: string; image: string; expiryDays: number }) {
  const getExpiryProgress = (days: number) => {
    if (days <= 0) return 0;
    if (days >= 60) return 100;
    return Math.round((days / 60) * 100);
  };

  const expiryProgress = getExpiryProgress(expiryDays);
  
  const getExpiryColor = (days: number) => {
    if (days <= 3) return "bg-red-500";
    if (days <= 7) return "bg-orange-400";
    return "bg-[#00A16C]";
  };

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-[#252A37] rounded-lg overflow-hidden">
      <div className="h-28 overflow-hidden">
        {!imageError ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover" 
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <span className="text-gray-400 text-xs">Image unavailable</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium">{name}</h3>
        
        <div className="mt-2 mb-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center">
              <Calendar size={12} className="mr-1 text-gray-400" />
              <span className="text-gray-400">Expires in {expiryDays} days</span>
            </div>
          </div>
          <Progress 
            value={expiryProgress} 
            className="h-1.5 bg-gray-700"
          >
            <div 
              className={`h-full ${getExpiryColor(expiryDays)}`} 
              style={{ width: `${expiryProgress}%` }}
            />
          </Progress>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-[#00A16C]">{price}</span>
          <button className="bg-[#00A16C] text-xs text-white px-3 py-1 rounded-full">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick?: () => void }) {
  return (
    <Card 
      className="bg-[#252A37] border-none p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#2A3040] transition-colors"
      onClick={onClick}
    >
      <div className="bg-[#1A1F2C] rounded-full p-3 mb-2 text-white">
        {icon}
      </div>
      <span className="text-xs text-white">{title}</span>
    </Card>
  );
}
