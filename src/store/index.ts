import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/allProducts";

import { authSlice } from "./slices/auth";
import { cartSlice } from "./slices/cart";
import { navSlice } from "./slices/nav";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    nav: navSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
