import { createSlice } from '@reduxjs/toolkit';

const initalValue = {
  difficulty: undefined,
  turns: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initalValue,
  reducers: {
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
  },
});

export const gameSliceActions = gameSlice.actions;

export default gameSlice.reducer;
