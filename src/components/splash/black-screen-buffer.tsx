
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function BlackScreenBuffer() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Mark as visited for routing purposes
    sessionStorage.setItem("visited", "true");
    
    // Set a countdown from 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* This is an intentionally empty black screen */}
    </div>
  );
}
