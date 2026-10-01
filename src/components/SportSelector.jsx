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

        <SelectContent className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-slate-100 border border-slate-700 shadow-2xl rounded-xl w-full p-1.5 mt-1">
          {SPORTS_CONFIG.map((sport) => (
            <SelectItem
              key={sport.id}
              value={sport.id}
              className="hover:bg-blue-600 hover:text-white text-slate-100 cursor-pointer rounded-lg px-3 py-2.5 my-0.5 transition-colors font-medium flex items-center gap-2 border-b border-slate-700/40 last:border-b-0"
            >
              <span className="flex items-center gap-2 text-sm">
                <span className="text-base">{sport.icon}</span>
                <span className="font-semibold">{sport.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
