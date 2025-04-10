
import { AppLayout } from "@/components/app/app-layout";
import { WeatherMapContent } from "@/components/app/weather-map-content";
import { TooltipProvider } from "@/components/ui/tooltip";

const Weather = () => {
  return (
    <AppLayout>
      <TooltipProvider>
        <WeatherMapContent />
      </TooltipProvider>
    </AppLayout>
  );
};

export default Weather;
