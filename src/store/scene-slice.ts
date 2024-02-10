import { createSlice } from '@reduxjs/toolkit';

interface initialGameScenes {
  introScreen: boolean;
  selectModeScreen: boolean;
  gameScreen: boolean;
  marketScreen: boolean;
  budget: number;
}

const initalValue: initialGameScenes = {
  introScreen: true,
  selectModeScreen: false,
  gameScreen: false,
  marketScreen: false,
  budget: 120,
};

const sceneSlice = createSlice({
  name: 'scenes',
  initialState: initalValue,
  reducers: {
    selectMode(state) {
      state.selectModeScreen = true;
      state.introScreen = false;
      state.gameScreen = false;
      state.marketScreen = false;
    },
    gameMode(state) {
      state.selectModeScreen = false;
      state.introScreen = false;
      state.gameScreen = true;
      state.marketScreen = false;
    },
    marketMode(state) {
      state.selectModeScreen = false;
      state.introScreen = false;
      state.gameScreen = false;
      state.marketScreen = true;
    },
    setBudget(state, { payload }) {
      state.budget = payload;
    },
  },
});

export const sceneActions = sceneSlice.actions;

export default sceneSlice.reducer;
