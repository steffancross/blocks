import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartAsync = createAsyncThunk(
  'fetchCart/get',
  async ({ userId }) => {
    // using this syntax for req.query otherwise can't pass info in get request
    const { data } = await axios.get(`/api/carts?userId=${userId}`);
    return data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const cartState = (state) => {
  return state.cartState;
};

export default cartSlice.reducer;
