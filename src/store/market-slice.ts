import { createSlice } from '@reduxjs/toolkit';

import o2 from '../assets/icons/skins/o2.png';
import o3 from '../assets/icons/skins/o3.png';
import o4 from '../assets/icons/skins/o4.png';
import o5 from '../assets/icons/skins/o5.png';
import x2 from '../assets/icons/skins/x2.png';
import x3 from '../assets/icons/skins/x3.png';
import x4 from '../assets/icons/skins/x4.png';
import x5 from '../assets/icons/skins/x5.png';

interface skinType {
  O: string;
  X: string;
  price: string;
  isAvailable: boolean;
}

const initialValue: skinType[] = [
  {
    O: o2,
    X: x2,
    price: '20',
    isAvailable: false,
  },
  {
    O: o3,
    X: x3,
    price: '15',
    isAvailable: false,
  },
  {
    O: o4,
    X: x4,
    price: '25',
    isAvailable: false,
  },
  {
    O: o5,
    X: x5,
    price: '50',
    isAvailable: false,
  },
];

const marketSlice = createSlice({
  name: 'market',
  initialState: initialValue,
  reducers: {
    buySkin(state, action) {
      const index = state.findIndex(
        (skin) => skin.X === action.payload.X && skin.O === action.payload.O
      );
      console.log(index);
      state[index].isAvailable = true;
    },
  },
});

export const marketSliceActions = marketSlice.actions;

export default marketSlice.reducer;
