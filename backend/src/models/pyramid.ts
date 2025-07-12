import { pool } from '../index';
import { PyramidGame } from '../types';

export const createPyramidGame = async (userId: string, players: string[]): Promise<PyramidGame> => {
  const score = 0; // Initial score, updated later via NBA API
  const result = await pool.query(
    'INSERT INTO pyramid_games (user_id, players, score) VALUES ($1, $2, $3) RETURNING *',
    [userId, JSON.stringify(players), score]
  );
  return result.rows[0];
};

export const getPyramidGame = async (gameId: string): Promise<PyramidGame | null> => {
  const result = await pool.query('SELECT * FROM pyramid_games WHERE id = $1', [gameId]);
  return result.rows[0] || null;
};
