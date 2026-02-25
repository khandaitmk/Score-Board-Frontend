import { Input } from "@/components/ui/input";
import { ScoreControl } from "./ScoreControl";

export function VolleyballControls({
  volleyball, prefix, displayName,
  onPrefixChange, onDisplayNameChange,
  onTeam1NameChange, onTeam2NameChange, onSetScoreChange,
}) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input value={prefix} onChange={(e) => onPrefixChange(e.target.value.toUpperCase())} className="w-20" />
        <Input value={displayName} onChange={(e) => onDisplayNameChange(e.target.value.toUpperCase())} className="flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input value={volleyball.team1Name} onChange={(e) => onTeam1NameChange(e.target.value)} placeholder="TEAM 1" />
        <Input value={volleyball.team2Name} onChange={(e) => onTeam2NameChange(e.target.value)} placeholder="TEAM 2" />
      </div>

      <div className="space-y-4">
        {["set1", "set2", "set3", "set4", "set5"].map((set) => (
          <div key={set} className="grid grid-cols-2 gap-4">
            <ScoreControl
              label={`${set.toUpperCase()} - T1`}
              value={volleyball.sets[set].t1}
              onChange={(v) => onSetScoreChange(set, "t1", v)}
            />
            <ScoreControl
              label={`${set.toUpperCase()} - T2`}
              value={volleyball.sets[set].t2}
              onChange={(v) => onSetScoreChange(set, "t2", v)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}