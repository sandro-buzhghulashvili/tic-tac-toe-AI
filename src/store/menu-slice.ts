import { createSlice } from '@reduxjs/toolkit';

import defaultX from '../assets/icons/x-v1.png';
import defaultO from '../assets/icons/o-v1.png';

const initialValue: {
  X: string;
  O: string;
} = {
  X: defaultX,
  O: defaultO,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialValue,
  reducers: {
    changeSkins(state, { payload }) {
      state.X = payload.X;
      state.O = payload.O;
    },
  },
});

export const menuSliceActions = menuSlice.actions;

export default menuSlice.reducer;
