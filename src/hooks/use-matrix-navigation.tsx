
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useMatrixNavigation() {
  const [progress, setProgress] = useState(0);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      sessionStorage.setItem("visited", "true");
      localStorage.setItem('lastRenderTime', Date.now().toString());
      localStorage.setItem('matrixLoadingStarted', 'true');
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 99.5) {
            clearInterval(interval);
            setProgress(100);
            setShowAccessGranted(true);
            setLoadingComplete(true);
            return 100;
          }
          // Increase speed by incrementing by 2 instead of 0.5
          return prev + 2;
        });
      }, 50); // Decreased interval from 100ms to 50ms
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error in progress handling:", error);
      setTimeout(() => {
        navigateToLogin();
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (loadingComplete && showAccessGranted && !hasNavigated) {
      const timer = setTimeout(() => {
        navigateToLogin();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [loadingComplete, showAccessGranted, hasNavigated]);

  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      if (!hasNavigated) {
        navigateToLogin();
      }
    }, 10000);
    
    return () => clearTimeout(failsafeTimer);
  }, [hasNavigated]);

  const navigateToLogin = () => {
    if (hasNavigated) return;
    
    try {
      setHasNavigated(true);
      localStorage.setItem('matrixLoadingComplete', 'true');
      navigate('/login');
    } catch (navError) {
      console.error("Navigation error:", navError);
      window.location.href = '/login';
    }
  };

  return {
    progress,
    showAccessGranted,
    hasNavigated,
    loadingComplete
  };
}
