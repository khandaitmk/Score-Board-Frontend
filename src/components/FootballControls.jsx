import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, FastForward } from "lucide-react";
import { ScoreControl } from "./ScoreControl";
import { TimerControl } from "./TimerControl";
import { QuarterSelector } from "./QuarterSelector";

export function FootballControls({
  football,
  timer,
  prefix,
  displayName,
  onPrefixChange,
  onDisplayNameChange,
  onTeam1NameChange,
  onTeam2NameChange,
  onScore1Change,
  onScore2Change,
  onQuarterChange,
  onNextQuarter,
  onSwapTeams,
  onTimerMinutesChange,
  onTimerSecondsChange,
  onTimerStart,
  onTimerPause,
  onTimerReset,
}) {
  const currentQ = football.quarter ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={prefix}
          onChange={(e) =>
            onPrefixChange(e.target.value.toUpperCase())
          }
        />
        <Input
          value={displayName}
          onChange={(e) =>
            onDisplayNameChange(e.target.value.toUpperCase())
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          value={football.team1Name}
          onChange={(e) =>
            onTeam1NameChange(e.target.value)
          }
        />
        <Input
          value={football.team2Name}
          onChange={(e) =>
            onTeam2NameChange(e.target.value)
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ScoreControl
          label="Score 1"
          value={football.score1}
          onChange={onScore1Change}
        />
        <ScoreControl
          label="Score 2"
          value={football.score2}
          onChange={onScore2Change}
        />
      </div>

      <TimerControl
        {...timer}
        onMinutesChange={onTimerMinutesChange}
        onSecondsChange={onTimerSecondsChange}
        onStart={onTimerStart}
        onPause={onTimerPause}
        onReset={onTimerReset}
      />

      <div className="space-y-2">
        <QuarterSelector
          value={football.quarter}
          onChange={onQuarterChange}
        />

        {onNextQuarter && currentQ < 4 && (
          <Button
            onClick={onNextQuarter}
            className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4"
          >
            <FastForward className="h-4 w-4" />
            Advance to Q{currentQ + 1} {currentQ === 2 ? "(Swaps Halftime Sides)" : ""}
          </Button>
        )}
      </div>

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
