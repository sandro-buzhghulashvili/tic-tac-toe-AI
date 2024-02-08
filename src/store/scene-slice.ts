import { createSlice } from '@reduxjs/toolkit';

interface initialGameScenes {
  introScreen: boolean;
  selectModeScreen: boolean;
  gameScreen: boolean;
}

const initalValue: initialGameScenes = {
  introScreen: true,
  selectModeScreen: false,
  gameScreen: false,
};

const sceneSlice = createSlice({
  name: 'scenes',
  initialState: initalValue,
  reducers: {
    selectMode(state) {
      state.selectModeScreen = true;
      state.introScreen = false;
      state.gameScreen = false;
    },
    gameMode(state) {
      state.selectModeScreen = false;
      state.introScreen = false;
      state.gameScreen = true;
    },
  },
});

export const sceneActions = sceneSlice.actions;

export default sceneSlice.reducer;
