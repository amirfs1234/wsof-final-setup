import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { createPyramidGame, getPyramidGame } from '../models/pyramid';
import { fetchPlayerStats } from '../services/nbaApi';
import { z } from 'zod';
import { pool } from '../index';

const router = express.Router();

const pyramidSchema = z.object({
  players: z.array(z.string()).length(5), // 5 players for Pyramid
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { players } = pyramidSchema.parse(req.body);
    const userId = req.user.id;
    const game = await createPyramidGame(userId, players);
    
    // Calculate score based on player stats
    let score = 0;
    for (const playerId of players) {
      const stats = await fetchPlayerStats(playerId);
      score += stats.points + stats.rebounds + stats.assists; // Simplified scoring
    }
    await pool.query('UPDATE pyramid_games SET score = $1 WHERE id = $2', [score, game.id]);
    
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const game = await getPyramidGame(req.params.id);
    if (!game || game.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
