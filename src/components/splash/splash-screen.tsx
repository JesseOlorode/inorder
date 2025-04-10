
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function SplashScreen() {
  const navigate = useNavigate();
  
  const handleEnter = () => {
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
