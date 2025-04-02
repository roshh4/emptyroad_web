"use client"

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Shield, AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const ModeIndicator = ({ mode }) => {
  const modeColors = {
    MANUAL: "bg-blue-600",
    AUTO: "bg-green-600",
    GUIDED: "bg-purple-600",
    LOITER: "bg-amber-600",
    RTL: "bg-red-600",
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-medium">{mode}</span>
      <div className={`w-3 h-3 rounded-full ${modeColors[mode.toUpperCase()] || "bg-gray-600"}`} />
    </div>
  );
};

const ArmingStatus = ({ status }) => (
  <div className="flex items-center gap-2">
    {status === 1 ? (
      <>
        <Shield className="h-5 w-5 text-white-800" />
        <span className="text-lg font-medium">Armed</span>
      </>
    ) : (
      <>
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <span className="text-lg font-medium">Disarmed</span>
      </>
    )}
  </div>
);

const RCInputDisplay = ({ inputs }) => (
  <div className="grid grid-cols-4 gap-4">
    {Object.entries(inputs).map(([key, value]) => (
      <div key={key} className="flex flex-col items-center">
        <span className="text-gray-400 text-xs capitalize">{key}</span>
        <Progress value={value} className="h-2 bg-gray-700 w-20 mt-1" />
        <span className="text-xs mt-1">{value.toFixed(0)}%</span>
      </div>
    ))}
  </div>
);

export default function ControlInputsComponent() {
  const [control, setControl] = useState({
    mode: "GUIDED",
    armingStatus: 1,
    rcInputs: { throttle: 65, yaw: 50, pitch: 45, roll: 50 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setControl((prev) => ({
        ...prev,
        rcInputs: Object.fromEntries(
          Object.entries(prev.rcInputs).map(([key, value]) => [
            key,
            Math.max(0, Math.min(100, value + (Math.random() - 0.5) * 5)),
          ])
        ),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeMode = (newMode) => {
    setControl((prev) => ({
      ...prev,
      mode: newMode.toUpperCase(),
    }));
  };

  return (
    <Card className="bg-[#0b1120] rounded-xl p-4 text-white flex flex-col w-full shadow-md border border-gray-800">
      <CardContent className="p-0">
        <div className="bg-[#161d2f] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">RC & Control Inputs</h3>
            </div>
            <Button onClick={() => changeMode(control.mode === "AUTO" ? "MANUAL" : "AUTO")} className={`${control.mode === "AUTO" ? "bg-red-600" : "bg-green-600"} text-white px-4 py-1 rounded-md text-sm`}>
              {control.mode === "AUTO" ? "Manual Control" : "Auto Control"}
            </Button>
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

          <Tabs defaultValue="rc">
            <TabsList className="grid w-full grid-cols-1 bg-[#21293d]">
              <TabsTrigger value="rc">RC Inputs</TabsTrigger>
            </TabsList>
            <TabsContent value="rc" className="space-y-2 mt-2">
              <RCInputDisplay inputs={control.rcInputs} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
