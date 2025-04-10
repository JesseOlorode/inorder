
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function TaskCompleteScreen() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <div className="text-[#00ff65] text-6xl font-bold mb-4">you did</div>
      <div className="text-[#00ff65] text-6xl font-bold mb-10">great</div>
      
      <div className="bg-[#252A37] rounded-lg p-6 w-full max-w-md mb-8">
        <p className="text-lg mb-4">"Awesome work (User's Name)! Let's tackle the next one."</p>
      </div>
      
      <Button
        onClick={() => navigate("/create-task")}
        className="w-full bg-[#00C853] text-black font-medium py-6 rounded mb-4"
      >
        Create Another Task
      </Button>
      
      <div className="text-xs text-gray-400 mt-6 max-w-xs">
        One step at a time. You'll get there.
        <br />
        Remember: Small progress is still progress!
      </div>
    </div>
  );
}
