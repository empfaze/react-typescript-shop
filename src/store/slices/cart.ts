import { CartAddPayload, CartRemovePayload, CartState } from "../../types/cart";
import { createSlice } from "@reduxjs/toolkit";

interface QuantityHandlerPayload {
  payload: number;
}

const initialCartState: CartState = {
  cartIsShown: false,
  items: [],
  success: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: CartAddPayload) => {
      const product = action.payload;
      state.items = [...state.items, product];
    },
    removeFromCart: (state, action: CartRemovePayload) => {
      const product = state.items.find(
        (product) => product.id === action.payload
      );
      product!.quantity = 1;

      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    openCart: (state) => {
      state.cartIsShown = true;
    },
    closeCart: (state) => {
      state.cartIsShown = false;
    },

    incProductQuantity: (state, action: QuantityHandlerPayload) => {
      const product = state.items.find((item) => item.id === action.payload);
      product!.quantity++;
    },
    decProductQuantity: (state, action: QuantityHandlerPayload) => {
      const product = state.items.find((item) => item.id === action.payload);
      product!.quantity--;
    },

    setSuccessfullState: (state) => {
      state.success = !state.success;
    },
  },
});

export const cartActions = cartSlice.actions;
