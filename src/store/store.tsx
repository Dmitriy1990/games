import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import games from './gamesSlice';
import game from './gameSlice';
const reducer = {
  games,
  game
};

export const store = configureStore({
  reducer
});

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer, preloadedState });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
