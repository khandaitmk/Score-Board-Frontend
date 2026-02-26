import { useState, useEffect, useCallback } from "react";
import {
  createFootballState,
  createBadmintonState,
  createTableTennisState,
  createBasketballState,
  createVolleyballState,
  createCricketState,
  createKabaddiState,
  createKhoKhoState,
  createTimerState,
  SPORTS_WITH_TIMER,
} from "@/lib/scoreboard";

const initialState = {
  sport: "football",
  displayName: "FOOTBALL",
  prefix: "RBU",

  football:    createFootballState(),
  badminton:   createBadmintonState(),
  tableTennis: createTableTennisState(),
  basketball:  createBasketballState(),
  volleyball:  createVolleyballState(),
  cricket:     createCricketState(),
  kabaddi:     createKabaddiState(),
  khoKho:      createKhoKhoState(),

  timer: createTimerState(),

  rows: [
    { id: 1, content: "RBU FOOTBALL" },
    { id: 2, content: "TEAM 1    TEAM 2" },
    { id: 3, content: "Score: 0 - 0" },
    { id: 4, content: "Timer: 00:00" },
    { id: 5, content: "Quarter: 1 / 4" },
    { id: 6, content: "TEAM 1 vs TEAM 2" },
  ],

  brightness: 100,
  isHardwareConnected: true,
};

export function useScoreboard() {
const [state, setState] = useState(() => {
  try {
    const saved = localStorage.getItem("scoreboard-state");
      
    return saved ? JSON.parse(saved) : initialState;
  } catch {
    return initialState;
  }
  
});

useEffect(() => {
  localStorage.setItem("scoreboard-state", JSON.stringify(state));
console.log("Active sport state:", {
    sport:       state.sport,
    displayName: state.displayName,
    prefix:      state.prefix,
    timer:       state.timer,
    brightness:  state.brightness,
    // [activeSportKey]: state[activeSportKey],  // only active sport
    rows:        state.rows,
  });
}, [state]);
  // ================= TIMER =================

  useEffect(() => {
    if (!SPORTS_WITH_TIMER.includes(state.sport)) return;
    let interval;
    if (state.timer.isRunning) {
      interval = setInterval(() => {
        setState((prev) => {
          const total = prev.timer.minutes * 60 + prev.timer.seconds + 1;
          return {
            ...prev,
            timer: {
              ...prev.timer,
              minutes: Math.floor(total / 60),
              seconds: total % 60,
            },
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.timer.isRunning, state.sport]);

  // ================= LED ROW UPDATE =================

  useEffect(() => {
    const fmt = (m, s) =>
      `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    const { sport, prefix, displayName, timer } = state;

    let rows = [];

    if (sport === "football") {
      const { team1Name, team2Name, score1, score2, quarter } = state.football;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${score1} - ${score2}` },
        { id: 4, content: `Timer: ${fmt(timer.minutes, timer.seconds)}` },
        { id: 5, content: `Quarter: ${quarter} / 4` },
        { id: 6, content: `${team1Name} vs ${team2Name}` },
      ];
    }

    else if (sport === "badminton") {
      const { player1Name, player2Name, games } = state.badminton;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${player1Name}  vs  ${player2Name}` },
        { id: 3, content: `G1: ${games.game1.p1}-${games.game1.p2}` },
        { id: 4, content: `G2: ${games.game2.p1}-${games.game2.p2}` },
        { id: 5, content: `G3: ${games.game3.p1}-${games.game3.p2}` },
        { id: 6, content: `${player1Name} vs ${player2Name}` },
      ];
    }

    else if (sport === "table-tennis") {
      const { player1Name, player2Name, games } = state.tableTennis;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${player1Name}  vs  ${player2Name}` },
        { id: 3, content: `G1: ${games.game1.p1}-${games.game1.p2}  G2: ${games.game2.p1}-${games.game2.p2}` },
        { id: 4, content: `G3: ${games.game3.p1}-${games.game3.p2}  G4: ${games.game4.p1}-${games.game4.p2}` },
        { id: 5, content: `G5: ${games.game5.p1}-${games.game5.p2}` },
        { id: 6, content: `${player1Name} vs ${player2Name}` },
      ];
    }

    else if (sport === "basketball") {
      const { team1Name, team2Name, score1, score2, quarter } = state.basketball;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${score1} - ${score2}` },
        { id: 4, content: `Timer: ${fmt(timer.minutes, timer.seconds)}` },
        { id: 5, content: `Quarter: ${quarter} / 4` },
        { id: 6, content: `${team1Name} vs ${team2Name}` },
      ];
    }

    else if (sport === "volleyball") {
      const { team1Name, team2Name, sets } = state.volleyball;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `S1: ${sets.set1.t1}-${sets.set1.t2}  S2: ${sets.set2.t1}-${sets.set2.t2}` },
        { id: 4, content: `S3: ${sets.set3.t1}-${sets.set3.t2}  S4: ${sets.set4.t1}-${sets.set4.t2}` },
        { id: 5, content: `S5: ${sets.set5.t1}-${sets.set5.t2}` },
        { id: 6, content: `${team1Name} vs ${team2Name}` },
      ];
    }

    else if (sport === "cricket") {
      const { team1Name, team2Name, runs, wickets, overs, balls, target, innings } = state.cricket;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${runs}/${wickets}` },
        { id: 4, content: `Overs: ${overs}.${balls}` },
        { id: 5, content: innings === 2 ? `Target: ${target}` : `Innings: 1` },
        { id: 6, content: `${team1Name} vs ${team2Name}` },
      ];
    }

    else if (sport === "kabaddi") {
      const { team1Name, team2Name, score1, score2, half } = state.kabaddi;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${score1} - ${score2}` },
        { id: 4, content: `Timer: ${fmt(timer.minutes, timer.seconds)}` },
        { id: 5, content: `Half: ${half} / 2` },
        { id: 6, content: `${team1Name} vs ${team2Name}` },
      ];
    }

    else if (sport === "kho-kho") {
      const { team1Name, team2Name, score1, score2, turn, innings } = state.khoKho;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${score1} - ${score2}` },
        { id: 4, content: `Timer: ${fmt(timer.minutes, timer.seconds)}` },
        { id: 5, content: `Innings: ${innings}  Turn: ${turn}` },
        { id: 6, content: `${team1Name} vs ${team2Name}` },
      ];
    }

    if (rows.length > 0) {
      setState((prev) => ({ ...prev, rows }));
    }
  }, [
    state.sport, state.prefix, state.displayName,
    state.football, state.badminton, state.tableTennis,
    state.basketball, state.volleyball, state.cricket,
    state.kabaddi, state.khoKho,
    state.timer.minutes, state.timer.seconds,
  ]);

  // ================= SETTERS =================

  const setSport = useCallback((sport) => {
    const sportNames = {
      football: "FOOTBALL", badminton: "BADMINTON",
      basketball: "BASKETBALL", volleyball: "VOLLEYBALL",
      cricket: "CRICKET", "table-tennis": "TABLE TENNIS",
      kabaddi: "KABADDI", "kho-kho": "KHO-KHO",
    };
    setState((prev) => ({
      ...prev,
      sport,
      displayName: sportNames[sport] || prev.displayName,
      timer: createTimerState(), // reset timer on sport change
    }));
  }, []);

  const setPrefix      = useCallback((prefix)      => setState((p) => ({ ...p, prefix })), []);
  const setDisplayName = useCallback((displayName) => setState((p) => ({ ...p, displayName })), []);

  // Football
  const setTeam1Name = useCallback((name)  => setState((p) => ({ ...p, football: { ...p.football, team1Name: name } })), []);
  const setTeam2Name = useCallback((name)  => setState((p) => ({ ...p, football: { ...p.football, team2Name: name } })), []);
  const setScore1    = useCallback((score) => setState((p) => ({ ...p, football: { ...p.football, score1: Math.max(0, score) } })), []);
  const setScore2    = useCallback((score) => setState((p) => ({ ...p, football: { ...p.football, score2: Math.max(0, score) } })), []);
  const setQuarter   = useCallback((q)     => setState((p) => ({ ...p, football: { ...p.football, quarter: q } })), []);
  const swapTeams    = useCallback(()      => setState((p) => ({
    ...p,
    football: {
      ...p.football,
      team1Name: p.football.team2Name, team2Name: p.football.team1Name,
      score1: p.football.score2,       score2: p.football.score1,
    },
  })), []);

  // Badminton
  const setPlayer1Name = useCallback((name) => setState((p) => ({ ...p, badminton: { ...p.badminton, player1Name: name } })), []);
  const setPlayer2Name = useCallback((name) => setState((p) => ({ ...p, badminton: { ...p.badminton, player2Name: name } })), []);
  const setGameScore   = useCallback((game, player, score) => setState((p) => ({
    ...p,
    badminton: {
      ...p.badminton,
      games: { ...p.badminton.games, [game]: { ...p.badminton.games[game], [player]: Math.max(0, score) } },
    },
  })), []);

  // Table Tennis
  const setTTPlayer1Name = useCallback((name) => setState((p) => ({ ...p, tableTennis: { ...p.tableTennis, player1Name: name } })), []);
  const setTTPlayer2Name = useCallback((name) => setState((p) => ({ ...p, tableTennis: { ...p.tableTennis, player2Name: name } })), []);
  const setTTGameScore   = useCallback((game, player, score) => setState((p) => ({
    ...p,
    tableTennis: {
      ...p.tableTennis,
      games: { ...p.tableTennis.games, [game]: { ...p.tableTennis.games[game], [player]: Math.max(0, score) } },
    },
  })), []);

  // Basketball
  const setBasketballTeam1Name = useCallback((name)  => setState((p) => ({ ...p, basketball: { ...p.basketball, team1Name: name } })), []);
  const setBasketballTeam2Name = useCallback((name)  => setState((p) => ({ ...p, basketball: { ...p.basketball, team2Name: name } })), []);
  const setBasketballScore1    = useCallback((score) => setState((p) => ({ ...p, basketball: { ...p.basketball, score1: Math.max(0, score) } })), []);
  const setBasketballScore2    = useCallback((score) => setState((p) => ({ ...p, basketball: { ...p.basketball, score2: Math.max(0, score) } })), []);
  const setBasketballQuarter   = useCallback((q)     => setState((p) => ({ ...p, basketball: { ...p.basketball, quarter: q } })), []);

  // Volleyball
  const setVolleyballTeam1Name = useCallback((name) => setState((p) => ({ ...p, volleyball: { ...p.volleyball, team1Name: name } })), []);
  const setVolleyballTeam2Name = useCallback((name) => setState((p) => ({ ...p, volleyball: { ...p.volleyball, team2Name: name } })), []);
  const setSetScore            = useCallback((set, team, score) => setState((p) => ({
    ...p,
    volleyball: {
      ...p.volleyball,
      sets: { ...p.volleyball.sets, [set]: { ...p.volleyball.sets[set], [team]: Math.max(0, score) } },
    },
  })), []);

  // Cricket
  const setCricketTotalOvers = useCallback((o) => setState((p) => ({ ...p, cricket: { ...p.cricket, totalOvers: Math.max(1, o) } })), []);
  const setCricketTeam1Name = useCallback((name)    => setState((p) => ({ ...p, cricket: { ...p.cricket, team1Name: name } })), []);
  const setCricketTeam2Name = useCallback((name)    => setState((p) => ({ ...p, cricket: { ...p.cricket, team2Name: name } })), []);
  const setCricketRuns      = useCallback((runs)    => setState((p) => ({ ...p, cricket: { ...p.cricket, runs: Math.max(0, runs) } })), []);
  const setCricketWickets   = useCallback((w)       => setState((p) => ({ ...p, cricket: { ...p.cricket, wickets: Math.min(10, Math.max(0, w)) } })), []);
  const setCricketOvers     = useCallback((overs)   => setState((p) => ({ ...p, cricket: { ...p.cricket, overs: Math.max(0, overs) } })), []);
  const setCricketBalls     = useCallback((balls)   => setState((p) => ({ ...p, cricket: { ...p.cricket, balls: Math.min(5, Math.max(0, balls)) } })), []);
  const setCricketTarget    = useCallback((target)  => setState((p) => ({ ...p, cricket: { ...p.cricket, target: Math.max(0, target) } })), []);
  const setCricketInnings   = useCallback((innings) => setState((p) => ({ ...p, cricket: { ...p.cricket, innings } })), []);

  // Kabaddi
  const setKabaddiTeam1Name = useCallback((name)  => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, team1Name: name } })), []);
  const setKabaddiTeam2Name = useCallback((name)  => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, team2Name: name } })), []);
  const setKabaddiScore1    = useCallback((score) => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, score1: Math.max(0, score) } })), []);
  const setKabaddiScore2    = useCallback((score) => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, score2: Math.max(0, score) } })), []);
  const setKabaddiHalf      = useCallback((half)  => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, half } })), []);

  // Kho-Kho
  const setKhoKhoTeam1Name = useCallback((name)  => setState((p) => ({ ...p, khoKho: { ...p.khoKho, team1Name: name } })), []);
  const setKhoKhoTeam2Name = useCallback((name)  => setState((p) => ({ ...p, khoKho: { ...p.khoKho, team2Name: name } })), []);
  const setKhoKhoScore1    = useCallback((score) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, score1: Math.max(0, score) } })), []);
  const setKhoKhoScore2    = useCallback((score) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, score2: Math.max(0, score) } })), []);
  const setKhoKhoTurn      = useCallback((turn)  => setState((p) => ({ ...p, khoKho: { ...p.khoKho, turn } })), []);
  const setKhoKhoInnings   = useCallback((inn)   => setState((p) => ({ ...p, khoKho: { ...p.khoKho, innings: inn } })), []);

  // Timer
  const setTimerMinutes = useCallback((m) => setState((p) => ({ ...p, timer: { ...p.timer, minutes: Math.max(0, m) } })), []);
  const setTimerSeconds = useCallback((s) => setState((p) => ({ ...p, timer: { ...p.timer, seconds: Math.min(59, Math.max(0, s)) } })), []);
  const startTimer      = useCallback(()  => setState((p) => ({ ...p, timer: { ...p.timer, isRunning: true } })), []);
  const pauseTimer      = useCallback(()  => setState((p) => ({ ...p, timer: { ...p.timer, isRunning: false } })), []);
  const resetTimer      = useCallback(()  => setState((p) => ({ ...p, timer: createTimerState() })), []);

  // Manual row
  const setRowContent = useCallback((id, content) => setState((p) => ({
    ...p,
    rows: p.rows.map((row) => (row.id === id ? { ...row, content } : row)),
  })), []);

  // Display
  const setBrightness = useCallback((brightness) => setState((p) => ({ ...p, brightness })), []);

  // Quick actions
  const resetAll      = useCallback(() => setState(initialState), []);
  const clearDisplay  = useCallback(() => setState((p) => ({ ...p, rows: p.rows.map((r) => ({ ...r, content: "" })) })), []);

  return {
    state,
    setSport, setPrefix, setDisplayName,

    // Football
    setTeam1Name, setTeam2Name, setScore1, setScore2, setQuarter, swapTeams,

    // Badminton
    setPlayer1Name, setPlayer2Name, setGameScore,

    // Table Tennis
    setTTPlayer1Name, setTTPlayer2Name, setTTGameScore,

    // Basketball
    setBasketballTeam1Name, setBasketballTeam2Name,
    setBasketballScore1, setBasketballScore2, setBasketballQuarter,

    // Volleyball
    setVolleyballTeam1Name, setVolleyballTeam2Name, setSetScore,

    // Cricket
    setCricketTeam1Name, setCricketTeam2Name, setCricketRuns,
    setCricketWickets, setCricketOvers, setCricketBalls,
    setCricketTarget, setCricketInnings,setCricketTotalOvers,

    // Kabaddi
    setKabaddiTeam1Name, setKabaddiTeam2Name,
    setKabaddiScore1, setKabaddiScore2, setKabaddiHalf,

    // Kho-Kho
    setKhoKhoTeam1Name, setKhoKhoTeam2Name,
    setKhoKhoScore1, setKhoKhoScore2, setKhoKhoTurn, setKhoKhoInnings,

    // Timer
    setTimerMinutes, setTimerSeconds, startTimer, pauseTimer, resetTimer,

    // Manual
    setRowContent,

    // Display
    setBrightness,

    // Quick actions
    resetAll, clearDisplay,
  };
}