"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/Progress"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible"
import { Button } from "@/app/components/ui/button"
import { Settings, ChevronDown, Shield, AlertTriangle } from "lucide-react"

export default function ControlInputsComponent() {
  const [control, setControl] = useState({
    mode: "GUIDED",
    armingStatus: 1,
    rcInputs: {
      throttle: 65,
      yaw: 50,
      pitch: 45,
      roll: 50,
    },
    autoTargets: {
      altitude: 125.5,
      heading: 185.2,
      speed: 17.2,
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setControl((prev) => ({
        ...prev,
        rcInputs: {
          throttle: Math.max(0, Math.min(100, prev.rcInputs.throttle + (Math.random() - 0.5) * 5)),
          yaw: Math.max(0, Math.min(100, prev.rcInputs.yaw + (Math.random() - 0.5) * 3)),
          pitch: Math.max(0, Math.min(100, prev.rcInputs.pitch + (Math.random() - 0.5) * 4)),
          roll: Math.max(0, Math.min(100, prev.rcInputs.roll + (Math.random() - 0.5) * 4)),
        },
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getModeColor = (mode) => {
    switch (mode) {
      case "MANUAL":
        return "bg-blue-600"
      case "AUTO":
        return "bg-green-600"
      case "GUIDED":
        return "bg-purple-600"
      case "LOITER":
        return "bg-amber-600"
      case "RTL":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const toggleArming = () => {
    setControl((prev) => ({
      ...prev,
      armingStatus: prev.armingStatus === 1 ? 0 : 1,
    }))
  }

  const changeMode = (newMode) => {
    setControl((prev) => ({
      ...prev,
      mode: newMode,
    }))
  }

  return (
    <Card className="overflow-hidden bg-[#0b1120] rounded-xl p-4 text-white flex flex-col w-full shadow-md border border-gray-800">
      <CardContent className="p-0">
        <div className="bg-[#161d2f] p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">RC & Control Inputs</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-[#21293d] rounded-lg p-3 shadow-md border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Flight Mode</div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getModeColor(control.mode)}`}></div>
                <span className="text-lg font-medium">{control.mode}</span>
              </div>
            </div>

            <div className="bg-[#21293d] rounded-lg p-3 shadow-md border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Arming Status</div>
              <div className="flex items-center gap-2">
                {control.armingStatus === 1 ? (
                  <>
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="text-lg font-medium">Armed</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <span className="text-lg font-medium">Disarmed</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="rc">
            <TabsList className="grid w-full grid-cols-2 bg-[#21293d]">
              <TabsTrigger value="rc">RC Inputs</TabsTrigger>
              <TabsTrigger value="auto">Auto Control</TabsTrigger>
            </TabsList>
            <TabsContent value="rc" className="space-y-4 mt-4">
              <div className="space-y-4">
                {Object.keys(control.rcInputs).map((key) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400 capitalize">{key}</span>
                      <span>{control.rcInputs[key].toFixed(0)}%</span>
                    </div>
                    <Progress value={control.rcInputs[key]} className="h-2 bg-gray-700" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
