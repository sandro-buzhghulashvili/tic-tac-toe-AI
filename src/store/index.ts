import { configureStore } from '@reduxjs/toolkit';

import sceneSliceReducer from './scene-slice';
import gameSliceReducer from './game-slice';
import menuSliceReducer from './menu-slice';

const store = configureStore({
  reducer: {
    scenes: sceneSliceReducer,
    game: gameSliceReducer,
    menu: menuSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
