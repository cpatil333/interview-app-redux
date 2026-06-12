import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "../features/products/productSlice";
import { CartSlice } from "../features/cart/cartSlice";
import { UserSlice } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice.reducer,
    cart: CartSlice.reducer,
    user: UserSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
