
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginLoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading and redirect to dashboard after 2 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-[#00C853] text-5xl font-medium mb-5">In Order</div>
      <div className="text-sm text-gray-400 mb-8">Wait for Second...</div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00C853]"></div>
      <div className="text-sm text-gray-400 mt-8">
        "Productivity is never an accident. It is always the result of commitment to excellence."
      </div>
    </div>
  );
}
