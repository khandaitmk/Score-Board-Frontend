export function LEDPreview({ rows, brightness }) {
  const opacity = brightness / 100;

  return (
    <div className="w-full bg-linear-to-b from-[hsl(220,30%,8%)] to-[hsl(220,25%,12%)] py-8 px-4">
      {/* University Header */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center border-2 border-blue-500">
          <span className="text-2xl">🏛️</span>
        </div>
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Ramdeobaba University
          </h1>
          <p className="text-muted-foreground text-sm">
            Sports Department- ScoreBoard Display
          </p>
        </div>
      </div>

      {/* LED Panel */}
      <div className="max-w-2xl mx-auto">
        <div
          className="led-panel rounded-lg border border-[hsl(var(--led-grid))] overflow-hidden"
          style={{ opacity }}
        >
          <div className="grid grid-rows-6 min-h-[250px] md:min-h-[300px]">
            {rows.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-center border-b border-[hsl(var(--led-grid))] last:border-b-0 px-4 py-2"
              >
                <span
                  className="led-text text-[hsl(var(--led-red))] text-lg md:text-2xl font-bold tracking-wider text-center"
                >
                  {row.content || "\u00A0"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
