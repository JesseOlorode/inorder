
import { useEffect, useRef, useState } from 'react';

type MatrixTextProps = {
  hasNavigated: boolean;
};

export function MatrixText({ hasNavigated }: MatrixTextProps) {
  const [matrixText, setMatrixText] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    if (hasNavigated) return;
    
    const generateInitialMatrixText = () => {
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
    
    setMatrixText(generateInitialMatrixText());
    
    const interval = setInterval(() => {
      if (matrixText.length < 100) {
        const useSnippet = Math.random() > 0.3;
        
        let text = '';
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
        
        setMatrixText(prev => [...prev, text]);
        
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }
    }, 300);
    
    return () => clearInterval(interval);
  }, [hasNavigated, matrixText.length]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto mb-4 scrollbar-hide min-h-[80vh]"
      style={{ 
        overflowX: 'hidden',
        height: 'calc(100vh - 180px)',
        maxHeight: 'calc(100vh - 180px)'
      }}
    >
      {matrixText.map((text, index) => (
        <div key={index} className="text-xs sm:text-sm opacity-80">
          {text}
        </div>
      ))}
    </div>
  );
}
