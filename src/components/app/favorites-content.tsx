
import { Heart } from "lucide-react";

export function FavoritesContent() {
  return (
    <div className="py-4 space-y-6">
      <h1 className="text-2xl font-medium mb-6">Favorites</h1>
      
      <div className="mt-8 text-center text-gray-400 flex flex-col items-center">
        <Heart size={40} className="mb-4 text-gray-500" />
        <p>No favorites yet</p>
        <p className="mt-2">Items you mark as favorite will appear here</p>
      </div>
    </div>
  );
}
