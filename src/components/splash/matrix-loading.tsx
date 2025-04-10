
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";

export function MatrixLoading() {
  const [progress, setProgress] = useState(0);
  const [matrixText, setMatrixText] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
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
  
  // Generate coding-like text
  useEffect(() => {
    const interval = setInterval(() => {
      if (matrixText.length < 50) {
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
        
        // Auto scroll to the bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, [matrixText.length]);
  
  // Progress bar and navigation
  useEffect(() => {
    // This is CRITICAL: Ensure the visited flag is set when matrix loading starts
    sessionStorage.setItem("visited", "true");
    // Update the timestamp
    localStorage.setItem('lastRenderTime', Date.now().toString());
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Force redirect to login page after animation completes
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
