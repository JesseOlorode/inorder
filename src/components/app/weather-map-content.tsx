
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Cloud, 
  CloudDrizzle, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Wind 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function WeatherMapContent() {
  const [selectedView, setSelectedView] = useState<"map" | "details">("map");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of weather data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Weather Map</h1>
        <div className="flex space-x-2">
          <Button 
            variant={selectedView === "map" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedView("map")}
            className="bg-[#00A16C] hover:bg-[#008a5c] text-white"
          >
            Map View
          </Button>
          <Button 
            variant={selectedView === "details" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedView("details")}
            className={selectedView === "details" ? "bg-[#00A16C] hover:bg-[#008a5c] text-white" : ""}
          >
            Details
          </Button>
        </div>
      </div>

      {selectedView === "map" ? (
        <Card className="bg-[#252A37] border-none p-4 rounded-lg text-white h-[60vh] relative overflow-hidden">
          {isLoading ? (
            <div className="space-y-4 w-full h-full flex flex-col items-center justify-center">
              <Skeleton className="h-8 w-8 rounded-full bg-[#1A1F2C]" />
              <Skeleton className="h-4 w-32 bg-[#1A1F2C]" />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 overflow-hidden">
                <WorldMapVisualization />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#1A1F2C]/80 backdrop-blur-sm p-3 rounded-lg">
                <div className="text-sm">
                  <span className="font-semibold">Global Weather Patterns</span>
                  <p className="text-xs text-gray-400 mt-1">
                    Interact with the map to view real-time weather conditions around the world.
                  </p>
                </div>
              </div>
            </>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          <WeatherDetail 
            location="Los Angeles, USA" 
            temperature="29°C" 
            condition="Sunny" 
            icon={<Sun className="text-yellow-400" />} 
          />
          <WeatherDetail 
            location="London, UK" 
            temperature="18°C" 
            condition="Rainy" 
            icon={<CloudRain className="text-blue-400" />} 
          />
          <WeatherDetail 
            location="Tokyo, Japan" 
            temperature="26°C" 
            condition="Cloudy" 
            icon={<Cloud className="text-gray-400" />} 
          />
          <WeatherDetail 
            location="Sydney, Australia" 
            temperature="22°C" 
            condition="Windy" 
            icon={<Wind className="text-teal-400" />} 
          />
          <WeatherDetail 
            location="Moscow, Russia" 
            temperature="2°C" 
            condition="Snowing" 
            icon={<CloudSnow className="text-blue-200" />} 
          />
        </div>
      )}

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
  icon 
}: { 
  location: string; 
  temperature: string; 
  condition: string; 
  icon: React.ReactNode 
}) {
  return (
    <Card className="bg-[#252A37] border-none p-3 rounded-lg text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{location}</div>
          <div className="text-xs text-gray-400">{condition}</div>
        </div>
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-lg font-bold">{temperature}</span>
        </div>
      </div>
    </Card>
  );
}

function WorldMapVisualization() {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-full opacity-70"
      style={{ filter: "drop-shadow(0px 0px 1px rgba(255,255,255,0.3))" }}
    >
      {/* Simplified world map outline */}
      <path
        d="M200,250 Q300,200 400,250 T600,250 T800,250"
        stroke="#4F9DA6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M150,200 Q250,180 350,220 T550,200 T750,220 T950,200"
        stroke="#4F9DA6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M100,300 Q200,320 300,280 T500,300 T700,280 T900,300"
        stroke="#4F9DA6"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Continents - very simplified shapes */}
      <path
        d="M250,150 Q300,120 350,150 T450,130 T500,170 L480,220 L400,200 L350,220 L320,190 Z"
        fill="#1D3E53"
        stroke="#4F9DA6"
        strokeWidth="1"
      />
      <path
        d="M600,150 Q650,130 700,160 T780,140 L800,200 L750,230 L700,210 L650,230 Z"
        fill="#1D3E53"
        stroke="#4F9DA6"
        strokeWidth="1"
      />
      <path
        d="M300,270 Q350,250 400,270 T480,260 L500,310 L450,340 L380,320 L340,340 Z"
        fill="#1D3E53"
        stroke="#4F9DA6"
        strokeWidth="1"
      />
      <path
        d="M550,270 Q600,250 650,270 T730,260 L750,310 L700,340 L630,320 L590,340 Z"
        fill="#1D3E53"
        stroke="#4F9DA6"
        strokeWidth="1"
      />
      
      {/* Weather icons positioned around the map */}
      <g transform="translate(300, 140)">
        <circle cx="0" cy="0" r="10" fill="#FFD639" />
        <line x1="-15" y1="0" x2="15" y2="0" stroke="#FFD639" strokeWidth="2" />
        <line x1="0" y1="-15" x2="0" y2="15" stroke="#FFD639" strokeWidth="2" />
      </g>
      
      <g transform="translate(700, 150)">
        <circle cx="0" cy="0" r="8" fill="#81C3D7" />
        <path
          d="M-10,-5 Q0,-15 10,-5 L10,5 Q0,15 -10,5 Z"
          fill="#81C3D7"
          stroke="#4BB5DB"
          strokeWidth="1"
        />
      </g>
      
      <g transform="translate(400, 290)">
        <circle cx="0" cy="0" r="7" fill="#A1D5E1" />
        <line x1="-10" y1="-10" x2="10" y2="10" stroke="#A1D5E1" strokeWidth="2" />
        <line x1="10" y1="-10" x2="-10" y2="10" stroke="#A1D5E1" strokeWidth="2" />
      </g>
      
      <g transform="translate(650, 280)">
        <circle cx="0" cy="0" r="9" fill="#FFFFFF" />
        <circle cx="5" cy="-5" r="9" fill="#FFFFFF" />
        <circle cx="-5" cy="-5" r="9" fill="#FFFFFF" />
      </g>
      
      {/* Animated weather patterns */}
      <circle cx="350" cy="180" r="3" fill="#81C3D7" opacity="0.7">
        <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="680" cy="170" r="3" fill="#81C3D7" opacity="0.7">
        <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="450" cy="300" r="4" fill="#A1D5E1" opacity="0.8">
        <animate attributeName="r" values="4;7;4" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
