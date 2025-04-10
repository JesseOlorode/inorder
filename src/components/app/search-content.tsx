
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export function SearchContent() {
  return (
    <div className="py-4 space-y-6">
      <h1 className="text-2xl font-medium mb-6">Search</h1>
      
      <div className="relative">
        <Input
          placeholder="Search for tasks, groceries, etc."
          className="pl-10 bg-[#252A37] border-none h-12 text-white"
        />
        <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>
      
      <div className="mt-8 text-center text-gray-400">
        <p>Search for your tasks, groceries, or any other items</p>
        <p className="mt-2">Try typing something in the search bar above</p>
      </div>
    </div>
  );
}
