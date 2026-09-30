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
  createCustomState,
  createTimerState,
  SPORTS_WITH_TIMER,
} from "@/lib/scoreboard";

const initialState = {
  sport: "football",
  displayName: "FOOTBALL",
  prefix: "RBU",

  isCelebrationMode: false,
  celebrationData: { winnerName: "", details: "" },

  football:    createFootballState(),
  badminton:   createBadmintonState(),
  tableTennis: createTableTennisState(),
  basketball:  createBasketballState(),
  volleyball:  createVolleyballState(),
  cricket:     createCricketState(),
  kabaddi:     createKabaddiState(),
  khoKho:      createKhoKhoState(),
  custom:      createCustomState(),

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
  // sendToESP32({
  //   sport:       state.sport,
  //   displayName: state.displayName,
  //   prefix:      state.prefix,
  //   timer:       state.timer,
  //   brightness:  state.brightness,
  //   // [activeSportKey]: state[activeSportKey],  // only active sport
  //   rows:        state.rows,
  // });
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

    const { sport, prefix, displayName, timer, isCelebrationMode, celebrationData } = state;

    let rows = [];

    if (isCelebrationMode) {
      const winner = celebrationData?.winnerName || "CHAMPIONS";
      const details = celebrationData?.details || "";
      rows = [
        { id: 1, content: "🎉 CONGRATULATIONS! 🎉" },
        { id: 2, content: `${winner.toUpperCase()}` },
        { id: 3, content: "🏆 MATCH WINNER! 🏆" },
        { id: 4, content: details ? details : "RBU SPORTS CHAMPION" },
        { id: 5, content: `${prefix} ${displayName}` },
        { id: 6, content: "⭐ 🏆 ⭐ 🏆 ⭐ 🏆 ⭐" },
      ];
    }

    else if (sport === "football") {
      const { team1Name, team2Name, score1, score2, quarter } = state.football;
      const lead = score1 > score2 ? `${team1Name} LEADS BY ${score1 - score2}` : score2 > score1 ? `${team2Name} LEADS BY ${score2 - score1}` : "MATCH TIED";
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${score1} - ${score2}` },
        { id: 4, content: `Timer: ${fmt(timer.minutes, timer.seconds)}` },
        { id: 5, content: `Quarter: ${quarter} / 4` },
        { id: 6, content: score1 === 0 && score2 === 0 ? "LIVE FOOTBALL MATCH" : lead },
      ];
    }

    else if (sport === "badminton") {
      const { player1Name, player2Name, games, currentGame, currentP1, currentP2 } = state.badminton;
      let p1W = 0, p2W = 0;
      ["game1", "game2", "game3"].forEach(g => {
        if (games[g]?.p1 > games[g]?.p2) p1W++;
        else if (games[g]?.p2 > games[g]?.p1) p2W++;
      });
      const actGame = currentGame ?? 1;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${player1Name}  vs  ${player2Name}` },
        { id: 3, content: `G1: ${games.game1.p1}-${games.game1.p2}  G2: ${games.game2.p1}-${games.game2.p2}` },
        { id: 4, content: `G3: ${games.game3.p1}-${games.game3.p2}` },
        { id: 5, content: `Game ${actGame}: ${currentP1 ?? 0} - ${currentP2 ?? 0}` },
        { id: 6, content: `Games: ${p1W}-${p2W} | G${actGame}: ${currentP1 ?? 0}-${currentP2 ?? 0}` },
      ];
    }

    else if (sport === "table-tennis") {
      const { player1Name, player2Name, games, currentGame, currentP1, currentP2 } = state.tableTennis;
      let p1W = 0, p2W = 0;
      ["game1", "game2", "game3", "game4", "game5"].forEach(g => {
        if (games[g]?.p1 > games[g]?.p2) p1W++;
        else if (games[g]?.p2 > games[g]?.p1) p2W++;
      });
      const actGame = currentGame ?? 1;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${player1Name}  vs  ${player2Name}` },
        { id: 3, content: `G1: ${games.game1.p1}-${games.game1.p2}  G2: ${games.game2.p1}-${games.game2.p2}` },
        { id: 4, content: `G3: ${games.game3.p1}-${games.game3.p2}  G4: ${games.game4.p1}-${games.game4.p2}` },
        { id: 5, content: `G5: ${games.game5.p1}-${games.game5.p2}` },
        { id: 6, content: `Games: ${p1W}-${p2W} | G${actGame}: ${currentP1 ?? 0}-${currentP2 ?? 0}` },
      ];
    }

    else if (sport === "custom") {
      const { row1, row2, row3, row4, row5, row6 } = state.custom || {};
      rows = [
        { id: 1, content: row1 || "" },
        { id: 2, content: row2 || "" },
        { id: 3, content: row3 || "" },
        { id: 4, content: row4 || "" },
        { id: 5, content: row5 || "" },
        { id: 6, content: row6 || "" },
      ];
    }

    else if (sport === "basketball") {
      const { team1Name, team2Name, score1, score2, quarter, fouls1, fouls2 } = state.basketball;
      const lead = score1 > score2 ? `${team1Name} LEADS BY ${score1 - score2}` : score2 > score1 ? `${team2Name} LEADS BY ${score2 - score1}` : "TIED GAME";
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${score1} - ${score2}` },
        { id: 4, content: `Timer: ${fmt(timer.minutes, timer.seconds)}` },
        { id: 5, content: `Quarter: ${quarter} / 4` },
        { id: 6, content: `Fouls: ${fouls1 ?? 0}-${fouls2 ?? 0} | ${lead}` },
      ];
    }

    else if (sport === "volleyball") {
      const { team1Name, team2Name, sets, currentScore1, currentScore2, currentSet } = state.volleyball;
      let t1W = 0, t2W = 0;
      ["set1", "set2", "set3", "set4", "set5"].forEach(s => {
        if (sets[s]?.t1 > sets[s]?.t2) t1W++;
        else if (sets[s]?.t2 > sets[s]?.t1) t2W++;
      });
      const activeSetNum = currentSet ?? 1;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `S1: ${sets.set1.t1}-${sets.set1.t2}  S2: ${sets.set2.t1}-${sets.set2.t2}` },
        { id: 4, content: `S3: ${sets.set3.t1}-${sets.set3.t2}  S4: ${sets.set4.t1}-${sets.set4.t2}` },
        { id: 5, content: `S5: ${sets.set5.t1}-${sets.set5.t2}` },
        { id: 6, content: `Sets: ${t1W}-${t2W} | Set ${activeSetNum}: ${currentScore1 ?? 0}-${currentScore2 ?? 0}` },
      ];
    }

    else if (sport === "cricket") {
      const { team1Name, team2Name, runs, wickets, overs, balls, target, innings, totalOvers } = state.cricket;
      const totalBallsPlayed = overs * 6 + balls;
      const totalBallsAllowed = (totalOvers ?? 20) * 6;
      let status = "";
      if (innings === 2 && target > 0) {
        const req = target - runs;
        const rem = totalBallsAllowed - totalBallsPlayed;
        status = req <= 0 ? `${team1Name} WON MATCH!` : rem <= 0 ? `${team2Name} WON MATCH!` : `NEED ${req} RUNS IN ${rem} BALLS`;
      } else {
        const rr = totalBallsPlayed > 0 ? (runs / (totalBallsPlayed / 6)).toFixed(1) : "0.0";
        status = `RUN RATE: ${rr} RPO`;
      }
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${runs}/${wickets}` },
        { id: 4, content: `Overs: ${overs}.${balls}` },
        { id: 5, content: innings === 2 ? `Target: ${target}` : `Innings: 1` },
        { id: 6, content: status },
      ];
    }

    else if (sport === "kabaddi") {
      const { team1Name, team2Name, score1, score2, half, raids1, raids2, allOuts1, allOuts2 } = state.kabaddi;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${score1} - ${score2}` },
        { id: 4, content: `Timer: ${fmt(timer.minutes, timer.seconds)}` },
        { id: 5, content: `Half: ${half} / 2` },
        { id: 6, content: `Raids: ${raids1 ?? 0}-${raids2 ?? 0} | AllOuts: ${allOuts1 ?? 0}-${allOuts2 ?? 0}` },
      ];
    }

    else if (sport === "kho-kho") {
      const { team1Name, team2Name, score1, score2, defendersLeft, half, innings } = state.khoKho;
      const currentInnings = half ?? innings ?? 1;
      rows = [
        { id: 1, content: `${prefix} ${displayName}` },
        { id: 2, content: `${team1Name}  vs  ${team2Name}` },
        { id: 3, content: `Score: ${score1} - ${score2}` },
        { id: 4, content: `Timer: ${fmt(timer.minutes, timer.seconds)}` },
        { id: 5, content: `Innings: ${currentInnings} / 2` },
        { id: 6, content: `Defenders Left: ${defendersLeft ?? 9}` },
      ];
    }

    if (rows.length > 0) {
      setState((prev) => ({ ...prev, rows }));
    }
  }, [
    state.isCelebrationMode, state.celebrationData,
    state.sport, state.prefix, state.displayName,
    state.football, state.badminton, state.tableTennis,
    state.basketball, state.volleyball, state.cricket,
    state.kabaddi, state.khoKho, state.custom,
    state.timer.minutes, state.timer.seconds,
  ]);

  // ================= SETTERS =================

  const triggerCelebration = useCallback((winnerName, details = "") => {
    setState((p) => ({
      ...p,
      isCelebrationMode: true,
      celebrationData: { winnerName, details },
    }));
  }, []);

  const exitCelebration = useCallback(() => {
    setState((p) => ({
      ...p,
      isCelebrationMode: false,
      celebrationData: { winnerName: "", details: "" },
    }));
  }, []);

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
  const nextFootballQuarter = useCallback(() => setState((p) => {
    const curQ = p.football.quarter ?? 1;
    const nextQ = Math.min(4, curQ + 1);
    const isHalfTime = curQ === 2;
    return {
      ...p,
      football: {
        ...p.football,
        quarter: nextQ,
        team1Name: isHalfTime ? p.football.team2Name : p.football.team1Name,
        team2Name: isHalfTime ? p.football.team1Name : p.football.team2Name,
        score1: isHalfTime ? p.football.score2 : p.football.score1,
        score2: isHalfTime ? p.football.score1 : p.football.score2,
      },
    };
  }), []);

  // Badminton
  const setPlayer1Name = useCallback((name) => setState((p) => ({ ...p, badminton: { ...p.badminton, player1Name: name } })), []);
  const setPlayer2Name = useCallback((name) => setState((p) => ({ ...p, badminton: { ...p.badminton, player2Name: name } })), []);
  const setBadmintonCurrentGame = useCallback((g) => setState((p) => ({ ...p, badminton: { ...p.badminton, currentGame: Math.min(3, Math.max(1, g)) } })), []);
  const setBadmintonCurrentP1   = useCallback((s) => setState((p) => ({ ...p, badminton: { ...p.badminton, currentP1: Math.max(0, s) } })), []);
  const setBadmintonCurrentP2   = useCallback((s) => setState((p) => ({ ...p, badminton: { ...p.badminton, currentP2: Math.max(0, s) } })), []);
  const setGameScore   = useCallback((game, player, score) => setState((p) => ({
    ...p,
    badminton: {
      ...p.badminton,
      games: { ...p.badminton.games, [game]: { ...p.badminton.games[game], [player]: Math.max(0, score) } },
    },
  })), []);
  const completeBadmintonGame = useCallback(() => setState((p) => {
    const curG = p.badminton.currentGame ?? 1;
    const gameKey = `game${curG}`;
    const nextG = Math.min(3, curG + 1);
    return {
      ...p,
      badminton: {
        ...p.badminton,
        currentGame: nextG,
        currentP1: 0,
        currentP2: 0,
        games: {
          ...p.badminton.games,
          [gameKey]: { p1: p.badminton.currentP1 ?? 0, p2: p.badminton.currentP2 ?? 0 },
        },
      },
    };
  }), []);
  const swapBadmintonPlayers = useCallback(() => setState((p) => {
    const newGames = {};
    Object.keys(p.badminton.games).forEach((g) => {
      newGames[g] = { p1: p.badminton.games[g].p2, p2: p.badminton.games[g].p1 };
    });
    return {
      ...p,
      badminton: {
        ...p.badminton,
        player1Name: p.badminton.player2Name, player2Name: p.badminton.player1Name,
        currentP1: p.badminton.currentP2 ?? 0, currentP2: p.badminton.currentP1 ?? 0,
        games: newGames,
      },
    };
  }), []);

  // Table Tennis
  const setTTPlayer1Name = useCallback((name) => setState((p) => ({ ...p, tableTennis: { ...p.tableTennis, player1Name: name } })), []);
  const setTTPlayer2Name = useCallback((name) => setState((p) => ({ ...p, tableTennis: { ...p.tableTennis, player2Name: name } })), []);
  const setTTCurrentGame = useCallback((g) => setState((p) => ({ ...p, tableTennis: { ...p.tableTennis, currentGame: Math.min(5, Math.max(1, g)) } })), []);
  const setTTCurrentP1   = useCallback((s) => setState((p) => ({ ...p, tableTennis: { ...p.tableTennis, currentP1: Math.max(0, s) } })), []);
  const setTTCurrentP2   = useCallback((s) => setState((p) => ({ ...p, tableTennis: { ...p.tableTennis, currentP2: Math.max(0, s) } })), []);
  const setTTGameScore   = useCallback((game, player, score) => setState((p) => ({
    ...p,
    tableTennis: {
      ...p.tableTennis,
      games: { ...p.tableTennis.games, [game]: { ...p.tableTennis.games[game], [player]: Math.max(0, score) } },
    },
  })), []);
  const completeTTGame = useCallback(() => setState((p) => {
    const curG = p.tableTennis.currentGame ?? 1;
    const gameKey = `game${curG}`;
    const nextG = Math.min(5, curG + 1);
    return {
      ...p,
      tableTennis: {
        ...p.tableTennis,
        currentGame: nextG,
        currentP1: 0,
        currentP2: 0,
        games: {
          ...p.tableTennis.games,
          [gameKey]: { p1: p.tableTennis.currentP1 ?? 0, p2: p.tableTennis.currentP2 ?? 0 },
        },
      },
    };
  }), []);
  const swapTTPlayers = useCallback(() => setState((p) => {
    const newGames = {};
    Object.keys(p.tableTennis.games).forEach((g) => {
      newGames[g] = { p1: p.tableTennis.games[g].p2, p2: p.tableTennis.games[g].p1 };
    });
    return {
      ...p,
      tableTennis: {
        ...p.tableTennis,
        player1Name: p.tableTennis.player2Name, player2Name: p.tableTennis.player1Name,
        currentP1: p.tableTennis.currentP2 ?? 0, currentP2: p.tableTennis.currentP1 ?? 0,
        games: newGames,
      },
    };
  }), []);

  // Basketball
  const setBasketballTeam1Name = useCallback((name)  => setState((p) => ({ ...p, basketball: { ...p.basketball, team1Name: name } })), []);
  const setBasketballTeam2Name = useCallback((name)  => setState((p) => ({ ...p, basketball: { ...p.basketball, team2Name: name } })), []);
  const setBasketballScore1    = useCallback((score) => setState((p) => ({ ...p, basketball: { ...p.basketball, score1: Math.max(0, score) } })), []);
  const setBasketballScore2    = useCallback((score) => setState((p) => ({ ...p, basketball: { ...p.basketball, score2: Math.max(0, score) } })), []);
  const setBasketballFouls1    = useCallback((fouls) => setState((p) => ({ ...p, basketball: { ...p.basketball, fouls1: Math.max(0, fouls) } })), []);
  const setBasketballFouls2    = useCallback((fouls) => setState((p) => ({ ...p, basketball: { ...p.basketball, fouls2: Math.max(0, fouls) } })), []);
  const setBasketballQuarter   = useCallback((q)     => setState((p) => ({ ...p, basketball: { ...p.basketball, quarter: Math.min(4, Math.max(1, q)) } })), []);
  const advanceBasketballQuarter = useCallback(() => setState((p) => {
    const curQ = p.basketball.quarter ?? 1;
    const nextQ = Math.min(4, curQ + 1);
    const isHalfTime = curQ === 2;
    return {
      ...p,
      basketball: {
        ...p.basketball,
        quarter: nextQ,
        fouls1: 0,
        fouls2: 0,
        team1Name: isHalfTime ? p.basketball.team2Name : p.basketball.team1Name,
        team2Name: isHalfTime ? p.basketball.team1Name : p.basketball.team2Name,
        score1: isHalfTime ? p.basketball.score2 : p.basketball.score1,
        score2: isHalfTime ? p.basketball.score1 : p.basketball.score2,
      },
    };
  }), []);
  const swapBasketballTeams    = useCallback(()      => setState((p) => ({
    ...p,
    basketball: {
      ...p.basketball,
      team1Name: p.basketball.team2Name, team2Name: p.basketball.team1Name,
      score1: p.basketball.score2,       score2: p.basketball.score1,
      fouls1: p.basketball.fouls2,       fouls2: p.basketball.fouls1,
    },
  })), []);

  // Volleyball
  const setVolleyballTeam1Name = useCallback((name) => setState((p) => ({ ...p, volleyball: { ...p.volleyball, team1Name: name } })), []);
  const setVolleyballTeam2Name = useCallback((name) => setState((p) => ({ ...p, volleyball: { ...p.volleyball, team2Name: name } })), []);
  const setVolleyballCurrentSet = useCallback((s) => setState((p) => ({
    ...p,
    volleyball: { ...p.volleyball, currentSet: Math.min(5, Math.max(1, s)) },
  })), []);
  const setSetScore            = useCallback((set, team, score) => setState((p) => ({
    ...p,
    volleyball: {
      ...p.volleyball,
      sets: { ...p.volleyball.sets, [set]: { ...p.volleyball.sets[set], [team]: Math.max(0, score) } },
    },
  })), []);
  const setCurrentScore1 = useCallback((score) => setState((p) => ({ ...p, volleyball: { ...p.volleyball, currentScore1: Math.max(0, score) } })), []);
  const setCurrentScore2 = useCallback((score) => setState((p) => ({ ...p, volleyball: { ...p.volleyball, currentScore2: Math.max(0, score) } })), []);
  const completeVolleyballSet = useCallback(() => setState((p) => {
    const curSetNum = p.volleyball.currentSet ?? 1;
    const setKey = `set${curSetNum}`;
    const nextSetNum = Math.min(5, curSetNum + 1);

    return {
      ...p,
      volleyball: {
        ...p.volleyball,
        currentSet: nextSetNum,
        currentScore1: 0,
        currentScore2: 0,
        sets: {
          ...p.volleyball.sets,
          [setKey]: {
            t1: p.volleyball.currentScore1 ?? 0,
            t2: p.volleyball.currentScore2 ?? 0,
          },
        },
      },
    };
  }), []);
  const swapVolleyballTeams = useCallback(() => setState((p) => {
    const newSets = {};
    Object.keys(p.volleyball.sets).forEach((s) => {
      newSets[s] = { t1: p.volleyball.sets[s].t2, t2: p.volleyball.sets[s].t1 };
    });
    return {
      ...p,
      volleyball: {
        ...p.volleyball,
        team1Name: p.volleyball.team2Name,
        team2Name: p.volleyball.team1Name,
        currentScore1: p.volleyball.currentScore2 ?? 0,
        currentScore2: p.volleyball.currentScore1 ?? 0,
        sets: newSets,
      },
    };
  }), []);

  // Cricket
  const setCricketTotalOvers = useCallback((o) => setState((p) => {
    const total = Math.max(1, o);
    const newOvers = Math.min(p.cricket.overs, total);
    const newBalls = newOvers === total ? 0 : p.cricket.balls;
    return {
      ...p,
      cricket: {
        ...p.cricket,
        totalOvers: total,
        overs: newOvers,
        balls: newBalls,
      },
    };
  }), []);
  const setCricketTeam1Name = useCallback((name)    => setState((p) => ({ ...p, cricket: { ...p.cricket, team1Name: name } })), []);
  const setCricketTeam2Name = useCallback((name)    => setState((p) => ({ ...p, cricket: { ...p.cricket, team2Name: name } })), []);
  const setCricketRuns      = useCallback((runs)    => setState((p) => ({ ...p, cricket: { ...p.cricket, runs: Math.max(0, runs) } })), []);
  const setCricketWickets   = useCallback((w)       => setState((p) => ({ ...p, cricket: { ...p.cricket, wickets: Math.min(10, Math.max(0, w)) } })), []);
  const setCricketOvers     = useCallback((overs)   => setState((p) => {
    const maxOvers = p.cricket.totalOvers ?? 20;
    const boundedOvers = Math.min(maxOvers, Math.max(0, overs));
    const boundedBalls = boundedOvers === maxOvers ? 0 : p.cricket.balls;
    return {
      ...p,
      cricket: {
        ...p.cricket,
        overs: boundedOvers,
        balls: boundedBalls,
      },
    };
  }), []);
  const setCricketBalls     = useCallback((balls)   => setState((p) => {
    const maxOvers = p.cricket.totalOvers ?? 20;
    if (p.cricket.overs >= maxOvers) {
      return {
        ...p,
        cricket: { ...p.cricket, balls: 0 },
      };
    }
    return {
      ...p,
      cricket: { ...p.cricket, balls: Math.min(5, Math.max(0, balls)) },
    };
  }), []);
  const setCricketTarget    = useCallback((target)  => setState((p) => ({ ...p, cricket: { ...p.cricket, target: Math.max(0, target) } })), []);
  const setCricketInnings   = useCallback((innings) => setState((p) => ({ ...p, cricket: { ...p.cricket, innings } })), []);
  const startCricketSecondInnings = useCallback(() => setState((p) => ({
    ...p,
    cricket: {
      ...p.cricket,
      innings: 2,
      target: (p.cricket.runs ?? 0) + 1,
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
    },
  })), []);

  // Kabaddi
  const setKabaddiTeam1Name = useCallback((name)  => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, team1Name: name } })), []);
  const setKabaddiTeam2Name = useCallback((name)  => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, team2Name: name } })), []);
  const setKabaddiScore1    = useCallback((score) => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, score1: Math.max(0, score) } })), []);
  const setKabaddiScore2    = useCallback((score) => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, score2: Math.max(0, score) } })), []);
  const setKabaddiRaids1    = useCallback((raids) => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, raids1: Math.max(0, raids) } })), []);
  const setKabaddiRaids2    = useCallback((raids) => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, raids2: Math.max(0, raids) } })), []);
  const setKabaddiAllOuts1  = useCallback((allOuts) => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, allOuts1: Math.max(0, allOuts) } })), []);
  const setKabaddiAllOuts2  = useCallback((allOuts) => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, allOuts2: Math.max(0, allOuts) } })), []);
  const setKabaddiHalf      = useCallback((half)  => setState((p) => ({ ...p, kabaddi: { ...p.kabaddi, half: Math.min(2, Math.max(1, half)) } })), []);
  const addKabaddiAllOut    = useCallback((teamNum) => setState((p) => {
    if (teamNum === 1) {
      return {
        ...p,
        kabaddi: {
          ...p.kabaddi,
          allOuts1: (p.kabaddi.allOuts1 ?? 0) + 1,
          score2: (p.kabaddi.score2 ?? 0) + 2,
        },
      };
    } else {
      return {
        ...p,
        kabaddi: {
          ...p.kabaddi,
          allOuts2: (p.kabaddi.allOuts2 ?? 0) + 1,
          score1: (p.kabaddi.score1 ?? 0) + 2,
        },
      };
    }
  }), []);
  const endKabaddiHalf = useCallback(() => setState((p) => ({
    ...p,
    kabaddi: {
      ...p.kabaddi,
      half: 2,
      team1Name: p.kabaddi.team2Name, team2Name: p.kabaddi.team1Name,
      score1: p.kabaddi.score2,       score2: p.kabaddi.score1,
      raids1: p.kabaddi.raids2,       raids2: p.kabaddi.raids1,
      allOuts1: p.kabaddi.allOuts2,   allOuts2: p.kabaddi.allOuts1,
    },
  })), []);
  const swapKabaddiTeams    = useCallback(()      => setState((p) => ({
    ...p,
    kabaddi: {
      ...p.kabaddi,
      team1Name: p.kabaddi.team2Name, team2Name: p.kabaddi.team1Name,
      score1: p.kabaddi.score2,       score2: p.kabaddi.score1,
      raids1: p.kabaddi.raids2,       raids2: p.kabaddi.raids1,
      allOuts1: p.kabaddi.allOuts2,   allOuts2: p.kabaddi.allOuts1,
    },
  })), []);

  // Kho-Kho
  const setKhoKhoTeam1Name     = useCallback((name) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, team1Name: name } })), []);
  const setKhoKhoTeam2Name     = useCallback((name) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, team2Name: name } })), []);
  const setKhoKhoScore1        = useCallback((score) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, score1: Math.max(0, score) } })), []);
  const setKhoKhoScore2        = useCallback((score) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, score2: Math.max(0, score) } })), []);
  const setKhoKhoDefendersLeft = useCallback((d) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, defendersLeft: Math.min(9, Math.max(0, d)) } })), []);
  const setKhoKhoHalf          = useCallback((half) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, half: Math.min(2, Math.max(1, half)), innings: Math.min(2, Math.max(1, half)) } })), []);
  const setKhoKhoTurn          = useCallback((turn) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, turn: Math.min(2, Math.max(1, turn)) } })), []);
  const setKhoKhoInnings       = useCallback((inn) => setState((p) => ({ ...p, khoKho: { ...p.khoKho, innings: Math.min(2, Math.max(1, inn)), half: Math.min(2, Math.max(1, inn)) } })), []);
  const khoKhoDefenderOut      = useCallback(() => setState((p) => {
    const curDef = p.khoKho.defendersLeft ?? 9;
    const nextDef = curDef <= 1 ? 9 : curDef - 1;
    const turn = p.khoKho.turn ?? 1;
    const newScore1 = turn === 1 ? (p.khoKho.score1 ?? 0) + 1 : (p.khoKho.score1 ?? 0);
    const newScore2 = turn === 2 ? (p.khoKho.score2 ?? 0) + 1 : (p.khoKho.score2 ?? 0);
    return {
      ...p,
      khoKho: {
        ...p.khoKho,
        defendersLeft: nextDef,
        score1: newScore1,
        score2: newScore2,
      },
    };
  }), []);
  const nextKhoKhoInnings = useCallback(() => setState((p) => ({
    ...p,
    khoKho: {
      ...p.khoKho,
      half: 2,
      innings: 2,
      turn: p.khoKho.turn === 1 ? 2 : 1,
      team1Name: p.khoKho.team2Name, team2Name: p.khoKho.team1Name,
      score1: p.khoKho.score2,       score2: p.khoKho.score1,
    },
  })), []);
  const swapKhoKhoTeams        = useCallback(() => setState((p) => ({
    ...p,
    khoKho: {
      ...p.khoKho,
      team1Name: p.khoKho.team2Name, team2Name: p.khoKho.team1Name,
      score1: p.khoKho.score2,       score2: p.khoKho.score1,
    },
  })), []);

  // Custom Display
  const setCustomRowContent = useCallback((rowNum, text) => setState((p) => ({
    ...p,
    custom: {
      ...p.custom,
      [`row${rowNum}`]: text,
    },
  })), []);

  const clearCustomRows = useCallback(() => setState((p) => ({
    ...p,
    custom: { row1: '', row2: '', row3: '', row4: '', row5: '', row6: '' },
  })), []);

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
    triggerCelebration,
    exitCelebration,
    setSport, setPrefix, setDisplayName,

    // Football
    setTeam1Name, setTeam2Name, setScore1, setScore2, setQuarter, swapTeams, nextFootballQuarter,

    // Badminton
    setPlayer1Name, setPlayer2Name, setGameScore,
    setBadmintonCurrentGame, setBadmintonCurrentP1, setBadmintonCurrentP2,
    completeBadmintonGame, swapBadmintonPlayers,

    // Table Tennis
    setTTPlayer1Name, setTTPlayer2Name, setTTGameScore,
    setTTCurrentGame, setTTCurrentP1, setTTCurrentP2,
    completeTTGame, swapTTPlayers,

    // Basketball
    setBasketballTeam1Name, setBasketballTeam2Name,
    setBasketballScore1, setBasketballScore2, setBasketballQuarter,
    setBasketballFouls1, setBasketballFouls2, advanceBasketballQuarter, swapBasketballTeams,

    // Volleyball
    setVolleyballTeam1Name, setVolleyballTeam2Name, setSetScore,
    setCurrentScore1, setCurrentScore2, setVolleyballCurrentSet,
    completeVolleyballSet, swapVolleyballTeams,

    // Cricket
    setCricketTeam1Name, setCricketTeam2Name, setCricketRuns,
    setCricketWickets, setCricketOvers, setCricketBalls,
    setCricketTarget, setCricketInnings, setCricketTotalOvers, startCricketSecondInnings,

    // Kabaddi
    setKabaddiTeam1Name, setKabaddiTeam2Name,
    setKabaddiScore1, setKabaddiScore2, setKabaddiRaids1, setKabaddiRaids2,
    setKabaddiAllOuts1, setKabaddiAllOuts2, setKabaddiHalf, addKabaddiAllOut, endKabaddiHalf, swapKabaddiTeams,

    // Kho-Kho
    setKhoKhoTeam1Name, setKhoKhoTeam2Name,
    setKhoKhoScore1, setKhoKhoScore2, setKhoKhoDefendersLeft,
    setKhoKhoHalf, setKhoKhoTurn, setKhoKhoInnings, khoKhoDefenderOut, nextKhoKhoInnings, swapKhoKhoTeams,

    // Custom Display
    setCustomRowContent, clearCustomRows,

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