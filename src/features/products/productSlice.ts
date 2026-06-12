import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../../types/ProductState";

const initialState: ProductState = {
  products: [],
  setSelectedProduct: null,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    getProduct: (state, action) => {
      state.setSelectedProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id,
      );
    },
  },
});

export const {
  setProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = ProductSlice.actions;
export default ProductSlice.reducer;
