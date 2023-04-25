import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitOrder = createAsyncThunk(
  'checkout/submit',
  async ({ userId }) => {
    const { data } = await axios.put("/api/checkout/submit", { userId });
    return data;
  }
);

export const fetchCartAsync = createAsyncThunk(
  "fetchCart/get",
  async ({ userId }) => {
    // using this syntax for req.query otherwise can't pass info in get request
    const { data } = await axios.get(`/api/carts?userId=${userId}`);
    return data;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "removeFromCart/delete",
  async ({ cartId, productId, userId }) => {
    const { data } = await axios.delete(
      `/api/carts?cartId=${cartId}&productId=${productId}&userId=${userId}`
    );
    return data;
  }
);

export const editQuantityAsync = createAsyncThunk(
  "editQuantity/put",
  async ({ userId, productId, plusOrMinus }) => {
    const { data } = await axios.put(`/api/carts`, {
      userId,
      productId,
      plusOrMinus,
    });
    return data;
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    cart: {},
    status: "idle",
    error: null,
    confirmation: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      const updatedCartItems = state.cart.cartitems.filter(
        (item) => item.productId !== action.payload.productId
      );
      state.cart.cartitems = updatedCartItems;
    });
    builder.addCase(editQuantityAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(submitOrder.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(submitOrder.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.confirmation = action.payload;
    });
    builder.addCase(submitOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default checkoutSlice.reducer;
