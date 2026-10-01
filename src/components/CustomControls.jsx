import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, LayoutTemplate, PartyPopper, Trophy, Coffee, Megaphone, RotateCcw } from "lucide-react";

export function CustomControls({ custom = {}, onRowChange, onClearAll }) {
  const applyPreset = (presetRows) => {
    presetRows.forEach((text, idx) => {
      if (onRowChange) onRowChange(idx + 1, text);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20 shadow-sm">
        <div>
          <h3 className="font-extrabold text-foreground text-base flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            Custom Display Canvas
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Type custom text in the 6 rows below or click a preset button to load a ready banner!
          </p>
        </div>

        {onClearAll && (
          <Button
            onClick={onClearAll}
            className="gap-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl shadow-md font-bold px-4 py-2.5 cursor-pointer transition-all active:scale-95"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Quick Creative Presets Buttons */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <LayoutTemplate className="h-4 w-4 text-blue-500" />
          Quick Creative Presets
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Button
            type="button"
            onClick={() =>
              applyPreset([
                "WELCOME TO RBU",
                "ANNUAL SPORTS MEET",
                "2026 CHAMPIONSHIP",
                "FAIR PLAY & HONOR",
                "BEST OF LUCK TEAMS",
                "⭐ RBU SPORTS ⭐",
              ])
            }
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold py-3.5 px-4 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm"
          >
            <PartyPopper className="h-4 w-4" />
            Welcome Banner
          </Button>

          <Button
            type="button"
            onClick={() =>
              applyPreset([
                "🏆 CHAMPIONS 2026 🏆",
                "TEAM RBU TIGERS",
                "FINAL MATCH WINNER!",
                "CONGRATULATIONS TEAMS",
                "GRAND TROPHY CEREMONY",
                "⭐⭐⭐⭐⭐⭐⭐",
              ])
            }
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold py-3.5 px-4 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm"
          >
            <Trophy className="h-4 w-4" />
            Winner Trophy
          </Button>

          <Button
            type="button"
            onClick={() =>
              applyPreset([
                "☕ BREAK TIME ☕",
                "HALFTIME ENTERTAINMENT",
                "NEXT MATCH AT 3 PM",
                "BEVERAGES AT CANTEEN",
                "THANK YOU FOR COMING",
                "STAY TUNED! 🎵",
              ])
            }
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold py-3.5 px-4 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm"
          >
            <Coffee className="h-4 w-4" />
            Break Notice
          </Button>

          <Button
            type="button"
            onClick={() =>
              applyPreset([
                "📢 ANNOUNCEMENT 📢",
                "NEXT MATCH: FOOTBALL",
                "TEAM A  vs  TEAM B",
                "GROUND 1 AT 4:00 PM",
                "ALL PLAYERS REPORT",
                "📢 ATTENTION ALL 📢",
              ])
            }
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold py-3.5 px-4 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm"
          >
            <Megaphone className="h-4 w-4" />
            Match Notice
          </Button>

          <Button
            type="button"
            onClick={() =>
              applyPreset([
                "RBU BASKETBALL",
                "FINALS MATCH",
                "TEAM A  vs  TEAM B",
                "TIME LEFT: 05:00",
                "STANDINGS: 42 - 38",
                "🔥 GO RBU TIGERS 🔥",
              ])
            }
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold py-3.5 px-4 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            Custom Game
          </Button>

          <Button
            type="button"
            onClick={() =>
              applyPreset(["", "", "", "", "", ""])
            }
            className="w-full gap-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl shadow-md font-bold py-3.5 px-4 cursor-pointer transition-all active:scale-95 text-xs sm:text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All Rows
          </Button>
        </div>
      </div>

      {/* 6 Custom Row Inputs */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
          Edit Rows Directly (Row 1 - Row 6)
        </label>

        {[1, 2, 3, 4, 5, 6].map((rowNum) => {
          const rowKey = `row${rowNum}`;
          const currentVal = custom[rowKey] ?? "";

          return (
            <div key={rowNum} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[11px] font-mono font-bold">
                    {rowNum}
                  </span>
                  Row {rowNum} {rowNum === 1 ? "(Top Line)" : rowNum === 6 ? "(Bottom Line)" : ""}
                </label>
                <span className="text-[10px] text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded">
                  {currentVal.length} chars
                </span>
              </div>
              <Input
                value={currentVal}
                onChange={(e) => onRowChange && onRowChange(rowNum, e.target.value)}
                placeholder={`Type custom content for Row ${rowNum}...`}
                className="bg-card font-mono text-sm border-border focus:border-blue-500 rounded-xl px-4 py-2.5 shadow-sm"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
