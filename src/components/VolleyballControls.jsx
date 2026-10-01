import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { ScoreControl } from "./ScoreControl";

export function VolleyballControls({
  volleyball, prefix, displayName,
  onPrefixChange, onDisplayNameChange,
  onTeam1NameChange, onTeam2NameChange, onSetScoreChange,
  onCurrentScore1Change, onCurrentScore2Change,
  onCurrentSetChange, onCompleteSet, onSwapTeams,
}) {
  const activeSetNum = volleyball.currentSet ?? 1;

  return (
    <div className="space-y-6">
      {/* Prefix + Display Name */}
      <div className="flex gap-2">
        <Input value={prefix} onChange={(e) => onPrefixChange(e.target.value.toUpperCase())} className="w-20" />
        <Input value={displayName} onChange={(e) => onDisplayNameChange(e.target.value.toUpperCase())} className="flex-1" />
      </div>

      {/* Team Names */}
      <div className="grid grid-cols-2 gap-4">
        <Input value={volleyball.team1Name} onChange={(e) => onTeam1NameChange(e.target.value)} placeholder="TEAM 1" />
        <Input value={volleyball.team2Name} onChange={(e) => onTeam2NameChange(e.target.value)} placeholder="TEAM 2" />
      </div>

      {/* Active Set Selector */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Active Playing Set
        </label>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onCurrentSetChange && onCurrentSetChange(s)}
              className={`rounded-lg py-2 text-xs font-bold transition-all border ${
                activeSetNum === s
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-secondary text-foreground border-border hover:bg-secondary/80"
              }`}
            >
              Set {s}
            </button>
          ))}
        </div>
      </div>

      {/* Current Live Set Score */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-500 uppercase tracking-wide">
            Live Score (Set {activeSetNum})
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {volleyball.currentScore1 ?? 0} - {volleyball.currentScore2 ?? 0}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ScoreControl label={`Set ${activeSetNum} - T1`} value={volleyball.currentScore1 ?? 0} onChange={onCurrentScore1Change} />
          <ScoreControl label={`Set ${activeSetNum} - T2`} value={volleyball.currentScore2 ?? 0} onChange={onCurrentScore2Change} />
        </div>

        {/* Complete Set Button */}
        {onCompleteSet && (
          <Button
            onClick={onCompleteSet}
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md py-3 px-3 text-xs sm:text-sm cursor-pointer flex-wrap sm:flex-nowrap justify-center"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Finish Set {activeSetNum} ({volleyball.currentScore1 ?? 0}-{volleyball.currentScore2 ?? 0})</span>
            <span className="opacity-85 font-normal text-[11px] sm:text-xs">
              → Start Set {Math.min(5, activeSetNum + 1)}
            </span>
          </Button>
        )}
      </div>

      {/* Manual Recorded Set Scores */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
          Recorded Set Scores (Set 1 - 5)
        </label>
        <div className="space-y-3">
          {["set1", "set2", "set3", "set4", "set5"].map((setKey, idx) => {
            const setNum = idx + 1;
            const isCurrent = activeSetNum === setNum;
            return (
              <div
                key={setKey}
                className={`grid grid-cols-2 gap-4 p-3 rounded-lg border ${
                  isCurrent ? "border-blue-500/50 bg-blue-500/5" : "border-border bg-card"
                }`}
              >
                <ScoreControl
                  label={`SET ${setNum} - T1`}
                  value={volleyball.sets[setKey]?.t1 ?? 0}
                  onChange={(v) => onSetScoreChange(setKey, "t1", v)}
                />
                <ScoreControl
                  label={`SET ${setNum} - T2`}
                  value={volleyball.sets[setKey]?.t2 ?? 0}
                  onChange={(v) => onSetScoreChange(setKey, "t2", v)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {onSwapTeams && (
        <Button
          onClick={onSwapTeams}
          className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Swap Teams / Sides
        </Button>
      )}
    </div>
  );
}