import { Input } from "@/components/ui/input";
import { ScoreControl } from "./ScoreControl";

export function BadmintonControls({
  badminton,
  prefix,
  displayName,
  onPrefixChange,
  onDisplayNameChange,
  onPlayer1NameChange,
  onPlayer2NameChange,
  onGameScoreChange,
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Sport Display Name
        </label>

        <div className="flex gap-2">
          <Input
            value={prefix}
            onChange={(e) =>
              onPrefixChange(e.target.value.toUpperCase())
            }
            className="w-20 bg-secondary border-border"
            placeholder="RBU"
          />
          <Input
            value={displayName}
            onChange={(e) =>
              onDisplayNameChange(e.target.value.toUpperCase())
            }
            className="flex-1 bg-secondary border-border"
            placeholder="BADMINTON"
          />
        </div>

        <p className="text-xs text-primary">
          Row 1 will display: {prefix} {displayName}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          value={badminton.player1Name}
          onChange={(e) =>
            onPlayer1NameChange(e.target.value)
          }
          className="bg-secondary border-border"
        />
        <Input
          value={badminton.player2Name}
          onChange={(e) =>
            onPlayer2NameChange(e.target.value)
          }
          className="bg-secondary border-border"
        />
      </div>

      <div className="space-y-4">
        {["game1", "game2", "game3"].map((game) => (
          <div key={game} className="grid grid-cols-2 gap-4">
            <ScoreControl
              label={`${game.toUpperCase()} - P1`}
              value={badminton.games[game].p1}
              onChange={(v) =>
                onGameScoreChange(game, "p1", v)
              }
            />
            <ScoreControl
              label={`${game.toUpperCase()} - P2`}
              value={badminton.games[game].p2}
              onChange={(v) =>
                onGameScoreChange(game, "p2", v)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
