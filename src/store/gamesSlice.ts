import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGames } from '../api/api';
import { Sort, RootGames, SoftswissAztecMagic } from '../types/game';

const LIMIT = 12;

// на каждую смену фильтра должен быть запрос к серверу
export const fetchGames = createAsyncThunk('games/fetchGames', async function (sort: Sort) {
  const response = await getGames();
  const newData = Object.entries(response)
    .sort((a, b) => a[1].collections.popularity - b[1].collections.popularity)
    .filter((item) => {
      if (sort.balType && sort.provider) {
        return (
          item[1].provider === sort.provider && Object.keys(item[1].real).includes(sort.balType)
        );
      } else if (sort.balType) {
        return Object.keys(item[1].real).includes(sort.balType);
      } else if (sort.provider) {
        return item[1].provider === sort.provider;
      } else {
        return true;
      }
    });
  return { newData, response };
});

export const games = createSlice({
  name: 'games',
  initialState: {
    data: [] as [string, SoftswissAztecMagic][],
    partData: [] as [string, SoftswissAztecMagic][],
    totalRecords: 0,
    loading: true,
    limit: 0,
    provider: [] as string[],
    balances: [] as string[],
    sortBalance: '',
    select: '',
    balType: ''
  },
  reducers: {
    addGames(state) {
      state.partData.push(...state.data.slice(state.limit, state.limit + LIMIT));
      state.limit = state.limit += LIMIT;
    },
    setSelect(state, action) {
      state.select = action.payload;
    },
    setBalType(state, action) {
      state.balType = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.loading = false;
      const values = Object.values(action.payload.response);
      const filterProvider = values
        .map((item) => item.provider)
        .filter((item, index, self) => index === self.findIndex((t) => t === item));
      const balanceTypes: string[] = [];

      values.forEach((it) => {
        for (const real in it.real) {
          if (!balanceTypes.includes(real)) {
            balanceTypes.push(real);
          }
        }
      });

      state.provider = filterProvider;
      state.partData = action.payload.newData.slice(0, LIMIT);
      state.data = action.payload.newData;
      state.limit = LIMIT;
      state.balances = balanceTypes;
    });
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export const { addGames, setBalType, setSelect } = games.actions;
export default games.reducer;
