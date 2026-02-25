import { Input } from "@/components/ui/input";
import { ScoreControl } from "./ScoreControl";
import { TimerControl } from "./TimerControl";

export function KhoKhoControls({
  khoKho, timer, prefix, displayName,
  onPrefixChange, onDisplayNameChange,
  onTeam1NameChange, onTeam2NameChange,
  onScore1Change, onScore2Change,
  onTurnChange, onInningsChange,
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
        <Input value={khoKho.team1Name} onChange={(e) => onTeam1NameChange(e.target.value)} placeholder="TEAM 1" />
        <Input value={khoKho.team2Name} onChange={(e) => onTeam2NameChange(e.target.value)} placeholder="TEAM 2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ScoreControl label="Score 1" value={khoKho.score1} onChange={onScore1Change} />
        <ScoreControl label="Score 2" value={khoKho.score2} onChange={onScore2Change} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ScoreControl label="Innings (1/2)" value={khoKho.innings} onChange={onInningsChange} max={2} />
        <ScoreControl label="Turn (1/2)" value={khoKho.turn} onChange={onTurnChange} max={2} />
      </div>

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