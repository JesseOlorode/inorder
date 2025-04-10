
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function SplashScreen() {
  const navigate = useNavigate();
  
  // Clear session storage when splash screen loads
  useEffect(() => {
    // Remove this line to prevent clearing the visited flag when returning to splash
    // sessionStorage.removeItem("visited");
  }, []);
  
  const handleEnter = () => {
    // Set visited flag to prevent automatic redirect back to splash
    sessionStorage.setItem("visited", "true");
    // Also update lastRenderTime to prevent refresh detection from triggering
    localStorage.setItem('lastRenderTime', Date.now().toString());
    navigate('/matrix-loading');
  };

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
          className="bg-[#00A16C] hover:bg-[#00C853] text-black font-medium py-2 px-8 rounded text-lg"
        >
          ENTER
        </Button>
      </motion.div>
    </div>
  );
}
