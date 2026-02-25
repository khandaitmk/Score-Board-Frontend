import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wifi,
  RefreshCw,
  RotateCcw,
  Trash2,
  Settings,
  Activity,
} from "lucide-react";

export function RightSidebar({
  brightness,
  isHardwareConnected,
  onBrightnessChange,
  onReset,
  onClear,
}) {
  return (
    <div className="space-y-4 bg-[#0f1b2d] min-h-screen p-4 rounded-xl">
      {/* Hardware Status */}
      <Card className="bg-[#1a2a3a] border-[#2a3a4a]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  isHardwareConnected ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <Wifi className="h-5 w-5 text-white" />
              <span className="font-medium text-white">Hardware Connected</span>
            </div>
            <Button variant="ghost" size="icon" className="text-white h-8 w-8 hover:bg-[#2a3a4a]">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-green-400 mt-2">Real-time sync enabled</p>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card className="bg-[#1a2a3a] border-[#2a3a4a]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-white">
            Display Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Brightness:</span>
              <span className="text-gray-300">{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              onValueChange={(v) => onBrightnessChange(v[0])}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-black">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onReset}
              className="bg-blue-500 hover:bg-blue-600 text-white gap-2 rounded-lg"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={onClear}
              className="bg-[#6b7280] hover:bg-[#4b5563] text-white gap-2 rounded-lg"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hardware Settings */}
      <Card className="bg-[#1e2a38] border-[#2a3a4a]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-white">Hardware Settings</span>
          </div>
        </CardContent>
      </Card>

      {/* Display Info */}
      <Card className="bg-[#2a52c9] border-[#3a62d9]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-white">
            Display Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-200">Type:</span>
              <span className="text-white">P10 LED Module</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Resolution:</span>
              <span className="text-white">128×96 pixels</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Grid:</span>
              <span className="text-white">6 rows × 4 columns</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Module Size:</span>
              <span className="text-white">32×16 px each</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Sports:</span>
              <span className="text-white">8 supported</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Sync Active Banner */}
      <div className="flex items-center justify-between bg-green-500 hover:bg-green-600 transition-colors rounded-xl px-4 py-3 cursor-pointer">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-white" />
          <span className="text-white font-medium text-sm">Live Sync Active</span>
        </div>
        <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
      </div>
    </div>
  );
}