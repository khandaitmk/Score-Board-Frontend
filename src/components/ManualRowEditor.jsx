import { Input } from "@/components/ui/input";
import { Lightbulb } from "lucide-react";

export function ManualRowEditor({ rows, onRowChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          Manual Row Editor
        </h2>
        <p className="text-sm text-muted-foreground">
          Edit each row individually for complete control over the display
        </p>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.id} className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Row {row.id}
            </label>
            <Input
              value={row.content}
              onChange={(e) => onRowChange(row.id, e.target.value)}
              className="bg-secondary border-border font-mono"
              placeholder={`Row ${row.id} content...`}
            />
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 p-4 rounded-lg bg-primary/10 border border-primary/20">
        <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="text-yellow-500 font-medium">Tip:</span>{" "}
          Each row represents one horizontal line on the LED display.
          Keep text concise for best visibility.
        </p>
      </div>
    </div>
  );
}
