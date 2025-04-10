
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Cloud, 
  CloudDrizzle, 
  CloudLightning, 
  CloudRain, 
  CloudSnow,
  MapPin,
  PlusCircle,
  Search,
  Sun, 
  Trash2,
  Wind 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export function WeatherMapContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<string[]>([
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
    "Sydney, Australia",
    "Moscow, Russia"
  ]);

  useEffect(() => {
    // Simulate loading of weather data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simulate weather data fetch for the searched city
      setSearchResults(searchQuery);
      setSearchQuery("");
    }
  };

  const saveLocation = (location: string) => {
    if (!savedLocations.includes(location)) {
      setSavedLocations([...savedLocations, location]);
      toast({
        title: "Location saved",
        description: `${location} has been added to your saved locations.`
      });
    } else {
      toast({
        title: "Location already saved",
        description: `${location} is already in your saved locations.`,
        variant: "destructive"
      });
    }
  };

  const removeLocation = (location: string) => {
    setSavedLocations(savedLocations.filter(loc => loc !== location));
    toast({
      title: "Location removed",
      description: `${location} has been removed from your saved locations.`
    });
  };

  // Helper function to get a random weather icon based on location name
  const getWeatherIcon = (location: string) => {
    const icons = [
      <Sun className="text-yellow-400" key="sun" />,
      <CloudRain className="text-blue-400" key="rain" />,
      <Cloud className="text-gray-400" key="cloud" />,
      <Wind className="text-teal-400" key="wind" />,
      <CloudSnow className="text-blue-200" key="snow" />,
      <CloudDrizzle className="text-blue-300" key="drizzle" />,
      <CloudLightning className="text-purple-400" key="lightning" />
    ];
    
    // Use the string to deterministically pick an icon
    const index = location.length % icons.length;
    return icons[index];
  };

  // Generate a random temperature for demo purposes
  const getRandomTemperature = (location: string) => {
    // Create a deterministic "random" temperature based on the location name
    const base = location.charCodeAt(0) % 35;
    return `${base + 5}°C`;
  };

  // Generate a random weather condition for demo purposes
  const getWeatherCondition = (location: string) => {
    const conditions = ["Sunny", "Cloudy", "Rainy", "Windy", "Snowy", "Stormy", "Clear"];
    const index = location.charCodeAt(0) % conditions.length;
    return conditions[index];
  };

  return (
    <div className="space-y-6 pt-4">
      <h1 className="text-xl font-medium">Weather</h1>

      <div className="space-y-4">
        <form onSubmit={handleSearch} className="relative">
          <Input
            placeholder="Search for a city..."
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            size="sm" 
            className="absolute right-1 top-1 h-8 bg-[#00A16C] hover:bg-[#008a5c]"
          >
            <Search size={16} />
          </Button>
        </form>

        {searchResults && (
          <Card className="bg-[#252A37] border-none p-4 rounded-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium">{searchResults}</h2>
                <p className="text-sm text-gray-300">{getWeatherCondition(searchResults)}</p>
              </div>
              <div className="flex items-center gap-2">
                {getWeatherIcon(searchResults)}
                <span className="text-xl font-bold">{getRandomTemperature(searchResults)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1F2C]/80 p-2 rounded-lg">
                <p className="text-gray-400 text-xs">Humidity</p>
                <p className="text-lg font-medium">{40 + (searchResults.length % 30)}%</p>
              </div>
              <div className="bg-[#1A1F2C]/80 p-2 rounded-lg">
                <p className="text-gray-400 text-xs">Wind</p>
                <p className="text-lg font-medium">{5 + (searchResults.length % 15)} km/h</p>
              </div>
              <div className="bg-[#1A1F2C]/80 p-2 rounded-lg">
                <p className="text-gray-400 text-xs">Pressure</p>
                <p className="text-lg font-medium">{1000 + (searchResults.length % 30)} hPa</p>
              </div>
              <div className="bg-[#1A1F2C]/80 p-2 rounded-lg">
                <p className="text-gray-400 text-xs">UV Index</p>
                <p className="text-lg font-medium">
                  {["Low", "Medium", "High"][searchResults.length % 3]}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4 w-full"
              onClick={() => saveLocation(searchResults)}
            >
              <PlusCircle size={16} className="mr-2" />
              Save Location
            </Button>
          </Card>
        )}

        <h2 className="text-lg font-medium text-white mt-6">Saved Locations</h2>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full bg-[#1A1F2C]" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {savedLocations.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MapPin className="mx-auto h-8 w-8 opacity-50 mb-2" />
                <p>No saved locations yet.</p>
                <p className="text-sm">Search for a city to add it to your list.</p>
              </div>
            ) : (
              savedLocations.map((location) => (
                <WeatherDetail 
                  key={location}
                  location={location} 
                  temperature={getRandomTemperature(location)} 
                  condition={getWeatherCondition(location)} 
                  icon={getWeatherIcon(location)}
                  onRemove={() => removeLocation(location)}
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-[#252A37] rounded-lg">
        <h2 className="text-lg font-medium text-white mb-2">Weather Updates</h2>
        <p className="text-gray-400 text-sm">
          The global weather system is currently showing normal patterns with some precipitation expected in 
          Northern Europe and Eastern Asia. Temperature gradients are within seasonal norms.
        </p>
      </div>
    </div>
  );
}

function WeatherDetail({ 
  location, 
  temperature, 
  condition, 
  icon,
  onRemove 
}: { 
  location: string; 
  temperature: string; 
  condition: string; 
  icon: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <Card className="bg-[#252A37] border-none p-3 rounded-lg text-white hover:bg-[#2A3042] transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{location}</div>
          <div className="text-xs text-gray-400">{condition}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-lg font-bold">{temperature}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-transparent"
            onClick={onRemove}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
