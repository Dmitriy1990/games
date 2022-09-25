import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SoftswissAztecMagic } from '../types/game';
import { RootState } from './store';

// не будет работать после перезагрузки страницы, нужен бек
export const fetchGame = createAsyncThunk(
  'game/fetchGame',
  async function (game: string, { getState }) {
    const state = (await getState()) as RootState;
    const gameItem = state.games.data.findIndex((i) => i[0] === game);
    if (gameItem !== -1) {
      return state.games.data[gameItem];
    } else {
      return null;
    }
  }
);

export const game = createSlice({
  name: 'game',
  initialState: {
    data: null as [string, SoftswissAztecMagic] | null,
    loading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGame.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchGame.rejected, (state) => {
      state.loading = false;
      state.data = null;
    });
  }
});

export default game.reducer;
