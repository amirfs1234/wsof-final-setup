import { redisClient } from '../index';

export const cacheLeaderboard = async (gameType: 'pyramid' | 'blowout', data: any): Promise<void> => {
  const cacheKey = `leaderboard_${gameType}`;
  await redisClient.setEx(cacheKey, 300, JSON.stringify(data)); // Cache for 5 minutes
};

export const getCachedLeaderboard = async (gameType: 'pyramid' | 'blowout'): Promise<any | null> => {
  const cacheKey = `leaderboard_${gameType}`;
  const cached = await redisClient.get(cacheKey);
  return cached ? JSON.parse(cached) : null;
};
