import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CartState } from "../../types/CartState";

import {
  addCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart,
} from "../../services/cartServices";

const initialState: CartState = {
  carts: [],
  loading: false,
  error: null,
  getSelectedCart: null,
};

const fetchCarts = createAsyncThunk(
  "cart/fetchCarts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCarts();
      console.log("Thunk Response:", response);
      const data = await response;
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

const fetchSingleCart = createAsyncThunk(
  "cart/fetchSingleCart",
  async (cartId: number, { rejectWithValue }) => {
    try {
      const response = await getCart(Number(cartId));
      return await response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Someting went wrong!");
      }
    }
  },
);

const postCart = createAsyncThunk(
  "cart/postCart",
  async (cart, { rejectWithValue }) => {
    try {
      const response = await addCart(cart);
      return await response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

const editCart = createAsyncThunk(
  "cart/editCart",
  async (cart, { rejectWithValue }) => {
    try {
      const response = await updateCart(cart);
      return await response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

const removeCart = createAsyncThunk(
  "cart/deleteCart",
  async (cartId: number, { rejectWithValue }) => {
    try {
      const response = await deleteCart(Number(cartId));
      return await response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (addBuilder) => {
    //get all carts
    addBuilder.addCase(fetchCarts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchCarts.fulfilled, (state, action) => {
      console.log("FULFILLED", action.payload);
      state.carts = action.payload;
      state.loading = false;
    });
    addBuilder.addCase(fetchCarts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //get single cart
    addBuilder.addCase(fetchSingleCart.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchSingleCart.fulfilled, (state, action) => {
      state.loading = false;
      state.getSelectedCart =
        state.carts.find((item) => item.id === action.payload.id) ?? null;
    });
    addBuilder.addCase(fetchSingleCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //Add new  single cart
    addBuilder.addCase(postCart.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(postCart.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = action.payload;
    });
    addBuilder.addCase(postCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //update  single cart
    addBuilder.addCase(editCart.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(editCart.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = action.payload;
    });
    addBuilder.addCase(editCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //delete  single cart
    addBuilder.addCase(removeCart.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(removeCart.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = state.carts.filter((item) => item.id !== action.payload.id);
    });
    addBuilder.addCase(removeCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = CartSlice.actions;
export { fetchCarts, fetchSingleCart, postCart, editCart, removeCart };
export default CartSlice.reducer;
