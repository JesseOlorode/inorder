
import { MatrixText } from "./matrix-text";
import { ProgressIndicator } from "./progress-indicator";
import { AccessGranted } from "./access-granted";
import { useMatrixNavigation } from "@/hooks/use-matrix-navigation";

export function MatrixLoading() {
  const {
    progress,
    showAccessGranted,
    hasNavigated,
    loadingComplete
  } = useMatrixNavigation();

  return (
    <div className="flex flex-col min-h-screen h-full bg-black text-[#00A16C] font-mono p-4 relative overflow-hidden">
      {!showAccessGranted ? (
        <>
          <div className="text-center pb-4 text-xl">Initializing System</div>
          <MatrixText hasNavigated={hasNavigated} />
          <ProgressIndicator progress={progress} />
        </>
      ) : (
        <AccessGranted />
      )}
    </div>
  );
}
