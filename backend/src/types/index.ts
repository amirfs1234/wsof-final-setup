export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface PyramidGame {
  id: string;
  user_id: string;
  players: string[];
  score: number;
  created_at: Date;
}

export interface BlowOutGame {
  id: string;
  user_id: string;
  team: string;
  score: number;
  created_at: Date;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  game_type: 'pyramid' | 'blowout';
}
