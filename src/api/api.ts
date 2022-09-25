import axios from 'axios';
import { RootGames } from '../types/game';

export const getGames = async (): Promise<RootGames> => {
  const response = await axios.get<RootGames>(`./index.json`);
  if (!response.data) {
    throw new Error('Error fetch data');
  }
  return response.data;
};
