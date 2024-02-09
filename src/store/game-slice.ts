import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialValueType {
  mode: string;
  difficulty: undefined | string;
  turns: any[];
  scoreboard: {
    X: number;
    O: number;
  };
}

const initalValue: initialValueType = {
  mode: 'single-player',
  difficulty: undefined,
  turns: [],
  scoreboard: {
    X: 0,
    O: 0,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initalValue,
  reducers: {
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    handleTurn(state, action) {
      state.turns.unshift(action.payload);
    },
    resetGame(state) {
      state.turns = [];
    },
    updateScore(state, action: PayloadAction<'X' | 'O'>) {
      state.scoreboard[action.payload]++;
    },
  },
});

export const gameSliceActions = gameSlice.actions;

export default gameSlice.reducer;
