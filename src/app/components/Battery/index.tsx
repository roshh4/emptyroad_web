"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible"
import { Button } from "@/app/components/ui/button"
import { Battery, ChevronDown, ArrowDown, ArrowUp } from "lucide-react"

export default function BatteryComponent() {
  const [battery, setBattery] = useState({
    voltage: 11.8,
    current: 15.2,
    remaining: 75,
    status: "Good",
    history: [78, 77, 76, 75.5, 75.2, 75, 75],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setBattery((prev) => {
        const newRemaining = Math.max(0, Math.min(100, prev.remaining - 0.1))
        const newVoltage = Math.max(9, prev.voltage - 0.01)
        const newHistory = [...prev.history.slice(1), newRemaining]

        let status = "Good"
        if (newRemaining <= 20) status = "Critical"
        else if (newRemaining <= 50) status = "Warning"

        return {
          ...prev,
          remaining: newRemaining,
          voltage: newVoltage,
          history: newHistory,
          status,
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getBatteryColor = (percentage) => {
    if (percentage > 50) return { text: "text-green-400", bg: "bg-green-500" }
    if (percentage > 20) return { text: "text-yellow-400", bg: "bg-yellow-500" }
    return { text: "text-red-400", bg: "bg-red-500" }
  }

  const renderMiniChart = (data, color = "bg-green-500") => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    return (
      <div className="flex items-end h-8 gap-[2px]">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100
          return (
            <div key={index} className={`${color} rounded-sm w-2`} style={{ height: `${Math.max(5, height)}%` }}></div>
          )
        })}
      </div>
    )
  }

  const renderTrend = (current, previous) => {
    if (current > previous) {
      return <ArrowUp className="w-4 h-4 text-green-400" />
    } else if (current < previous) {
      return <ArrowDown className="w-4 h-4 text-red-400" />
    }
    return null
  }

  return (
    <Card className="bg-[#0c1428] text-gray-300 shadow-none rounded-lg overflow-hidden border-0">
      <CardContent className="p-0">
        <div className="bg-[#1a2338] p-4 rounded-t-lg">
          <div className="flex items-center gap-2 mb-4">
            <Battery className="h-5 w-5 text-gray-300" />
            <h3 className="font-semibold text-gray-200">Battery & Power</h3>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Remaining</span>
              <div className="flex items-center gap-1">
                {renderTrend(battery.remaining, battery.history[battery.history.length - 2])}
                <span className={`text-sm font-medium ${getBatteryColor(battery.remaining).text}`}>
                  {battery.status}
                </span>
              </div>
            </div>
            <div className="relative h-6 w-full bg-[#2a334a] rounded-full overflow-hidden">
              <div
                className={`h-full ${getBatteryColor(battery.remaining).bg}`}
                style={{ width: `${battery.remaining}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-300">
                {battery.remaining.toFixed(0)}%
              </div>
            </div>
            
            <div className="mt-2">{renderMiniChart(battery.history, getBatteryColor(battery.remaining).bg)}</div>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0c1428] rounded-lg p-3 shadow-none">
              <div className="text-sm text-gray-400 mb-1">Voltage</div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-200">{battery.voltage.toFixed(1)}</span>
                <span className="text-xs text-gray-400">V</span>
              </div>
            </div>
            <div className="bg-[#0c1428] rounded-lg p-3 shadow-none">
              <div className="text-sm text-gray-400 mb-1">Current</div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-200">{battery.current.toFixed(1)}</span>
                <span className="text-xs text-gray-400">A</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
