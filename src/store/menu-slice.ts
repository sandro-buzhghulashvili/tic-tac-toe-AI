import { createSlice } from '@reduxjs/toolkit';

import defaultX from '../assets/icons/x-v1.png';
import defaultO from '../assets/icons/o-v1.png';

const initialValue = {
  X: defaultX,
  O: defaultO,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialValue,
  reducers: {},
});

export default menuSlice.reducer;
