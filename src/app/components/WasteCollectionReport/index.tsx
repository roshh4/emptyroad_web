import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/Progress";

interface WasteCollectionMetricsProps {
  beltFillLevel: number;
  wasteCountPerHour: number;
  wasteSorting: {
    organic: number;
    plastic: number;
    paper: number;
    metal: number;
    other: number;
  };
  nextDockingTime: string;
}

const WasteCollectionMetrics: React.FC<WasteCollectionMetricsProps> = ({
  beltFillLevel,
  wasteCountPerHour,
  wasteSorting,
  nextDockingTime,
}) => {
  const totalWasteCollected = Object.values(wasteSorting).reduce((a, b) => a + b, 0);

  return (
    <Card className="w-full h-full bg-transparent shadow-none rounded-none p-4">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-sm">Waste Collection Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-0">
        {/* Belt Fill Level */}
        <div>
          <h3 className="text-xs font-medium mb-1">Belt Fill Level</h3>
          <Progress value={beltFillLevel} className="w-full h-2" />
          <p className="text-[10px] text-muted-foreground mt-1">
            {beltFillLevel}% of bin capacity used
          </p>
        </div>

        {/* Real-time Waste Collection */}
        <div>
          <h3 className="text-xs font-medium">Real-time Waste Collection</h3>
          <p className="text-sm font-bold">{wasteCountPerHour} objects/hour</p>
        </div>

        {/* Waste Sorting Breakdown */}
        <div>
          <h3 className="text-xs font-medium mb-1">Waste Sorting Breakdown</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 text-center">
            {Object.entries(wasteSorting).map(([type, count]) => (
              <div key={type} className="text-xs">
                <p className="capitalize">{type}</p>
                <p className="font-semibold">{count} ({((count / totalWasteCollected) * 100).toFixed(1)}%)</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Docking Time */}
        <div>
          <h3 className="text-xs font-medium">Next Docking Estimation</h3>
          <p className="text-sm font-bold text-primary">{nextDockingTime}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteCollectionMetrics;
