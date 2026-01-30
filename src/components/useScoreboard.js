import { useState, useEffect, useCallback } from "react";

const initialState = {
  sport: "football",
  displayName: "FOOTBALL",
  prefix: "RBU",

  football: {
    team1Name: "TEAM 1",
    team2Name: "TEAM 2",
    score1: 0,
    score2: 0,
    quarter: 1,
  },

  badminton: {
    player1Name: "PLAYER 1",
    player2Name: "PLAYER 2",
    games: {
      game1: { p1: 0, p2: 0 },
      game2: { p1: 0, p2: 0 },
      game3: { p1: 0, p2: 0 },
    },
  },

  timer: {
    minutes: 0,
    seconds: 0,
    isRunning: false,
  },

  rows: [
    { id: 1, content: "RBU FOOTBALL" },
    { id: 2, content: "TEAM 1    TEAM 2" },
    { id: 3, content: "Score: 0 - 0" },
    { id: 4, content: "Timer: 00:00" },
    { id: 5, content: "Quarter: 1 / 4" },
    { id: 6, content: "TEAM 1 ↔ TEAM 2" },
  ],

  brightness: 100,
  isHardwareConnected: true,
};

export function useScoreboard() {
  const [state, setState] = useState(initialState);

  /* ================= TIMER ================= */

  useEffect(() => {
    let interval;

    if (state.timer.isRunning) {
      interval = setInterval(() => {
        setState((prev) => {
          const totalSeconds =
            prev.timer.minutes * 60 + prev.timer.seconds + 1;

          return {
            ...prev,
            timer: {
              ...prev.timer,
              minutes: Math.floor(totalSeconds / 60),
              seconds: totalSeconds % 60,
            },
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.timer.isRunning]);

  /* ================= LED ROW UPDATE ================= */

  useEffect(() => {
    const formatTime = (m, s) =>
      `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    if (state.sport === "football") {
      const { team1Name, team2Name, score1, score2, quarter } =
        state.football;

      setState((prev) => ({
        ...prev,
        rows: [
          { id: 1, content: `${prev.prefix} ${prev.displayName}` },
          { id: 2, content: `${team1Name}    ${team2Name}` },
          { id: 3, content: `Score: ${score1} - ${score2}` },
          {
            id: 4,
            content: `Timer: ${formatTime(
              prev.timer.minutes,
              prev.timer.seconds
            )}`,
          },
          { id: 5, content: `Quarter: ${quarter} / 4` },
          { id: 6, content: `${team1Name} ↔ ${team2Name}` },
        ],
      }));
    }

    if (state.sport === "badminton") {
      const { player1Name, player2Name, games } = state.badminton;

      setState((prev) => ({
        ...prev,
        rows: [
          { id: 1, content: `${prev.prefix} ${prev.displayName}` },
          { id: 2, content: `${player1Name}    ${player2Name}` },
          {
            id: 3,
            content: `G1: ${games.game1.p1}-${games.game1.p2}  G2: ${games.game2.p1}-${games.game2.p2}`,
          },
          {
            id: 4,
            content: `G3: ${games.game3.p1}-${games.game3.p2}`,
          },
          {
            id: 5,
            content: `Timer: ${formatTime(
              prev.timer.minutes,
              prev.timer.seconds
            )}`,
          },
          { id: 6, content: `${player1Name} vs ${player2Name}` },
        ],
      }));
    }
  }, [
    state.sport,
    state.prefix,
    state.displayName,
    state.football,
    state.badminton,
    state.timer.minutes,
    state.timer.seconds,
  ]);

  /* ================= BASIC SETTERS ================= */

  const setSport = useCallback((sport) => {
    const sportNames = {
      football: "FOOTBALL",
      badminton: "BADMINTON",
      basketball: "BASKETBALL",
      volleyball: "VOLLEYBALL",
      cricket: "CRICKET",
      "table-tennis": "TABLE TENNIS",
      kabaddi: "KABADDI",
      "kho-kho": "KHO-KHO",
    };

    setState((prev) => ({
      ...prev,
      sport,
      displayName: sportNames[sport] || prev.displayName,
    }));
  }, []);

  const setPrefix = useCallback((prefix) => {
    setState((prev) => ({ ...prev, prefix }));
  }, []);

  const setDisplayName = useCallback((displayName) => {
    setState((prev) => ({ ...prev, displayName }));
  }, []);

  /* ================= FOOTBALL ================= */

  const setTeam1Name = useCallback((name) => {
    setState((prev) => ({
      ...prev,
      football: { ...prev.football, team1Name: name },
    }));
  }, []);

  const setTeam2Name = useCallback((name) => {
    setState((prev) => ({
      ...prev,
      football: { ...prev.football, team2Name: name },
    }));
  }, []);

  const setScore1 = useCallback((score) => {
    setState((prev) => ({
      ...prev,
      football: {
        ...prev.football,
        score1: Math.max(0, score),
      },
    }));
  }, []);

  const setScore2 = useCallback((score) => {
    setState((prev) => ({
      ...prev,
      football: {
        ...prev.football,
        score2: Math.max(0, score),
      },
    }));
  }, []);

  const setQuarter = useCallback((quarter) => {
    setState((prev) => ({
      ...prev,
      football: { ...prev.football, quarter },
    }));
  }, []);

  const swapTeams = useCallback(() => {
    setState((prev) => ({
      ...prev,
      football: {
        ...prev.football,
        team1Name: prev.football.team2Name,
        team2Name: prev.football.team1Name,
        score1: prev.football.score2,
        score2: prev.football.score1,
      },
    }));
  }, []);

  /* ================= BADMINTON ================= */

  const setPlayer1Name = useCallback((name) => {
    setState((prev) => ({
      ...prev,
      badminton: { ...prev.badminton, player1Name: name },
    }));
  }, []);

  const setPlayer2Name = useCallback((name) => {
    setState((prev) => ({
      ...prev,
      badminton: { ...prev.badminton, player2Name: name },
    }));
  }, []);

  const setGameScore = useCallback((game, player, score) => {
    setState((prev) => ({
      ...prev,
      badminton: {
        ...prev.badminton,
        games: {
          ...prev.badminton.games,
          [game]: {
            ...prev.badminton.games[game],
            [player]: Math.max(0, score),
          },
        },
      },
    }));
  }, []);

  /* ================= TIMER CONTROLS ================= */

  const setTimerMinutes = useCallback((minutes) => {
    setState((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        minutes: Math.max(0, minutes),
      },
    }));
  }, []);

  const setTimerSeconds = useCallback((seconds) => {
    setState((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        seconds: Math.max(0, Math.min(59, seconds)),
      },
    }));
  }, []);

  const startTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timer: { ...prev.timer, isRunning: true },
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timer: { ...prev.timer, isRunning: false },
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timer: { minutes: 0, seconds: 0, isRunning: false },
    }));
  }, []);

  /* ================= MANUAL ROW ================= */

  const setRowContent = useCallback((id, content) => {
    setState((prev) => ({
      ...prev,
      rows: prev.rows.map((row) =>
        row.id === id ? { ...row, content } : row
      ),
    }));
  }, []);

  /* ================= DISPLAY ================= */

  const setBrightness = useCallback((brightness) => {
    setState((prev) => ({ ...prev, brightness }));
  }, []);

  /* ================= QUICK ACTIONS ================= */

  const resetAll = useCallback(() => {
    setState(initialState);
  }, []);

  const clearDisplay = useCallback(() => {
    setState((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => ({ ...row, content: "" })),
    }));
  }, []);

  return {
    state,

    setSport,
    setPrefix,
    setDisplayName,

    // Football
    setTeam1Name,
    setTeam2Name,
    setScore1,
    setScore2,
    setQuarter,
    swapTeams,

    // Badminton
    setPlayer1Name,
    setPlayer2Name,
    setGameScore,

    // Timer
    setTimerMinutes,
    setTimerSeconds,
    startTimer,
    pauseTimer,
    resetTimer,

    // Manual editor
    setRowContent,

    // Display
    setBrightness,

    // Quick actions
    resetAll,
    clearDisplay,
  };
}
