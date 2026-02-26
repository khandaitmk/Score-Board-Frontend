import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
  import { VolleyballControls } from "@/components/VolleyballControls";
  import { CricketControls } from "@/components/CricketControls";
  import { KabaddiControls } from "@/components/KabaddiControls";
  import { KhoKhoControls } from "@/components/KhoKhoControls";

import { LEDPreview } from "@/components/LEDPreview";
import { SportSelector } from "@/components/SportSelector";
import { FootballControls } from "@/components/FootballControls";
import { BadmintonControls } from "@/components/BadmintonControls";
import { ManualRowEditor } from "@/components/ManualRowEditor";
import { RightSidebar } from "@/components/RightSidebar";

import { useScoreboard } from "@/components/useScoreboard";

export default function Index(props) {
  const [activeTab, setActiveTab] = useState("scoreboard");
  const scoreboard = useScoreboard();

  const renderSportControls = () => {
  switch (scoreboard.state.sport) {
    case "badminton":
      return (
        <BadmintonControls
          badminton={scoreboard.state.badminton}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onPlayer1NameChange={scoreboard.setPlayer1Name}
          onPlayer2NameChange={scoreboard.setPlayer2Name}
          onGameScoreChange={scoreboard.setGameScore}
        />
      );

    case "table-tennis":
      return (
        <BadmintonControls  // reuse same UI, just pass tableTennis state
          badminton={scoreboard.state.tableTennis}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onPlayer1NameChange={scoreboard.setTTPlayer1Name}
          onPlayer2NameChange={scoreboard.setTTPlayer2Name}
          onGameScoreChange={scoreboard.setTTGameScore}
        />
      );

    case "basketball":
      return (
        <FootballControls   // reuse same UI
          football={scoreboard.state.basketball}
          timer={scoreboard.state.timer}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onTeam1NameChange={scoreboard.setBasketballTeam1Name}
          onTeam2NameChange={scoreboard.setBasketballTeam2Name}
          onScore1Change={scoreboard.setBasketballScore1}
          onScore2Change={scoreboard.setBasketballScore2}
          onQuarterChange={scoreboard.setBasketballQuarter}
          onSwapTeams={scoreboard.swapTeams}
          onTimerMinutesChange={scoreboard.setTimerMinutes}
          onTimerSecondsChange={scoreboard.setTimerSeconds}
          onTimerStart={scoreboard.startTimer}
          onTimerPause={scoreboard.pauseTimer}
          onTimerReset={scoreboard.resetTimer}
        />
      );

    case "volleyball":
      return (
        <VolleyballControls
          volleyball={scoreboard.state.volleyball}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onTeam1NameChange={scoreboard.setVolleyballTeam1Name}
          onTeam2NameChange={scoreboard.setVolleyballTeam2Name}
          onSetScoreChange={scoreboard.setSetScore}
        />
      );

    case "cricket":
      return (
        <CricketControls
          cricket={scoreboard.state.cricket}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onTeam1NameChange={scoreboard.setCricketTeam1Name}
          onTeam2NameChange={scoreboard.setCricketTeam2Name}
          onRunsChange={scoreboard.setCricketRuns}
          onWicketsChange={scoreboard.setCricketWickets}
          onOversChange={scoreboard.setCricketOvers}
          onBallsChange={scoreboard.setCricketBalls}
          onTargetChange={scoreboard.setCricketTarget}
          onInningsChange={scoreboard.setCricketInnings}
          onTotalOversChange={scoreboard.setCricketTotalOvers}
        />
      );

    case "kabaddi":
      return (
        <KabaddiControls
          kabaddi={scoreboard.state.kabaddi}
          timer={scoreboard.state.timer}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onTeam1NameChange={scoreboard.setKabaddiTeam1Name}
          onTeam2NameChange={scoreboard.setKabaddiTeam2Name}
          onScore1Change={scoreboard.setKabaddiScore1}
          onScore2Change={scoreboard.setKabaddiScore2}
          onHalfChange={scoreboard.setKabaddiHalf}
          onTimerMinutesChange={scoreboard.setTimerMinutes}
          onTimerSecondsChange={scoreboard.setTimerSeconds}
          onTimerStart={scoreboard.startTimer}
          onTimerPause={scoreboard.pauseTimer}
          onTimerReset={scoreboard.resetTimer}
        />
      );

    case "kho-kho":
      return (
        <KhoKhoControls
          khoKho={scoreboard.state.khoKho}
          timer={scoreboard.state.timer}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onTeam1NameChange={scoreboard.setKhoKhoTeam1Name}
          onTeam2NameChange={scoreboard.setKhoKhoTeam2Name}
          onScore1Change={scoreboard.setKhoKhoScore1}
          onScore2Change={scoreboard.setKhoKhoScore2}
          onTurnChange={scoreboard.setKhoKhoTurn}
          onInningsChange={scoreboard.setKhoKhoInnings}
          onTimerMinutesChange={scoreboard.setTimerMinutes}
          onTimerSecondsChange={scoreboard.setTimerSeconds}
          onTimerStart={scoreboard.startTimer}
          onTimerPause={scoreboard.pauseTimer}
          onTimerReset={scoreboard.resetTimer}
        />
      );

    default: // football
      return (
        <FootballControls
          football={scoreboard.state.football}
          timer={scoreboard.state.timer}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onTeam1NameChange={scoreboard.setTeam1Name}
          onTeam2NameChange={scoreboard.setTeam2Name}
          onScore1Change={scoreboard.setScore1}
          onScore2Change={scoreboard.setScore2}
          onQuarterChange={scoreboard.setQuarter}
          onSwapTeams={scoreboard.swapTeams}
          onTimerMinutesChange={scoreboard.setTimerMinutes}
          onTimerSecondsChange={scoreboard.setTimerSeconds}
          onTimerStart={scoreboard.startTimer}
          onTimerPause={scoreboard.pauseTimer}
          onTimerReset={scoreboard.resetTimer}
        />
      );
  }
};

  return (
    <div className="min-h-screen bg-background">
      {/* LED Preview */}
      <LEDPreview
        rows={scoreboard.state.rows}
        brightness={scoreboard.state.brightness}
        onLogout = {props.onLogout}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 gap-4 mb-6">
            <TabsTrigger value="scoreboard">
              Sports Scoreboards
            </TabsTrigger>
            <TabsTrigger value="manual">
              Manual Editor
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel */}
            <div className="lg:col-span-2 ">
              <TabsContent value="scoreboard">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <SportSelector
                      value={scoreboard.state.sport}
                      onChange={scoreboard.setSport}
                    />
                    {renderSportControls()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manual">
                <Card>
                  <CardContent className="p-6">
                    <ManualRowEditor
                      rows={scoreboard.state.rows}
                      onRowChange={scoreboard.setRowContent}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            {/* Right Sidebar */}
            <RightSidebar
              brightness={scoreboard.state.brightness}
              isHardwareConnected={scoreboard.state.isHardwareConnected}
              onBrightnessChange={scoreboard.setBrightness}
              onReset={scoreboard.resetAll}
              onClear={scoreboard.clearDisplay}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
}
