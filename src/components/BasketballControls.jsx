import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, FastForward } from "lucide-react";
import { ScoreControl } from "./ScoreControl";
import { TimerControl } from "./TimerControl";
import { QuarterSelector } from "./QuarterSelector";

export function BasketballControls({
  basketball,
  timer,
  prefix,
  displayName,
  onPrefixChange,
  onDisplayNameChange,
  onTeam1NameChange,
  onTeam2NameChange,
  onScore1Change,
  onScore2Change,
  onFouls1Change,
  onFouls2Change,
  onQuarterChange,
  onAdvanceQuarter,
  onSwapTeams,
  onTimerMinutesChange,
  onTimerSecondsChange,
  onTimerStart,
  onTimerPause,
  onTimerReset,
}) {
  const currentQ = basketball.quarter ?? 1;

  return (
    <div className="space-y-6">
      {/* Prefix + Display Name */}
      <div className="flex gap-2">
        <Input
          value={prefix}
          onChange={(e) => onPrefixChange(e.target.value.toUpperCase())}
        />
        <Input
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value.toUpperCase())}
        />
      </div>

      {/* Team Names */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          value={basketball.team1Name}
          onChange={(e) => onTeam1NameChange(e.target.value)}
          placeholder="TEAM 1"
        />
        <Input
          value={basketball.team2Name}
          onChange={(e) => onTeam2NameChange(e.target.value)}
          placeholder="TEAM 2"
        />
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4">
        <ScoreControl
          label="Score 1"
          value={basketball.score1}
          onChange={onScore1Change}
        />
        <ScoreControl
          label="Score 2"
          value={basketball.score2}
          onChange={onScore2Change}
        />
      </div>

      {/* Fouls */}
      <div className="grid grid-cols-2 gap-4">
        <ScoreControl
          label="Fouls 1"
          value={basketball.fouls1}
          onChange={onFouls1Change}
        />
        <ScoreControl
          label="Fouls 2"
          value={basketball.fouls2}
          onChange={onFouls2Change}
        />
      </div>

      {/* Quarter */}
      <div className="space-y-2">
        <QuarterSelector value={basketball.quarter} onChange={onQuarterChange} />

        {onAdvanceQuarter && currentQ < 4 && (
          <Button
            onClick={onAdvanceQuarter}
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-3 text-xs sm:text-sm cursor-pointer flex-wrap sm:flex-nowrap justify-center"
          >
            <FastForward className="h-4 w-4 shrink-0" />
            <span>Advance to Q{currentQ + 1}</span>
            <span className="opacity-85 font-normal text-[11px] sm:text-xs">
              ({currentQ === 2 ? "Reset Fouls & Swap Sides" : "Reset Fouls"})
            </span>
          </Button>
        )}
      </div>

      {/* Timer */}
      <TimerControl
        {...timer}
        onMinutesChange={onTimerMinutesChange}
        onSecondsChange={onTimerSecondsChange}
        onStart={onTimerStart}
        onPause={onTimerPause}
        onReset={onTimerReset}
      />

      {/* Swap Teams */}
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
