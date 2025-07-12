import express from 'express';
import { pool } from '../index';
import { cacheLeaderboard, getCachedLeaderboard } from '../services/cache';
import { LeaderboardEntry } from '../types';

const router = express.Router();

router.get('/:gameType', async (req, res) => {
  try {
    const gameType = req.params.gameType as 'pyramid' | 'blowout';
    if (gameType !== 'pyramid' && gameType !== 'blowout') {
      return res.status(400).json({ error: 'Invalid game type' });
    }

    const cached = await getCachedLeaderboard(gameType);
    if (cached) {
      return res.json(cached);
    }

    const table = gameType === 'pyramid' ? 'pyramid_games' : 'blowout_games';
    const result = await pool.query(`
      SELECT u.username, g.score
      FROM ${table} g
      JOIN users u ON g.user_id = u.id
      ORDER BY g.score DESC
      LIMIT 10
    `);
    
    const leaderboard: LeaderboardEntry[] = result.rows.map(row => ({
      username: row.username,
      score: row.score,
      game_type: gameType,
    }));

    await cacheLeaderboard(gameType, leaderboard);
    res.json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
