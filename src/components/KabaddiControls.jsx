import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Zap, RefreshCw } from "lucide-react";
import { ScoreControl } from "./ScoreControl";
import { TimerControl } from "./TimerControl";

export function KabaddiControls({
  kabaddi, timer, prefix, displayName,
  onPrefixChange, onDisplayNameChange,
  onTeam1NameChange, onTeam2NameChange,
  onScore1Change, onScore2Change,
  onRaids1Change, onRaids2Change,
  onAllOuts1Change, onAllOuts2Change,
  onAddAllOut, onEndHalf,
  onHalfChange, onSwapTeams,
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

      <div className="grid grid-cols-2 gap-4">
        <ScoreControl label="Raids 1" value={kabaddi.raids1 ?? 0} onChange={onRaids1Change} />
        <ScoreControl label="Raids 2" value={kabaddi.raids2 ?? 0} onChange={onRaids2Change} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ScoreControl label="All-Outs 1" value={kabaddi.allOuts1 ?? 0} onChange={onAllOuts1Change} />
        <ScoreControl label="All-Outs 2" value={kabaddi.allOuts2 ?? 0} onChange={onAllOuts2Change} />
      </div>

      {/* Dynamic All-Out Auto Bonus (+2 pts) Buttons */}
      {onAddAllOut && (
        <div className="space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
          <label className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            Kabaddi All-Out (+2 Bonus Pts to Opponent)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddAllOut(1)}
              className="text-xs font-bold border-amber-500/30 hover:bg-amber-500/10 text-amber-700 dark:text-amber-300"
            >
              💥 All-Out T1 (+2 Pts T2)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddAllOut(2)}
              className="text-xs font-bold border-amber-500/30 hover:bg-amber-500/10 text-amber-700 dark:text-amber-300"
            >
              💥 All-Out T2 (+2 Pts T1)
            </Button>
          </div>
        </div>
      )}

      {/* Half Selector & Half-Time Transition */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Half (1 / 2)</label>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2].map((h) => (
            <button
              key={h}
              onClick={() => onHalfChange(h)}
              className={`rounded-lg py-2 text-sm font-bold border transition-all ${
                (kabaddi.half ?? 1) === h
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-secondary text-foreground border-border hover:bg-secondary/80"
              }`}
            >
              Half {h}
            </button>
          ))}
        </div>

        {onEndHalf && (kabaddi.half ?? 1) === 1 && (
          <Button
            onClick={onEndHalf}
            className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white mt-2 py-4"
          >
            <RefreshCw className="h-4 w-4" />
            End 1st Half → Swap Sides & Start Half 2
          </Button>
        )}
      </div>

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
          className="w-full gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Swap Teams / Sides
        </Button>
      )}
    </div>
  );
}