
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function DoorTransition() {
  const navigate = useNavigate();
  const [doorOpen, setDoorOpen] = useState(false);
  
  useEffect(() => {
    // Start door opening animation after 1 second
    const doorTimer = setTimeout(() => {
      setDoorOpen(true);
    }, 1000);
    
    // Navigate to login after animation completes (5 seconds total)
    const navigationTimer = setTimeout(() => {
      navigate('/login');
    }, 5000);
    
    return () => {
      clearTimeout(doorTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left door */}
        <motion.div 
          className="absolute h-full w-1/2 bg-black border-r border-[#00FF41] z-10"
          initial={{ x: 0 }}
          animate={{ x: doorOpen ? '-50%' : 0 }}
          transition={{ duration: 3, ease: [0.3, 0.1, 0.3, 1] }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#00FF41] opacity-80"></div>
          <div className="h-full grid place-items-center">
            <div className="text-[#00FF41] font-mono text-lg">SYSTEM</div>
          </div>
        </motion.div>
        
        {/* Right door */}
        <motion.div 
          className="absolute h-full w-1/2 bg-black border-l border-[#00FF41] z-10"
          initial={{ x: 0 }}
          animate={{ x: doorOpen ? '50%' : 0 }}
          transition={{ duration: 3, ease: [0.3, 0.1, 0.3, 1] }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#00FF41] opacity-80"></div>
          <div className="h-full grid place-items-center">
            <div className="text-[#00FF41] font-mono text-lg">READY</div>
          </div>
        </motion.div>
        
        {/* Background content visible when door opens */}
        <div className="flex flex-col items-center justify-center text-[#00FF41] font-mono">
          <div className="text-3xl mb-4">ACCESS GRANTED</div>
          <div className="text-sm opacity-70">INITIALIZING USER INTERFACE</div>
          <div className="mt-8 w-32 h-1 bg-[#00A16C]">
            <motion.div 
              className="h-full bg-[#00FF41]"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, delay: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
