
import { Button } from "@/components/ui/button";
import { MatrixText } from "./matrix-text";
import { ProgressIndicator } from "./progress-indicator";
import { AccessGranted } from "./access-granted";
import { useMatrixNavigation } from "@/hooks/use-matrix-navigation";

export function MatrixLoading() {
  const {
    progress,
    showAccessGranted,
    hasNavigated,
    loadingComplete,
    navigateToLogin
  } = useMatrixNavigation();

  return (
    <div className="flex flex-col min-h-screen h-full bg-black text-[#00FF41] font-mono p-4 relative overflow-hidden">
      {!showAccessGranted ? (
        <>
          <div className="text-center pb-4 text-xl">Initializing System</div>
          <MatrixText hasNavigated={hasNavigated} />
          <ProgressIndicator progress={progress} />
        </>
      ) : (
        <AccessGranted />
      )}

      {progress >= 100 && !hasNavigated && (
        <Button 
          onClick={navigateToLogin}
          className="absolute bottom-4 right-4 text-xs opacity-50 hover:opacity-100"
        >
          Continue to Login
        </Button>
      )}
    </div>
  );
}
