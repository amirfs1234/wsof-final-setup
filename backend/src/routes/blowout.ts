import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { createBlowOutGame, getBlowOutGame } from '../models/blowout';
import { fetchTeamStats } from '../services/nbaApi';
import { z } from 'zod';
import { pool } from '../index';

const router = express.Router();

const blowoutSchema = z.object({
  team: z.string(),
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { team } = blowoutSchema.parse(req.body);
    const userId = req.user.id;
    const game = await createBlowOutGame(userId, team);
    
    // Calculate score based on team stats
    const stats = await fetchTeamStats(team);
    const score = stats.points; // Simplified scoring
    
    await pool.query('UPDATE blowout_games SET score = $1 WHERE id = $2', [score, game.id]);
    
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const game = await getBlowOutGame(req.params.id);
    if (!game || game.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
