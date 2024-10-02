import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setProducts, addProduct } = productSlice.actions;

export default productSlice.reducer;
