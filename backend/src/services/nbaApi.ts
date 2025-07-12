import axios from 'axios';
import { redisClient } from '../index';
import dotenv from 'dotenv';

dotenv.config();

export const fetchPlayerStats = async (playerId: string): Promise<any> => {
  const cacheKey = `player_stats_${playerId}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const response = await axios.get(`${process.env.NBA_API_URL}/players/${playerId}/stats`);
  const stats = response.data;
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(stats)); // Cache for 1 hour
  return stats;
};

export const fetchTeamStats = async (teamId: string): Promise<any> => {
  const cacheKey = `team_stats_${teamId}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const response = await axios.get(`${process.env.NBA_API_URL}/teams/${teamId}/stats`);
  const stats = response.data;
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(stats)); // Cache for 1 hour
  return stats;
};
