
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";

export function MatrixLoading() {
  const [progress, setProgress] = useState(0);
  const [matrixText, setMatrixText] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Matrix character set
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@*!?><|\\/[]{}';
  
  // Generate random matrix text
  useEffect(() => {
    const interval = setInterval(() => {
      if (matrixText.length < 50) {
        const randomLength = Math.floor(Math.random() * 30) + 10;
        let text = '';
        for (let i = 0; i < randomLength; i++) {
          text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setMatrixText(prev => [...prev, text]);
        
        // Auto scroll to the bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [matrixText.length]);
  
  // Progress bar
  useEffect(() => {
    // Set visited flag when matrix loading starts
    sessionStorage.setItem("visited", "true");
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/login');
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#00FF41] font-mono p-4">
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto mb-4 scrollbar-hide"
      >
        <div className="text-center pb-4 text-xl">Initializing System</div>
        {matrixText.map((text, index) => (
          <div key={index} className="text-xs sm:text-sm opacity-80">
            {text}
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <div className="text-xs mb-2">System Initialization: {progress}%</div>
        <Progress 
          value={progress} 
          className="h-2 bg-gray-800"
          indicatorClassName="bg-[#00FF41]"
        />
      </div>
      
      {progress > 30 && (
        <div className="mt-2 text-xs animate-pulse">
          Loading system components...
        </div>
      )}
      
      {progress > 60 && (
        <div className="mt-2 text-xs animate-pulse">
          Preparing interface modules...
        </div>
      )}
      
      {progress > 90 && (
        <div className="mt-2 text-xs animate-pulse">
          System ready...
        </div>
      )}
    </div>
  );
}
