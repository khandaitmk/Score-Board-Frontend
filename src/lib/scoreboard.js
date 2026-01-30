// Sport types (used as string literals in JS)
export const SportTypes = [
  'football',
  'badminton',
  'basketball',
  'volleyball',
  'cricket',
  'table-tennis',
  'kabaddi',
  'kho-kho',
];

// Initial empty shapes (optional, for reference / defaults)
export const createFootballState = () => ({
  team1Name: '',
  team2Name: '',
  score1: 0,
  score2: 0,
  quarter: 1,
});

export const createBadmintonState = () => ({
  player1Name: '',
  player2Name: '',
  games: {
    game1: { p1: 0, p2: 0 },
    game2: { p1: 0, p2: 0 },
    game3: { p1: 0, p2: 0 },
  },
});

export const createTimerState = () => ({
  minutes: 0,
  seconds: 0,
  isRunning: false,
});

// Sports configuration (used by SportSelector)
export const SPORTS_CONFIG = [
  { id: 'football', name: 'Football', icon: '⚽', hasQuarters: true },
  { id: 'badminton', name: 'Badminton', icon: '🏸', hasGames: true },
  { id: 'basketball', name: 'Basketball', icon: '🏀', hasQuarters: true },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐', hasGames: true },
  { id: 'cricket', name: 'Cricket', icon: '🏏' },
  { id: 'table-tennis', name: 'Table Tennis', icon: '🏓', hasGames: true },
  { id: 'kabaddi', name: 'Kabaddi', icon: '🤼' },
  { id: 'kho-kho', name: 'Kho-Kho', icon: '🏃' },
];
