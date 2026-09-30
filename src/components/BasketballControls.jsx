import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
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
  onSwapTeams,
  onTimerMinutesChange,
  onTimerSecondsChange,
  onTimerStart,
  onTimerPause,
  onTimerReset,

}) {
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

      {/* 🟡 Fouls (NEW) */}
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

      {/* Timer */}
      <TimerControl
        {...timer}
        onMinutesChange={onTimerMinutesChange}
        onSecondsChange={onTimerSecondsChange}
        onStart={onTimerStart}
        onPause={onTimerPause}
        onReset={onTimerReset}
      />

      {/* Quarter */}
      <QuarterSelector value={basketball.quarter} onChange={onQuarterChange} />

      {/* Swap Teams */}
      <Button
        onClick={onSwapTeams}
        className="w-full gap-2 bg-blue-500 text-white"
      >
        <ArrowLeftRight className="h-4 w-4" />
        Swap Teams
      </Button>
    </div>
  );
}
