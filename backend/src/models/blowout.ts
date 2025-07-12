import { pool } from '../index';
import { BlowOutGame } from '../types';

export const createBlowOutGame = async (userId: string, team: string): Promise<BlowOutGame> => {
  const score = 0; // Initial score, updated later via NBA API
  const result = await pool.query(
    'INSERT INTO blowout_games (user_id, team, score) VALUES ($1, $2, $3) RETURNING *',
    [userId, team, score]
  );
  return result.rows[0];
};

export const getBlowOutGame = async (gameId: string): Promise<BlowOutGame | null> => {
  const result = await pool.query('SELECT * FROM blowout_games WHERE id = $1', [gameId]);
  return result.rows[0] || null;
};
