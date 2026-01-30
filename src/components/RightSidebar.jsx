import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wifi,
  RefreshCw,
  RotateCcw,
  Trash2,
  Settings,
} from "lucide-react";

export function RightSidebar({
  brightness,
  isHardwareConnected,
  onBrightnessChange,
  onReset,
  onClear,
}) {
  return (
    <div className="space-y-4">
      {/* Hardware Status */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  isHardwareConnected
                    ? "bg-[hsl(var(--success))]"
                    : "bg-destructive"
                }`}
              />
              <Wifi className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">
                Hardware Connected
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-[hsl(var(--success))] mt-2">
            Real-time sync enabled
          </p>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Display Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Brightness:</span>
              <span className="text-foreground">{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              onValueChange={(v) => onBrightnessChange(v[0])}
              max={100}
              step={1}
              className="**:[[role=slider]]:bg-destructive [&_.bg-primary]:bg-destructive"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onReset}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={onClear}
              variant="secondary"
              className="bg-muted hover:bg-muted/80 gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hardware Settings */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">
              Hardware Settings
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Display Info */}
      <Card className="bg-linear-to-br from-primary/20 to-primary/5 border-primary/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Display Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="text-foreground">P10 LED Module</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resolution:</span>
              <span className="text-foreground">128×96 pixels</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grid:</span>
              <span className="text-foreground">6 rows × 4 columns</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Module Size:</span>
              <span className="text-foreground">32×16 px each</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sports:</span>
              <span className="text-foreground">8 supported</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
