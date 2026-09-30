import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { ScoreControl } from "./ScoreControl";

export function BadmintonControls({
  badminton = {},
  prefix,
  displayName,
  onPrefixChange,
  onDisplayNameChange,
  onPlayer1NameChange,
  onPlayer2NameChange,
  onGameScoreChange,
  onCurrentGameChange,
  onCurrentP1Change,
  onCurrentP2Change,
  onCompleteGame,
  onSwapPlayers,
}) {
  const gameKeys = Object.keys(badminton?.games || { game1: {}, game2: {}, game3: {} });
  const maxGames = gameKeys.length;
  const activeGameNum = badminton?.currentGame ?? 1;

  return (
    <div className="space-y-6">
      {/* Prefix + Display Name */}
      <div className="flex gap-2">
        <Input
          value={prefix}
          onChange={(e) => onPrefixChange(e.target.value.toUpperCase())}
          className="w-20 bg-secondary border-border"
          placeholder="RBU"
        />
        <Input
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value.toUpperCase())}
          className="flex-1 bg-secondary border-border"
          placeholder="BADMINTON"
        />
      </div>

      {/* Player Names */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          value={badminton.player1Name ?? ""}
          onChange={(e) => onPlayer1NameChange(e.target.value)}
          placeholder="PLAYER 1"
          className="bg-secondary border-border"
        />
        <Input
          value={badminton.player2Name ?? ""}
          onChange={(e) => onPlayer2NameChange(e.target.value)}
          placeholder="PLAYER 2"
          className="bg-secondary border-border"
        />
      </div>

      {/* Active Game Selector */}
      {onCurrentGameChange && (
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Active Playing Game
          </label>
          <div className={`grid grid-cols-${maxGames} gap-2`}>
            {gameKeys.map((gKey, idx) => {
              const gNum = idx + 1;
              return (
                <button
                  key={gKey}
                  type="button"
                  onClick={() => onCurrentGameChange(gNum)}
                  className={`rounded-lg py-2 text-xs font-bold transition-all border ${
                    activeGameNum === gNum
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-secondary text-foreground border-border hover:bg-secondary/80"
                  }`}
                >
                  Game {gNum}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Live Game Score Section */}
      {onCompleteGame && (
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-500 uppercase tracking-wide">
              Live Game Score (Game {activeGameNum})
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {badminton.currentP1 ?? 0} - {badminton.currentP2 ?? 0}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ScoreControl
              label={`Game ${activeGameNum} - P1`}
              value={badminton.currentP1 ?? 0}
              onChange={onCurrentP1Change}
            />
            <ScoreControl
              label={`Game ${activeGameNum} - P2`}
              value={badminton.currentP2 ?? 0}
              onChange={onCurrentP2Change}
            />
          </div>

          <Button
            onClick={onCompleteGame}
            className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md py-5"
          >
            <CheckCircle2 className="h-5 w-5" />
            Finish Game {activeGameNum} ({badminton.currentP1 ?? 0} - {badminton.currentP2 ?? 0}) → Save & Start Game {Math.min(maxGames, activeGameNum + 1)}
          </Button>
        </div>
      )}

      {/* Recorded Game Scores */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
          Recorded Game Scores ({gameKeys.map((k) => k.toUpperCase()).join(", ")})
        </label>
        <div className="space-y-3">
          {gameKeys.map((game, idx) => {
            const isCurrent = activeGameNum === idx + 1;
            return (
              <div
                key={game}
                className={`grid grid-cols-2 gap-4 p-3 rounded-lg border ${
                  isCurrent ? "border-blue-500/50 bg-blue-500/5" : "border-border bg-card"
                }`}
              >
                <ScoreControl
                  label={`${game.toUpperCase()} - P1`}
                  value={badminton.games?.[game]?.p1 ?? 0}
                  onChange={(v) => onGameScoreChange(game, "p1", v)}
                />
                <ScoreControl
                  label={`${game.toUpperCase()} - P2`}
                  value={badminton.games?.[game]?.p2 ?? 0}
                  onChange={(v) => onGameScoreChange(game, "p2", v)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Swap Players Button */}
      {onSwapPlayers && (
        <Button
          onClick={onSwapPlayers}
          className="w-full gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Swap Players / Sides
        </Button>
      )}
    </div>
  );
}
