"use client"

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Shield, AlertTriangle, Settings, Radio, Gamepad2, Sliders } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface ModeIndicatorProps {
  mode: string;
}

interface ArmingStatusProps {
  status: number;
}

interface RCInputs {
  throttle: number;
  yaw: number;
}

interface RCInputDisplayProps {
  inputs: RCInputs;
}

interface FlightModeDisplayProps {
  mode: string;
  availableModes: string[];
  onModeChange: (mode: string) => void;
}

const ModeIndicator = ({ mode }: ModeIndicatorProps) => {
  const modeColors: Record<string, string> = {
    MANUAL: "bg-blue-600",
    AUTO: "bg-green-600",
    GUIDED: "bg-purple-600",
    LOITER: "bg-amber-600",
    RTL: "bg-red-600",
    STABILIZE: "bg-indigo-600",
    ALT_HOLD: "bg-teal-600",
  };

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <span className="text-sm font-medium">{mode}</span>
      <div className={`w-2 h-2 rounded-full ${modeColors[mode.toUpperCase()] || "bg-gray-600"}`} />
    </div>
  );
};

const ArmingStatus = ({ status }: ArmingStatusProps) => (
  <div className="flex items-center gap-1.5 mt-1">
    {status === 1 ? (
      <>
        <Shield className="h-4 w-4 text-green-400" />
        <span className="text-sm font-medium text-green-400">Armed</span>
      </>
    ) : (
      <>
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <span className="text-sm font-medium text-amber-400">Disarmed</span>
      </>
    )}
  </div>
);

const RCInputDisplay = ({ inputs }: RCInputDisplayProps) => {
  const getChannelColor = (channel: keyof RCInputs): string => {
    const colors: Record<keyof RCInputs, string> = {
      throttle: "bg-red-500",
      yaw: "bg-blue-500"
    };
    return colors[channel] || "bg-gray-500";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(inputs).map(([key, value]) => (
          <div key={key} className="bg-[#1c2333] p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-400 capitalize">{key}</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress 
                value={value} 
                className={`h-2 bg-gray-700 w-full ${getChannelColor(key as keyof RCInputs)}`} 
              />
              <span className="text-xs font-medium w-12 text-right">{value.toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FlightModeDisplay = ({ mode, availableModes, onModeChange }: FlightModeDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-[#1c2333] p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">Available Modes</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableModes.map((m) => (
            <Button
              key={m}
              variant={m === mode ? "default" : "outline"}
              className={`text-xs ${m === mode ? "bg-blue-600" : "bg-[#21293d]"}`}
              onClick={() => onModeChange(m)}
            >
              {m}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ControlState {
  mode: string;
  armingStatus: number;
  rcInputs: RCInputs;
  availableModes: string[];
}

export default function ControlInputsComponent() {
  const [control, setControl] = useState<ControlState>({
    mode: "GUIDED",
    armingStatus: 1,
    rcInputs: {
      throttle: 65,
      yaw: 50
    },
    availableModes: ["MANUAL", "GUIDED", "AUTO", "LOITER", "RTL", "STABILIZE", "ALT_HOLD"]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setControl((prev) => {
        const newInputs = Object.fromEntries(
          Object.entries(prev.rcInputs).map(([key, value]) => [
            key,
            Math.max(0, Math.min(100, value + (Math.random() - 0.5) * 5)),
          ])
        );
        return {
          ...prev,
          rcInputs: {
            throttle: newInputs.throttle as number,
            yaw: newInputs.yaw as number
          }
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeMode = (newMode: string) => {
    setControl((prev) => ({
      ...prev,
      mode: newMode.toUpperCase(),
    }));
  };

  return (
    <div className="w-full h-full rounded-lg text-white mb-0">
      <div className="bg-[#161d2f] h-full rounded-lg">
        <div className="p-3 space-y-3">
          <div className="bg-[#21293d] rounded-lg p-2 shadow-md border border-gray-700">
            <div className="text-sm text-gray-400 ">Flight Mode</div>
            <ModeIndicator mode={control.mode} />
          </div>
          <div className="bg-[#21293d] rounded-lg p-2 shadow-md border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Arming Status</div>
            <ArmingStatus status={control.armingStatus} />
          </div>
        </div>

        <div className="p-3 pt-0">
          <RCInputDisplay inputs={control.rcInputs} />
        </div>
      </div>
    </div>
  );
}


{/* <CardContent className="p-0">
        <div className="bg-[#161d2f] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">RC & Control Inputs</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#21293d] rounded-lg p-3 shadow-md border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Flight Mode</div>
              <ModeIndicator mode={control.mode} />
            </div>
            <div className="bg-[#21293d] rounded-lg p-3 shadow-md border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Arming Status</div>
              <ArmingStatus status={control.armingStatus} />
            </div>
          </div>
        </div>
      </CardContent> */}
