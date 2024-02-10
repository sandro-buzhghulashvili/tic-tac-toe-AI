import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialValueType {
  mode: string;
  difficulty: undefined | string;
  turns: any[];
  scoreboard: {
    X: number;
    O: number;
  };
  players?: any;
}

const initalValue: initialValueType = {
  mode: 'single-player',
  difficulty: undefined,
  turns: [],
  scoreboard: {
    X: 0,
    O: 0,
  },
  players: {
    X: 'Player 1',
    O: 'Player 2',
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
    resetScore(state) {
      state.scoreboard['X'] = 0;
      state.scoreboard['O'] = 0;
    },
    setPlayers(state, action: PayloadAction<any>) {
      if (action.payload) {
        state.players = {
          X: action.payload.X,
          O: action.payload.O,
        };
      }
    },
    resetPlayers(state) {
      state.players = {
        X: 'Player 1',
        O: 'Player 2',
      };
    },
    switchGameMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const gameSliceActions = gameSlice.actions;

export default gameSlice.reducer;
