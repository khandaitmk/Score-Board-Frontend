// Sport types
export const SportTypes = [
  'football',
  'badminton',
  'basketball',
  'volleyball',
  'cricket',
  'table-tennis',
  'kabaddi',
  'kho-kho',
  'custom',
];

// ================= STATE CREATORS =================

export const createFootballState = () => ({
  team1Name: 'TEAM 1',
  team2Name: 'TEAM 2',
  score1: 0,
  score2: 0,
  quarter: 1,         // 1-4
});

export const createBadmintonState = () => ({
  player1Name: 'PLAYER 1',
  player2Name: 'PLAYER 2',
  currentGame: 1,
  currentP1: 0,
  currentP2: 0,
  games: {
    game1: { p1: 0, p2: 0 },
    game2: { p1: 0, p2: 0 },
    game3: { p1: 0, p2: 0 },
  },
  // No timer for badminton
});

export const createTableTennisState = () => ({
  player1Name: 'PLAYER 1',
  player2Name: 'PLAYER 2',
  currentGame: 1,
  currentP1: 0,
  currentP2: 0,
  games: {
    game1: { p1: 0, p2: 0 },
    game2: { p1: 0, p2: 0 },
    game3: { p1: 0, p2: 0 },
    game4: { p1: 0, p2: 0 },
    game5: { p1: 0, p2: 0 },
  },
  // No timer for table tennis
});

export const createBasketballState = () => ({
  team1Name: 'TEAM 1',
  team2Name: 'TEAM 2',
  score1: 0,
  score2: 0,
  quarter: 1,         // 1-4
  fouls1: 0,
  fouls2: 0,
  // Has timer
});

export const createVolleyballState = () => ({
  team1Name: 'TEAM 1',
  team2Name: 'TEAM 2',
  currentSet: 1,
  currentScore1: 0,
  currentScore2: 0,
  sets: {
    set1: { t1: 0, t2: 0 },
    set2: { t1: 0, t2: 0 },
    set3: { t1: 0, t2: 0 },
    set4: { t1: 0, t2: 0 },
    set5: { t1: 0, t2: 0 },
  },
  // No timer
});

export const createCricketState = () => ({
  team1Name: 'TEAM 1',
  team2Name: 'TEAM 2',
  batting: 'team1',   // which team is batting
  runs: 0,
  wickets: 0,         // 0-10
  overs: 0,
  balls: 0,           // 0-5 (per over)
  target: 0,          // 2nd innings target
  innings: 1,         // 1 or 2
  totalOvers: 20,     // Total match overs
});

export const createKabaddiState = () => ({
  team1Name: 'TEAM 1',
  team2Name: 'TEAM 2',
  score1: 0,
  score2: 0,
  raids1: 0,
  raids2: 0,
  allOuts1: 0,
  allOuts2: 0,
  half: 1,            // 1 or 2
  // Has timer
});

export const createKhoKhoState = () => ({
  team1Name: 'TEAM 1',
  team2Name: 'TEAM 2',
  score1: 0,
  score2: 0,
  turn: 1,            // 1 or 2
  innings: 1,         // 1 or 2
  half: 1,            // 1 or 2
  defendersLeft: 9,   // 0-9
  // Has timer
});

export const createCustomState = () => ({
  row1: '',
  row2: '',
  row3: '',
  row4: '',
  row5: '',
  row6: '',
});

export const createTimerState = () => ({
  minutes: 0,
  seconds: 0,
  isRunning: false,
});

// ================= SPORTS WITH TIMER =================
// football ✅ | basketball ✅ | kabaddi ✅ | kho-kho ✅
// badminton ❌ | table-tennis ❌ | volleyball ❌ | cricket ❌ | custom ❌

export const SPORTS_WITH_TIMER = ['football', 'basketball', 'kabaddi', 'kho-kho'];

// ================= SPORTS CONFIG =================

export const SPORTS_CONFIG = [
  { id: 'football',     name: 'Football',     icon: '⚽', hasQuarters: true,  hasTimer: true  },
  { id: 'badminton',    name: 'Badminton',    icon: '🏸', hasGames: true,     hasTimer: false },
  { id: 'basketball',   name: 'Basketball',   icon: '🏀', hasQuarters: true,  hasTimer: true  },
  { id: 'volleyball',   name: 'Volleyball',   icon: '🏐', hasSets: true,      hasTimer: false },
  { id: 'cricket',      name: 'Cricket',      icon: '🏏', hasInnings: true,   hasTimer: false },
  { id: 'table-tennis', name: 'Table Tennis', icon: '🏓', hasGames: true,     hasTimer: false },
  { id: 'kabaddi',      name: 'Kabaddi',      icon: '🤼', hasHalves: true,    hasTimer: true  },
  { id: 'kho-kho',      name: 'Kho-Kho',      icon: '🏃', hasInnings: true,   hasTimer: true  },
  { id: 'custom',       name: 'Custom Display', icon: '🎨', hasCustomRows: true, hasTimer: false },
];