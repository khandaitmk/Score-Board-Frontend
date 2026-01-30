import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPORTS_CONFIG } from "@/lib/scoreboard";

export function SportSelector({ value, onChange }) {
  const selectedSport = SPORTS_CONFIG.find(
    (sport) => sport.id === value
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Select Sport
      </label>

      <Select value={value} onValueChange={(v) => onChange(v)}>
        <SelectTrigger className="bg-secondary border-primary">
          <SelectValue>
            <span className="flex items-center gap-2">
              {selectedSport ? (
                <>
                  <span>{selectedSport.icon}</span>
                  <span>{selectedSport.name}</span>
                </>
              ) : (
                <span className="text-muted-foreground">
                  Select a sport
                </span>
              )}
            </span>
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="bg-popover border-border">
          {SPORTS_CONFIG.map((sport) => (
            <SelectItem
              key={sport.id}
              value={sport.id}
              className="focus:bg-accent focus:text-accent-foreground"
            >
              <span className="flex items-center gap-2">
                <span>{sport.icon}</span>
                <span>{sport.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
