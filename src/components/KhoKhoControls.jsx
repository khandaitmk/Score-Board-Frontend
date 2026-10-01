import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, UserMinus, RefreshCw } from "lucide-react";
import { ScoreControl } from "./ScoreControl";
import { TimerControl } from "./TimerControl";

export function KhoKhoControls({
  khoKho, timer, prefix, displayName,
  onPrefixChange, onDisplayNameChange,
  onTeam1NameChange, onTeam2NameChange,
  onScore1Change, onScore2Change,
  onDefendersLeftChange, onDefenderOut, onNextInnings,
  onHalfChange, onInningsChange, onSwapTeams,
  onTimerMinutesChange, onTimerSecondsChange,
  onTimerStart, onTimerPause, onTimerReset,
}) {
  const currentInnings = khoKho.half ?? khoKho.innings ?? 1;
  const handleInningsSelect = (val) => {
    if (onHalfChange) onHalfChange(val);
    if (onInningsChange) onInningsChange(val);
  };

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

      {/* Dynamic Defender Out Action Button */}
      {onDefenderOut && (
        <div className="space-y-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3">
          <label className="text-xs font-semibold text-red-500 uppercase tracking-wide flex items-center gap-1.5">
            <UserMinus className="h-4 w-4" />
            Live Kho-Kho Action
          </label>
          <Button
            onClick={onDefenderOut}
            className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-3 text-xs sm:text-sm cursor-pointer shadow-sm flex-wrap justify-center"
          >
            <UserMinus className="h-4 w-4 shrink-0" />
            <span>Defender Out (-1 Def / +1 Pt)</span>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <ScoreControl
          label="Defenders Left (0-9)"
          value={khoKho.defendersLeft ?? 9}
          onChange={(v) => onDefendersLeftChange && onDefendersLeftChange(Math.min(9, Math.max(0, v)))}
        />
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Innings / Half (1 / 2)</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {[1, 2].map((h) => (
              <button
                key={h}
                onClick={() => handleInningsSelect(h)}
                className={`rounded-lg py-2 text-xs sm:text-sm font-bold border transition-all ${
                  currentInnings === h
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-secondary text-foreground border-border hover:bg-secondary/80"
                }`}
              >
                Innings {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {onNextInnings && currentInnings === 1 && (
        <Button
          onClick={onNextInnings}
          className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-3 text-xs sm:text-sm cursor-pointer justify-center"
        >
          <RefreshCw className="h-4 w-4 shrink-0" />
          <span>End Inning 1 → Start Inning 2</span>
        </Button>
      )}

      <TimerControl
        {...timer}
        onMinutesChange={onTimerMinutesChange}
        onSecondsChange={onTimerSecondsChange}
        onStart={onTimerStart}
        onPause={onTimerPause}
        onReset={onTimerReset}
      />

      {onSwapTeams && (
        <Button
          onClick={onSwapTeams}
          className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Swap Teams / Roles
        </Button>
      )}
    </div>
  );
}