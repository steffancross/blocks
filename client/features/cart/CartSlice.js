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

export const removeFromCartAsync = createAsyncThunk(
  'removeFromCart/delete',
  async ({ cartId, productId, userId }) => {
    const { data } = await axios.delete(
      `/api/carts?cartId=${cartId}&productId=${productId}&userId=${userId}`
    );
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
    // builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
    //   const removedProductId = action.payload;
    //   console.log(removedProductId);
    //   const newCartItems = state.cart.cartitems.filter(
    //     (item) => item.productId !== removedProductId
    //   );
    //   console.log('newcartitems', newCartItems);
    //   state.cart.cartitems = newCartItems;
    //   console.log('state', state);
    //   return state;
    // });
    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default cartSlice.reducer;
