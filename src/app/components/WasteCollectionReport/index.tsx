import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
  nextDockingTime
}) => {
  const totalWasteCollected = Object.values(wasteSorting).reduce((a, b) => a + b, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Waste Collection Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Belt Fill Level</h3>
          <Progress value={beltFillLevel} className="w-full" />
          <p className="text-xs text-muted-foreground mt-1">
            {beltFillLevel}% of bin capacity used
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium">Real-time Waste Collection</h3>
          <p className="text-lg font-bold">{wasteCountPerHour} objects/hour</p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Waste Sorting Breakdown</h3>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(wasteSorting).map(([type, count]) => (
              <div key={type} className="text-center">
                <p className="text-xs capitalize">{type}</p>
                <p className="text-sm font-semibold">
                  {count} ({((count / totalWasteCollected) * 100).toFixed(1)}%)
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium">Next Docking Estimation</h3>
          <p className="text-lg font-bold text-primary">{nextDockingTime}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteCollectionMetrics;