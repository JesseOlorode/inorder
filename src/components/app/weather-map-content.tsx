
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Cloud, 
  CloudDrizzle, 
  CloudLightning, 
  CloudRain, 
  CloudSnow,
  Globe,
  Search,
  Sun, 
  Wind 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function WeatherMapContent() {
  const [selectedView, setSelectedView] = useState<"map" | "details">("map");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);

  useEffect(() => {
    // Simulate loading of weather data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!globeRef.current || isLoading) return;

    const startDrag = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      
      if (e instanceof MouseEvent) {
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      } else {
        const touch = e.touches[0];
        lastMousePosRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const onDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      
      let clientX: number, clientY: number;
      
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        const touch = e.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      }
      
      const deltaX = clientX - lastMousePosRef.current.x;
      const deltaY = clientY - lastMousePosRef.current.y;
      
      rotationRef.current.y += deltaX * 0.005;
      rotationRef.current.x = Math.max(-0.5, Math.min(0.5, rotationRef.current.x + deltaY * 0.005));
      
      lastMousePosRef.current = { x: clientX, y: clientY };
    };

    const endDrag = () => {
      isDraggingRef.current = false;
      
      // Resume auto-rotation after a brief pause
      setTimeout(() => {
        autoRotateRef.current = true;
      }, 2000);
    };

    const animate = () => {
      if (autoRotateRef.current && !isDraggingRef.current) {
        rotationRef.current.y += 0.005; // Auto-rotate speed
      }
      
      if (globeRef.current) {
        globeRef.current.style.transform = `rotateX(${rotationRef.current.x * 30}deg) rotateY(${rotationRef.current.y * 360}deg)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Add event listeners for globe interaction
    const globe = globeRef.current;
    globe.addEventListener('mousedown', startDrag);
    globe.addEventListener('touchstart', startDrag);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      globe.removeEventListener('mousedown', startDrag);
      globe.removeEventListener('touchstart', startDrag);
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isLoading]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simulate weather data fetch for the searched city
      setSearchResults(searchQuery);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Weather Map</h1>
        <div className="flex space-x-2">
          <Button 
            variant={selectedView === "map" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedView("map")}
            className="bg-[#00A16C] hover:bg-[#008a5c] text-white flex items-center gap-1"
          >
            <Globe size={16} />
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
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                {searchResults ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                    <h2 className="text-xl font-bold mb-2">{searchResults}</h2>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Sun className="text-yellow-400 h-10 w-10" />
                      <span className="text-3xl font-bold">28°C</span>
                    </div>
                    <p className="text-gray-300 mb-4">Sunny with clear skies</p>
                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                      <div className="bg-[#1A1F2C]/80 p-2 rounded-lg">
                        <p className="text-gray-400 text-xs">Humidity</p>
                        <p className="text-lg font-medium">45%</p>
                      </div>
                      <div className="bg-[#1A1F2C]/80 p-2 rounded-lg">
                        <p className="text-gray-400 text-xs">Wind</p>
                        <p className="text-lg font-medium">8 km/h</p>
                      </div>
                      <div className="bg-[#1A1F2C]/80 p-2 rounded-lg">
                        <p className="text-gray-400 text-xs">Pressure</p>
                        <p className="text-lg font-medium">1013 hPa</p>
                      </div>
                      <div className="bg-[#1A1F2C]/80 p-2 rounded-lg">
                        <p className="text-gray-400 text-xs">UV Index</p>
                        <p className="text-lg font-medium">High</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => setSearchResults(null)}
                    >
                      Back to Globe
                    </Button>
                  </div>
                ) : (
                  <div 
                    ref={globeRef} 
                    className="relative w-72 h-72 cursor-grab active:cursor-grabbing transition-transform will-change-transform"
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  >
                    <InteractiveGlobe />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10">
                          <div className="absolute w-5 h-5 bg-yellow-400/30 rounded-full animate-ping -ml-1 -mt-1"></div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>New York: 24°C, Sunny</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10">
                          <div className="absolute w-5 h-5 bg-blue-400/30 rounded-full animate-ping -ml-1 -mt-1"></div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>London: 18°C, Rainy</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    placeholder="Search for a city..."
                    className="bg-[#1A1F2C]/80 border-none text-white pr-10 h-10"
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

function InteractiveGlobe() {
  return (
    <>
      {/* Base globe with 3D effect and atmosphere */}
      <div className="absolute inset-0 rounded-full bg-[#33658A] shadow-inner flex items-center justify-center overflow-hidden"
           style={{ 
             boxShadow: "inset 0 0 30px rgba(0,0,0,0.5), 0 0 30px rgba(73, 182, 235, 0.3)"
           }}>
        
        {/* Oceans base with gradient for depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#4497c9] to-[#1a3b5a]"></div>
        
        {/* Atmosphere glow */}
        <div className="absolute inset-0 rounded-full opacity-20"
             style={{
               background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, rgba(73, 182, 235, 0) 70%)"
             }}></div>
        
        {/* North America with 3D elevation */}
        <div className="absolute w-20 h-12 bg-[#2F4858] rounded-lg transform -translate-x-3 -translate-y-5 rotate-12"
             style={{ 
               boxShadow: "0 1px 2px rgba(0,0,0,0.3)", 
               background: "linear-gradient(135deg, #3a5a6c 0%, #2F4858 100%)"
             }}></div>
        
        {/* South America with 3D elevation */}
        <div className="absolute w-10 h-16 bg-[#2F4858] rounded-lg transform translate-x-3 translate-y-8 rotate-12"
             style={{ 
               boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
               background: "linear-gradient(135deg, #3a5a6c 0%, #2F4858 100%)"
             }}></div>
        
        {/* Africa & Europe with 3D elevation */}
        <div className="absolute w-14 h-20 bg-[#2F4858] rounded-lg transform translate-x-8 -translate-y-2 -rotate-12"
             style={{ 
               boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
               background: "linear-gradient(135deg, #3a5a6c 0%, #2F4858 100%)" 
             }}></div>
        
        {/* Asia with 3D elevation */}
        <div className="absolute w-16 h-14 bg-[#2F4858] rounded-lg transform translate-x-16 -translate-y-12 rotate-6"
             style={{ 
               boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
               background: "linear-gradient(135deg, #3a5a6c 0%, #2F4858 100%)"
             }}></div>
        
        {/* Australia with 3D elevation */}
        <div className="absolute w-10 h-8 bg-[#2F4858] rounded-lg transform translate-x-20 translate-y-16 rotate-12"
             style={{ 
               boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
               background: "linear-gradient(135deg, #3a5a6c 0%, #2F4858 100%)"
             }}></div>
        
        {/* Antarctica with 3D elevation */}
        <div className="absolute w-14 h-6 bg-[#2F4858] rounded-lg transform -translate-y-24 rotate-180"
             style={{ 
               boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
               background: "linear-gradient(135deg, #42677b 0%, #2F4858 100%)"
             }}></div>

        {/* Cloud layers with different opacities and blurs for depth */}
        <div className="absolute w-12 h-5 bg-white opacity-40 rounded-full blur-sm transform -translate-x-12 -translate-y-18"
             style={{ filter: "blur(4px)" }}></div>
        <div className="absolute w-16 h-6 bg-white opacity-30 rounded-full blur-sm transform translate-x-15 translate-y-12"
             style={{ filter: "blur(3px)" }}></div>
        <div className="absolute w-14 h-5 bg-white opacity-35 rounded-full blur-sm transform translate-x-5 -translate-y-7"
             style={{ filter: "blur(3.5px)" }}></div>
        
        {/* Additional cloud system for more realism */}
        <div className="absolute w-18 h-7 bg-white opacity-25 rounded-full blur-sm transform -translate-x-18 translate-y-16"
             style={{ filter: "blur(5px)" }}></div>
        
        {/* Highlights for 3D effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-10 rounded-t-full"></div>
      </div>
      
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full opacity-20"
           style={{ 
             boxShadow: "0 0 20px 5px rgba(73, 182, 235, 0.4), 0 0 40px 10px rgba(73, 182, 235, 0.1)"
           }}></div>
      
      {/* Additional atmospheric haze */}
      <div className="absolute inset-0 rounded-full bg-[#4ECDC4] opacity-5 blur-md"></div>
    </>
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
