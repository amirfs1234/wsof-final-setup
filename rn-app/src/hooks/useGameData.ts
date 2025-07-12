import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { PyramidGame, BlowOutGame } from '@/types';

export const useGameData = () => {
  const usePyramidGame = (gameId: string) =>
    useQuery<PyramidGame>(['pyramid', gameId], async () => {
      const response = await axios.get(`http://localhost:3000/api/pyramid/${gameId}`);
      return response.data;
    });

  const useBlowOutGame = (gameId: string) =>
    useQuery<BlowOutGame>(['blowout', gameId], async () => {
      const response = await axios.get(`http://localhost:3000/api/blowout/${gameId}`);
      return response.data;
    });

  const useCreatePyramidGame = () =>
    useMutation(async (players: string[]) => {
      const response = await axios.post('http://localhost:3000/api/pyramid', { players });
      return response.data;
    });

  const useCreateBlowOutGame = () =>
    useMutation(async (team: string) => {
      const response = await axios.post('http://localhost:3000/api/blowout', { team });
      return response.data;
    });

  return { usePyramidGame, useBlowOutGame, useCreatePyramidGame, useCreateBlowOutGame };
};
