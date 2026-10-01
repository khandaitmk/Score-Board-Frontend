import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
  import { VolleyballControls } from "@/components/VolleyballControls";
  import { CricketControls } from "@/components/CricketControls";
  import { KabaddiControls } from "@/components/KabaddiControls";
  import { KhoKhoControls } from "@/components/KhoKhoControls";
  import { CustomControls } from "@/components/CustomControls";

import { VictoryCelebrator } from "@/components/VictoryCelebrator";
import { LEDPreview } from "@/components/LEDPreview";
import { SportSelector } from "@/components/SportSelector";
import { BasketballControls } from "@/components/BasketballControls";
import { FootballControls } from "@/components/FootballControls";
import { BadmintonControls } from "@/components/BadmintonControls";
import { ManualRowEditor } from "@/components/ManualRowEditor";
import { RightSidebar } from "@/components/RightSidebar";

import { useScoreboard } from "@/components/useScoreboard";
import { useESP32 } from "../hooks/useESP32";

export default function Index(props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("scoreboard");
  const scoreboard = useScoreboard();
  const { connected, error, sendToESP32 , reconnect } = useESP32();

  useEffect(() => {
    sendToESP32({
      rows: scoreboard.state.rows,
      brightness: scoreboard.state.brightness,
      sport: scoreboard.state.sport,
    });
  }, [
    scoreboard.state.rows,
    scoreboard.state.brightness,
    scoreboard.state.sport,
  ]);

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
          onCurrentGameChange={scoreboard.setBadmintonCurrentGame}
          onCurrentP1Change={scoreboard.setBadmintonCurrentP1}
          onCurrentP2Change={scoreboard.setBadmintonCurrentP2}
          onCompleteGame={scoreboard.completeBadmintonGame}
          onSwapPlayers={scoreboard.swapBadmintonPlayers}
        />
      );

    case "table-tennis":
      return (
        <BadmintonControls
          badminton={scoreboard.state.tableTennis}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onPlayer1NameChange={scoreboard.setTTPlayer1Name}
          onPlayer2NameChange={scoreboard.setTTPlayer2Name}
          onGameScoreChange={scoreboard.setTTGameScore}
          onCurrentGameChange={scoreboard.setTTCurrentGame}
          onCurrentP1Change={scoreboard.setTTCurrentP1}
          onCurrentP2Change={scoreboard.setTTCurrentP2}
          onCompleteGame={scoreboard.completeTTGame}
          onSwapPlayers={scoreboard.swapTTPlayers}
        />
      );

    case "basketball":
      return (
        <BasketballControls
          basketball={scoreboard.state.basketball}
          timer={scoreboard.state.timer}
          prefix={scoreboard.state.prefix}
          displayName={scoreboard.state.displayName}
          onPrefixChange={scoreboard.setPrefix}
          onDisplayNameChange={scoreboard.setDisplayName}
          onTeam1NameChange={scoreboard.setBasketballTeam1Name}
          onTeam2NameChange={scoreboard.setBasketballTeam2Name}
          onScore1Change={scoreboard.setBasketballScore1}
          onScore2Change={scoreboard.setBasketballScore2}
          onFouls1Change={scoreboard.setBasketballFouls1}
          onFouls2Change={scoreboard.setBasketballFouls2}
          onQuarterChange={scoreboard.setBasketballQuarter}
          onAdvanceQuarter={scoreboard.advanceBasketballQuarter}
          onSwapTeams={scoreboard.swapBasketballTeams}
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
          onCurrentScore1Change={scoreboard.setCurrentScore1}
          onCurrentScore2Change={scoreboard.setCurrentScore2}
          onCurrentSetChange={scoreboard.setVolleyballCurrentSet}
          onCompleteSet={scoreboard.completeVolleyballSet}
          onSwapTeams={scoreboard.swapVolleyballTeams}
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
          onTriggerCelebration={scoreboard.triggerCelebration}
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
          onRaids1Change={scoreboard.setKabaddiRaids1}
          onRaids2Change={scoreboard.setKabaddiRaids2}
          onAllOuts1Change={scoreboard.setKabaddiAllOuts1}
          onAllOuts2Change={scoreboard.setKabaddiAllOuts2}
          onAddAllOut={scoreboard.addKabaddiAllOut}
          onEndHalf={scoreboard.endKabaddiHalf}
          onHalfChange={scoreboard.setKabaddiHalf}
          onSwapTeams={scoreboard.swapKabaddiTeams}
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
          onDefendersLeftChange={scoreboard.setKhoKhoDefendersLeft}
          onDefenderOut={scoreboard.khoKhoDefenderOut}
          onNextInnings={scoreboard.nextKhoKhoInnings}
          onHalfChange={scoreboard.setKhoKhoHalf}
          onTurnChange={scoreboard.setKhoKhoTurn}
          onInningsChange={scoreboard.setKhoKhoInnings}
          onSwapTeams={scoreboard.swapKhoKhoTeams}
          onTimerMinutesChange={scoreboard.setTimerMinutes}
          onTimerSecondsChange={scoreboard.setTimerSeconds}
          onTimerStart={scoreboard.startTimer}
          onTimerPause={scoreboard.pauseTimer}
          onTimerReset={scoreboard.resetTimer}
        />
      );

    case "custom":
      return (
        <CustomControls
          custom={scoreboard.state.custom}
          onRowChange={scoreboard.setCustomRowContent}
          onClearAll={scoreboard.clearCustomRows}
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
          onNextQuarter={scoreboard.nextFootballQuarter}
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
        onGoToStartUp={() => navigate("/StartUpPage")}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-1 gap-4 mb-6">
            <TabsTrigger value="scoreboard">
              Sports Scoreboards
            </TabsTrigger>
            {/* <TabsTrigger value="manual">
              Manual Editor
            </TabsTrigger> */}
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel */}
            <div className="lg:col-span-2 ">
              <TabsContent value="scoreboard">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <VictoryCelebrator
                      state={scoreboard.state}
                      onTriggerCelebration={scoreboard.triggerCelebration}
                      onExitCelebration={scoreboard.exitCelebration}
                    />
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
              isHardwareConnected={connected}
              onBrightnessChange={scoreboard.setBrightness}
              onReset={scoreboard.resetAll}
              onClear={scoreboard.clearDisplay}
              onReconnect = {reconnect}
              onGoToStartUp={() => navigate("/StartUpPage")}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
}
