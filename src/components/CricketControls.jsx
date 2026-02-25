import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CricketControls({
  cricket, prefix, displayName,
  onPrefixChange, onDisplayNameChange,
  onTeam1NameChange, onTeam2NameChange,
  onRunsChange, onWicketsChange,
  onOversChange, onBallsChange,
  onTargetChange, onInningsChange,onTotalOversChange,
}) {
const totalOvers = cricket.totalOvers ?? 20;
  const totalBallsPlayed = cricket.overs * 6 + cricket.balls;
  const totalBallsInMatch = totalOvers * 6;

  const runsRequired = cricket.innings === 2 && cricket.target > 0
    ? cricket.target - cricket.runs
    : null;

  const ballsRemaining = cricket.innings === 2 && cricket.target > 0
    ? totalBallsInMatch - totalBallsPlayed
    : null;

  // Add runs
  const addRuns = (r) => onRunsChange(cricket.runs + r);

  // Add ball + auto increment overs
  const addBallAndRuns = (r) => {
    addRuns(r);
    const newBalls = cricket.balls + 1;
    if (newBalls >= 6) {
      onOversChange(cricket.overs + 1);
      onBallsChange(0);
    } else {
      onBallsChange(newBalls);
    }
  };

  // Dot ball
  const addDotBall = () => {
    const newBalls = cricket.balls + 1;
    if (newBalls >= 6) {
      onOversChange(cricket.overs + 1);
      onBallsChange(0);
    } else {
      onBallsChange(newBalls);
    }
  };

  // Wicket
  const addWicket = () => {
    if (cricket.wickets < 10) {
      onWicketsChange(cricket.wickets + 1);
      addDotBall();
    }
  };

  // Switch innings
  const goToSecondInnings = () => {
    onTargetChange(cricket.runs + 1);
    onInningsChange(2);
    onRunsChange(0);
    onWicketsChange(0);
    onOversChange(0);
    onBallsChange(0);
  };

  return (
    <div className="space-y-6">

      {/* Prefix + Display Name */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Display Name
        </label>
        <div className="flex gap-2">
          <Input
            value={prefix}
            onChange={(e) => onPrefixChange(e.target.value.toUpperCase())}
            className="w-20"
            placeholder="RBU"
          />
          <Input
            value={displayName}
            onChange={(e) => onDisplayNameChange(e.target.value.toUpperCase())}
            className="flex-1"
            placeholder="CRICKET"
          />
        </div>
      </div>

      {/* Total Overs Setting */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Match Overs
        </label>
        <div className="grid grid-cols-5 gap-2">
                    {[5, 10, 15, 20, 50].map((o) => (
            <button
                key={o}
                onClick={() => onTotalOversChange(o)}
                className={`rounded-lg py-2 text-sm font-bold transition-all active:scale-95 border
                ${totalOvers === o
                    ? "bg-[#3a62d9] text-white border-[#3a62d9]"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
            >
                {o}
            </button>
            ))}
        </div>
        {/* Manual overs input */}
        <Input
            type="number"
            value={totalOvers}
            onChange={(e) => onTotalOversChange(Number(e.target.value))}
            placeholder="Custom overs e.g. 25"
            className="mt-2"
            />
      </div>

      {/* Team Names */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Teams</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400">
              {cricket.innings === 1 ? "Batting" : "Chasing"} Team
            </label>
            <Input
              value={cricket.team1Name}
              onChange={(e) => onTeam1NameChange(e.target.value)}
              placeholder="TEAM 1"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">
              {cricket.innings === 1 ? "Bowling" : "Defending"} Team
            </label>
            <Input
              value={cricket.team2Name}
              onChange={(e) => onTeam2NameChange(e.target.value)}
              placeholder="TEAM 2"
            />
          </div>
        </div>
      </div>

      {/* Live Score Card */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-4">

        {/* Score Summary */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">
            {cricket.innings === 1 ? "1st Innings" : "2nd Innings"}
          </span>
          <span className="text-2xl font-bold text-black">
            {cricket.runs}/{cricket.wickets}
            <span className="text-sm font-normal text-gray-400 ml-2">
              ({cricket.overs}.{cricket.balls} / {totalOvers} ov)
            </span>
          </span>
        </div>

        {/* Manual score adjust boxes */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 text-center block">Runs</label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onRunsChange(Math.max(0, cricket.runs - 1))}
                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold text-sm"
              >−</button>
              <span className="flex-1 text-center font-bold text-lg">{cricket.runs}</span>
              <button
                onClick={() => onRunsChange(cricket.runs + 1)}
                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold text-sm"
              >+</button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 text-center block">Wickets</label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onWicketsChange(Math.max(0, cricket.wickets - 1))}
                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold text-sm"
              >−</button>
              <span className="flex-1 text-center font-bold text-lg">{cricket.wickets}</span>
              <button
                onClick={() => onWicketsChange(Math.min(10, cricket.wickets + 1))}
                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold text-sm"
              >+</button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 text-center block">Overs</label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (cricket.overs > 0) onOversChange(cricket.overs - 1);
                }}
                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold text-sm"
              >−</button>
              <span className="flex-1 text-center font-bold text-lg">
                {cricket.overs}.{cricket.balls}
              </span>
              <button
                onClick={() => onOversChange(cricket.overs + 1)}
                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold text-sm"
              >+</button>
            </div>
          </div>
        </div>

        {/* Quick Run Buttons */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Quick Add (also counts as a ball)
          </label>
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 6].map((r) => (
              <button
                key={r}
                onClick={() => addBallAndRuns(r)}
                className={`rounded-lg py-3 text-sm font-bold transition-all active:scale-95
                  ${r === 6 ? "bg-green-500 hover:bg-green-600 text-white" :
                    r === 4 ? "bg-blue-500 hover:bg-blue-600 text-white" :
                    "bg-gray-200 hover:bg-gray-300 text-black"}`}
              >
                {r === 6 ? "⬡ 6" : r === 4 ? "◆ 4" : r}
              </button>
            ))}
            <button
              onClick={() => addRuns(1)} // wide = run but no ball
              className="rounded-lg py-3 text-xs font-bold bg-yellow-400 hover:bg-yellow-500 text-black transition-all active:scale-95"
            >
              WD
            </button>
          </div>
        </div>

        {/* Dot Ball + Wicket */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={addDotBall}
            className="rounded-lg py-3 text-sm font-semibold bg-gray-800 hover:bg-gray-900 text-white transition-all active:scale-95"
          >
            • Dot Ball
          </button>
          <button
            onClick={addWicket}
            disabled={cricket.wickets >= 10}
            className="rounded-lg py-3 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-all active:scale-95 disabled:opacity-40"
          >
            🔴 Wicket ({cricket.wickets}/10)
          </button>
        </div>
      </div>

      {/* Target Chase (2nd Innings) */}
      {cricket.innings === 2 && cricket.target > 0 && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 space-y-3">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
            Target: {cricket.target} runs
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg px-3 py-3 border border-blue-100 text-center">
              <p className="text-xs text-gray-400">Runs Required</p>
              <p className={`text-2xl font-bold ${runsRequired <= 0 ? "text-green-500" : "text-black"}`}>
                {runsRequired <= 0 ? "🏆 WON" : runsRequired}
              </p>
            </div>
            <div className="bg-white rounded-lg px-3 py-3 border border-blue-100 text-center">
              <p className="text-xs text-gray-400">Balls Left</p>
              <p className="text-2xl font-bold text-black">
                {Math.max(0, ballsRemaining)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* End 1st Innings Button */}
      {cricket.innings === 1 && (
        <button
          onClick={goToSecondInnings}
          className="w-full rounded-xl py-3 text-sm font-semibold bg-[#3a62d9] hover:bg-[#2a52c9] text-white transition-all"
        >
          End 1st Innings → Start 2nd Innings
        </button>
      )}

    </div>
  );
}