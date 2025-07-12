export interface User {
  id: string;
  username: string;
  email: string;
}

export interface PyramidGame {
  id: string;
  players: string[];
  score: number;
}

export interface BlowOutGame {
  id: string;
  team: string;
  score: number;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  game_type: 'pyramid' | 'blowout';
}
