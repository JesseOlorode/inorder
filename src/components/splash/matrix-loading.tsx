
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function MatrixLoading() {
  const [progress, setProgress] = useState(0);
  const [matrixText, setMatrixText] = useState<string[]>([]);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  // Coding language snippets
  const codingSnippets = [
    "function initialize() { return 'system ready'; }",
    "import React from 'react';",
    "const router = createBrowserRouter();",
    "export default function App() { return <Main />; }",
    "document.addEventListener('DOMContentLoaded', bootstrap);",
    "useEffect(() => { fetchData(); }, []);",
    "const [state, setState] = useState(initialState);",
    "await Promise.all(tasks.map(task => task.execute()));",
    "export class SystemModule implements Module {",
    "try { await loadSystem(); } catch(e) { console.error(e); }",
    "const result = array.filter(item => item.isValid);",
    "interface UserData { id: string; name: string; }",
    "type SystemState = 'booting' | 'ready' | 'error';",
    "const CACHE_DURATION = 60 * 60 * 1000;",
    "navigator.geolocation.getCurrentPosition(success, error);",
    "localStorage.setItem('session', JSON.stringify(data));",
    "return Object.keys(data).map(key => ({ key, value: data[key] }));",
    "const worker = new Worker('./background.js');",
    "window.requestAnimationFrame(renderLoop);",
    "const theme = window.matchMedia('(prefers-color-scheme: dark)').matches;",
    "const socket = new WebSocket('wss://server.example.com');"
  ];
  
  // Generate enough matrix text to fill the screen
  useEffect(() => {
    // Only generate text if we're still on the loading page (not navigated away)
    if (hasNavigated) return;
    
    // Generate a lot more matrix text to fill the screen
    const generateInitialMatrixText = () => {
      // Create initial set of matrix text to fill screen
      const initialTexts = [];
      for (let i = 0; i < 30; i++) {
        let text = '';
        const useSnippet = Math.random() > 0.3;
        
        if (useSnippet && codingSnippets.length > 0) {
          const snippetIndex = Math.floor(Math.random() * codingSnippets.length);
          text = codingSnippets[snippetIndex];
        } else {
          const codePatterns = [
            "const ", "let ", "function ", "if(", "return ", "await ", "async ", 
            "import ", "export ", "class ", "interface ", "type ", "for(", "while("
          ];
          const startPattern = codePatterns[Math.floor(Math.random() * codePatterns.length)];
          text = startPattern + Math.random().toString(36).substring(2, 10) + ";";
        }
        
        initialTexts.push(text);
      }
      return initialTexts;
    };
    
    // Set initial texts that fill the screen
    setMatrixText(generateInitialMatrixText());
    
    // Then keep adding more at a slower rate (increased from 150ms to 300ms)
    const interval = setInterval(() => {
      if (matrixText.length < 100) { // Increase max number of lines
        // Randomly select a code snippet or generate a new one
        const useSnippet = Math.random() > 0.3;
        
        let text = '';
        if (useSnippet && codingSnippets.length > 0) {
          // Use a predefined code snippet
          const snippetIndex = Math.floor(Math.random() * codingSnippets.length);
          text = codingSnippets[snippetIndex];
        } else {
          // Generate code-like text
          const codePatterns = [
            "const ", "let ", "function ", "if(", "return ", "await ", "async ", 
            "import ", "export ", "class ", "interface ", "type ", "for(", "while("
          ];
          
          const startPattern = codePatterns[Math.floor(Math.random() * codePatterns.length)];
          text = startPattern + Math.random().toString(36).substring(2, 10) + ";";
        }
        
        setMatrixText(prev => [...prev, text]);
        
        // Auto scroll to the bottom - with smooth behavior
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }
    }, 300); // Slowed down from 150ms to 300ms
    
    return () => clearInterval(interval);
  }, [hasNavigated]);
  
  // Progress bar and navigation - ENSURE FULL COMPLETION
  useEffect(() => {
    try {
      // This is CRITICAL: Ensure the visited flag is set when matrix loading starts
      sessionStorage.setItem("visited", "true");
      // Update the timestamp
      localStorage.setItem('lastRenderTime', Date.now().toString());
      localStorage.setItem('matrixLoadingStarted', 'true');
      
      const interval = setInterval(() => {
        setProgress(prev => {
          // Only set loading complete when we actually reach 100
          if (prev >= 99.5) {
            clearInterval(interval);
            // Mark loading as complete ONLY when we've actually reached 100%
            setProgress(100);
            setLoadingComplete(true);
            // Show "Access Granted" message before navigating
            setShowAccessGranted(true);
            
            return 100;
          }
          // Slow down progress increment
          return prev + 0.5;
        });
      }, 100);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error in progress handling:", error);
      // Force navigate as fallback
      setTimeout(() => {
        navigateToLogin();
      }, 3000);
    }
  }, []);

  // Navigation effect - ONLY after fully reaching 100%
  useEffect(() => {
    if (loadingComplete && showAccessGranted && !hasNavigated) {
      // Ensure the "ACCESS GRANTED" message stays visible for a moment
      const timer = setTimeout(() => {
        navigateToBufferScreen();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [loadingComplete, showAccessGranted, hasNavigated]);

  // Fallback navigation if we get stuck
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      if (!hasNavigated) {
        navigateToLogin();
      }
    }, 10000); // 10 second failsafe
    
    return () => clearTimeout(failsafeTimer);
  }, [hasNavigated]);

  // Safe navigation functions
  const navigateToBufferScreen = () => {
    if (hasNavigated) return;
    
    try {
      setHasNavigated(true);
      // Set another marker to confirm we've completed matrix loading
      localStorage.setItem('matrixLoadingComplete', 'true');
      navigate('/black-screen-buffer');
    } catch (navError) {
      console.error("Navigation error:", navError);
      // Force redirect as fallback
      window.location.href = '/black-screen-buffer';
    }
  };

  const navigateToLogin = () => {
    if (hasNavigated) return;
    
    try {
      setHasNavigated(true);
      // Set another marker to confirm we've completed matrix loading
      localStorage.setItem('matrixLoadingComplete', 'true');
      navigate('/login');
    } catch (navError) {
      console.error("Navigation error:", navError);
      // Force redirect as fallback
      window.location.href = '/login';
    }
  };

  return (
    <div className="flex flex-col min-h-screen h-full bg-black text-[#00FF41] font-mono p-4 relative overflow-hidden">
      {!showAccessGranted ? (
        <>
          <div className="text-center pb-4 text-xl">Initializing System</div>
          <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto mb-4 scrollbar-hide min-h-[80vh]"
            style={{ 
              overflowX: 'hidden',
              height: 'calc(100vh - 180px)', // Fixed height to prevent layout shifts
              maxHeight: 'calc(100vh - 180px)'
            }}
          >
            {matrixText.map((text, index) => (
              <div key={index} className="text-xs sm:text-sm opacity-80">
                {text}
              </div>
            ))}
          </div>
          
          <div className="w-full fixed bottom-0 left-0 right-0 bg-black py-4 px-4 border-t border-[#00FF41]/20">
            <div className="text-xs mb-2">System Initialization: {Math.floor(progress)}%</div>
            <Progress 
              value={progress} 
              className="h-2 bg-gray-800"
              indicatorClassName="bg-[#00FF41]"
            />
            
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
        </>
      ) : (
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-[#00FF41] mb-4">ACCESS GRANTED</div>
            <div className="text-sm text-[#00FF41]/80">
              Welcome to InOrder System
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Emergency button that appears after loading is complete if we're stuck */}
      {progress >= 100 && !hasNavigated && (
        <button 
          onClick={navigateToLogin}
          className="absolute bottom-4 right-4 text-xs opacity-50 hover:opacity-100"
        >
          Continue to Login
        </button>
      )}
    </div>
  );
}
