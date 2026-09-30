import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Sparkles, X, CheckCircle2 } from "lucide-react";

export function VictoryCelebrator({
  state,
  onTriggerCelebration,
  onExitCelebration,
}) {
  const [customWinner, setCustomWinner] = useState("");
  const [customDetails, setCustomDetails] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isCelebrationActive = state.isCelebrationMode;
  const currentWinner = state.celebrationData?.winnerName || "";

  // Helper to suggest winner based on active sport
  const getSuggestedWinners = () => {
    const { sport } = state;
    if (sport === "football") {
      const { team1Name, team2Name, score1, score2 } = state.football;
      return [
        { name: team1Name, details: `Score: ${score1} - ${score2}` },
        { name: team2Name, details: `Score: ${score2} - ${score1}` },
      ];
    }
    if (sport === "basketball") {
      const { team1Name, team2Name, score1, score2 } = state.basketball;
      return [
        { name: team1Name, details: `Score: ${score1} - ${score2}` },
        { name: team2Name, details: `Score: ${score2} - ${score1}` },
      ];
    }
    if (sport === "cricket") {
      const { team1Name, team2Name, runs, wickets, target, innings } = state.cricket;
      if (innings === 2 && target > 0) {
        if (runs >= target) {
          return [{ name: team1Name, details: `Target Chased: ${target}` }];
        } else {
          return [{ name: team2Name, details: `Defended Target: ${target}` }];
        }
      }
      return [
        { name: team1Name, details: `Score: ${runs}/${wickets}` },
        { name: team2Name, details: `Bowling Team` },
      ];
    }
    if (sport === "badminton") {
      const { player1Name, player2Name } = state.badminton;
      return [
        { name: player1Name, details: "Match Winner" },
        { name: player2Name, details: "Match Winner" },
      ];
    }
    if (sport === "table-tennis") {
      const { player1Name, player2Name } = state.tableTennis;
      return [
        { name: player1Name, details: "Match Winner" },
        { name: player2Name, details: "Match Winner" },
      ];
    }
    if (sport === "volleyball") {
      const { team1Name, team2Name } = state.volleyball;
      return [
        { name: team1Name, details: "Match Winner" },
        { name: team2Name, details: "Match Winner" },
      ];
    }
    if (sport === "kabaddi") {
      const { team1Name, team2Name, score1, score2 } = state.kabaddi;
      return [
        { name: team1Name, details: `Score: ${score1} - ${score2}` },
        { name: team2Name, details: `Score: ${score2} - ${score1}` },
      ];
    }
    if (sport === "kho-kho") {
      const { team1Name, team2Name, score1, score2 } = state.khoKho;
      return [
        { name: team1Name, details: `Score: ${score1} - ${score2}` },
        { name: team2Name, details: `Score: ${score2} - ${score1}` },
      ];
    }
    return [
      { name: "TEAM 1", details: "CHAMPIONS" },
      { name: "TEAM 2", details: "CHAMPIONS" },
    ];
  };

  const suggestions = getSuggestedWinners();

  const handleCelebrate = (name, details) => {
    onTriggerCelebration(name, details);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      {isCelebrationActive ? (
        <div className="rounded-xl border-2 border-amber-400 bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold animate-bounce text-lg">
              🏆
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Victory Celebration Active on LED Matrix!
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Displaying Winner: <span className="font-bold uppercase text-amber-900 dark:text-amber-100">{currentWinner}</span>
              </p>
            </div>
          </div>
          <Button
            onClick={onExitCelebration}
            variant="destructive"
            size="sm"
            className="gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer"
          >
            <X className="w-4 h-4" />
            Resume Live Scoreboard
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
          >
            <Trophy className="w-5 h-5 text-yellow-200" />
            🏆 Declare Winner & Celebrate
            <Sparkles className="w-4 h-4 text-yellow-200" />
          </Button>

          {isOpen && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/95 dark:bg-gray-900/90 dark:border-amber-900/50 p-4 space-y-4 shadow-xl">
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
                Quick Select Winner:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCelebrate(sug.name, sug.details)}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-amber-300 bg-white dark:bg-gray-800 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-gray-700 transition-all active:scale-95 text-center cursor-pointer"
                  >
                    <span className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase">
                      {sug.name}
                    </span>
                    <span className="text-xs text-amber-600 dark:text-amber-400">
                      {sug.details}
                    </span>
                  </button>
                ))}
              </div>

              <div className="border-t border-amber-200 dark:border-amber-900/50 pt-3 space-y-2">
                <p className="text-xs text-gray-500 font-medium">Or enter custom winner text:</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Winning Team / Player Name"
                    value={customWinner}
                    onChange={(e) => setCustomWinner(e.target.value)}
                    className="bg-white dark:bg-gray-800"
                  />
                  <Input
                    placeholder="Details e.g. Score 3-1"
                    value={customDetails}
                    onChange={(e) => setCustomDetails(e.target.value)}
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
                <Button
                  onClick={() => handleCelebrate(customWinner || "CHAMPIONS", customDetails)}
                  disabled={!customWinner.trim()}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2 cursor-pointer mt-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Show Custom Winner on Board
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
