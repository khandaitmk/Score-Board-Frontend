import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

export function ScoreControl({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          size="icon"
          className="h-10 w-10 rounded-md"
          onClick={() => onChange(value - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(parseInt(e.target.value, 10) || 0)
          }
          className="text-center bg-secondary border-border"
        />

        <Button
          size="icon"
          className="h-10 w-10 rounded-md bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/90"
          onClick={() => onChange(value + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
