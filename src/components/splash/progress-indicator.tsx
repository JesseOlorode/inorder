
import { Progress } from "@/components/ui/progress";

type ProgressIndicatorProps = {
  progress: number;
};

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
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
  );
}
