import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw } from "lucide-react";

export function TimerControl({
  minutes,
  seconds,
  isRunning,
  onMinutesChange,
  onSecondsChange,
  onStart,
  onPause,
  onReset,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Timer (MM:SS)
      </label>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={minutes}
          onChange={(e) =>
            onMinutesChange(parseInt(e.target.value, 10) || 0)
          }
          className="w-20 text-center bg-secondary border-border"
          min={0}
        />

        <span className="text-foreground font-bold">:</span>

        <Input
          type="number"
          value={seconds}
          onChange={(e) =>
            onSecondsChange(parseInt(e.target.value, 10) || 0)
          }
          className="w-20 text-center bg-secondary border-border"
          min={0}
          max={59}
        />

        <Button
          onClick={isRunning ? onPause : onStart}
          className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90 gap-2"
        >
          {isRunning ? (
            <>
              <Pause className="h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Start
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          size="icon"
          onClick={onReset}
          className="bg-muted hover:bg-muted/80"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
