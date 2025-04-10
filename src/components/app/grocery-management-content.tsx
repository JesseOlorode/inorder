
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GroceryManagementContent() {
  const groceryCategories = [
    {
      id: 1,
      name: "Chocolates",
      items: [
        { id: 1, name: "Chocolate", price: "$3.99", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" },
        { id: 2, name: "Chocolate Cookies", price: "$4.99", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3" },
      ]
    },
    {
      id: 2,
      name: "Croissant",
      items: [
        { id: 3, name: "Coconut Croissant", price: "$5.99", image: "https://images.unsplash.com/photo-1547047803-fa4a5137c45f?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3" },
      ]
    },
    {
      id: 3,
      name: "Protein Bar",
      items: [
        { id: 4, name: "Pumpkin Latte", price: "$6.99", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" },
      ]
    },
    {
      id: 4,
      name: "Chia Pudding",
      items: [
        { id: 5, name: "Chia Pudding", price: "$3.49", image: "https://images.unsplash.com/photo-1592842232655-e5d345cbc2d0?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3" },
      ]
    },
    {
      id: 5,
      name: "Cookies",
      items: [
        { id: 6, name: "Chocolate Cookies", price: "$2.99", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3" },
      ]
    },
  ];

  return (
    <div className="py-4 pb-20">
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
        <Button variant="outline" className="bg-[#00C853] text-black rounded-full text-xs px-4 whitespace-nowrap">
          All
        </Button>
        <Button variant="outline" className="bg-[#252A37] text-white rounded-full text-xs px-4 whitespace-nowrap">
          Vegetables
        </Button>
        <Button variant="outline" className="bg-[#252A37] text-white rounded-full text-xs px-4 whitespace-nowrap">
          Fruits
        </Button>
        <Button variant="outline" className="bg-[#252A37] text-white rounded-full text-xs px-4 whitespace-nowrap">
          Dairy
        </Button>
        <Button variant="outline" className="bg-[#252A37] text-white rounded-full text-xs px-4 whitespace-nowrap">
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
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroceryItem({ name, price, image }: { name: string; price: string; image: string }) {
  return (
    <div className="bg-[#252A37] rounded-lg overflow-hidden">
      <div className="h-28 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-[#00C853]">{price}</span>
          <button className="bg-[#00C853] text-xs text-black px-3 py-1 rounded-full">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
