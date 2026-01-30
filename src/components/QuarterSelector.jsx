import { Button } from "@/components/ui/button";

export function QuarterSelector({ value, onChange }) {
  const quarters = [1, 2, 3, 4];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Quarter
      </label>

      <div className="grid grid-cols-4 gap-2">
        {quarters.map((quarter) => (
          <Button
            key={quarter}
            variant={value === quarter ? "default" : "secondary"}
            className={
              value === quarter
                ? "bg-primary hover:bg-primary/90"
                : "bg-secondary hover:bg-secondary/80"
            }
            onClick={() => onChange(quarter)}
          >
            {quarter}
          </Button>
        ))}
      </div>
    </div>
  );
}
