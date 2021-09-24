import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/allProducts";

import { authSlice } from "./slices/auth";
import { cartSlice } from "./slices/cart";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
