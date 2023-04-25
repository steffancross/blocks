import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleProductAsync = createAsyncThunk(
  'fetchSingleProduct/get',
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  }
);

export const addProductToCartAsync = createAsyncThunk(
  'fetchSingleProduct/post',
  async ({ userId, productId }) => {
    const { data } = await axios.post(`/api/carts`, {
      userId,
      productId,
    });
    return data;
  }
);

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    // dont think we need this, don't want to udate single product state
    // builder.addCase(addProductToCartAsync.fulfilled, (state, action) => {
    //   return action.payload;
    // });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProduct;
};

export default singleProductSlice.reducer;
