import { Input } from "@/components/ui/input";
import { ScoreControl } from "./ScoreControl";
import { TimerControl } from "./TimerControl";

export function KabaddiControls({
  kabaddi, timer, prefix, displayName,
  onPrefixChange, onDisplayNameChange,
  onTeam1NameChange, onTeam2NameChange,
  onScore1Change, onScore2Change, onHalfChange,
  onTimerMinutesChange, onTimerSecondsChange,
  onTimerStart, onTimerPause, onTimerReset,
}) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input value={prefix} onChange={(e) => onPrefixChange(e.target.value.toUpperCase())} className="w-20" />
        <Input value={displayName} onChange={(e) => onDisplayNameChange(e.target.value.toUpperCase())} className="flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input value={kabaddi.team1Name} onChange={(e) => onTeam1NameChange(e.target.value)} placeholder="TEAM 1" />
        <Input value={kabaddi.team2Name} onChange={(e) => onTeam2NameChange(e.target.value)} placeholder="TEAM 2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ScoreControl label="Score 1" value={kabaddi.score1} onChange={onScore1Change} />
        <ScoreControl label="Score 2" value={kabaddi.score2} onChange={onScore2Change} />
      </div>

      <ScoreControl label="Half (1/2)" value={kabaddi.half} onChange={onHalfChange} max={2} />

      <TimerControl
        {...timer}
        onMinutesChange={onTimerMinutesChange}
        onSecondsChange={onTimerSecondsChange}
        onStart={onTimerStart}
        onPause={onTimerPause}
        onReset={onTimerReset}
      />
    </div>
  );
}