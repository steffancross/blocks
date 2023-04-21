import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductToCartAsync = createAsyncThunk(
  "addProduct",
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductToCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const cartState = (state) => {
  return state.cartState;
};

export default cartSlice.reducer;
