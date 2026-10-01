import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

export function ScoreControl({ label, value, onChange }) {
  const numVal = typeof value === "number" && !isNaN(value) ? value : 0;

  const handleDecrease = () => {
    if (onChange) onChange(numVal - 1);
  };

  const handleIncrease = () => {
    if (onChange) onChange(numVal + 1);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>

      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          size="icon"
          className="h-10 w-10 rounded-md bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          onClick={handleDecrease}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          value={numVal}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            if (onChange) onChange(isNaN(parsed) ? 0 : parsed);
          }}
          className="text-center bg-secondary border-border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <Button
          size="icon"
          className="h-10 w-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          onClick={handleIncrease}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
