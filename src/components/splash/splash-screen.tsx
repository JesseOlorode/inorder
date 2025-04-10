
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function SplashScreen() {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Set up safety checks when component mounts
  useEffect(() => {
    const initializeSplashScreen = () => {
      try {
        // Check if we should skip the splash screen
        const visited = sessionStorage.getItem("visited") === "true";
        const lastRenderTime = localStorage.getItem('lastRenderTime');
        const currentTime = Date.now();
        
        // If user has already visited and it's within a reasonable time window, redirect to dashboard
        if (visited && lastRenderTime && (currentTime - parseInt(lastRenderTime, 10)) < 3600000) {
          console.log("Redirecting to dashboard due to recent visit");
          navigate('/dashboard');
          return;
        }
        
        // Mark as initialized to show the splash screen elements
        setIsInitialized(true);
      } catch (error) {
        console.error("Error in SplashScreen initialization:", error);
        // On error, still show the splash screen
        setIsInitialized(true);
      }
    };
    
    // Small delay to ensure proper initialization
    const timer = setTimeout(initializeSplashScreen, 100);
    return () => clearTimeout(timer);
  }, [navigate]);
  
  // Make sure visited flag is set correctly when Enter is clicked
  const handleEnter = () => {
    try {
      // Set multiple storage items to ensure proper tracking
      sessionStorage.setItem("visited", "true");
      localStorage.setItem('lastRenderTime', Date.now().toString());
      localStorage.setItem('appInitialized', 'true');
      
      // Navigate to matrix loading screen
      navigate('/matrix-loading');
    } catch (error) {
      console.error("Error in handleEnter:", error);
      // Fallback: try to navigate anyway
      navigate('/matrix-loading');
    }
  };

  // If not yet initialized, show a simple loading indicator
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00A16C]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <div className="text-white font-mono tracking-widest text-sm mb-2 opacity-80"
             style={{ fontFamily: "'Courier New', monospace", letterSpacing: '0.3em' }}>
          KEEP YOUR LIFE
        </div>
        
        <div className="text-[#00A16C] text-6xl font-bold mb-8">InOrder</div>
        
        <Button 
          onClick={handleEnter}
          className="bg-[#00A16C] hover:bg-[#00A16C]/90 text-black font-medium py-2 px-8 rounded text-lg"
        >
          ENTER
        </Button>
      </motion.div>
    </div>
  );
}
