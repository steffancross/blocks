import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// get all campuses
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const { data } = await axios.get('/api/products');
  return data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;
