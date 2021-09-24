import { createSlice } from "@reduxjs/toolkit";

import {
  BackpacksPayload,
  BusinessBagsPayload,
  MessengerBagsPayload,
  Products,
} from "../../types/allProducts";

const initialProductsState: Products = {
  backpacks: [],
  messengerBags: [],
  businessBags: [],
};

// local interfaces
interface InCartChanger {
  payload: number;
}
interface QuantityHandler {
  payload: number;
}
interface SortHandler {
  payload: {
    type1: string;
    type2: string;
  };
}

export const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    // backpacks actions
    addBackpacks: (state, action: BackpacksPayload) => {
      state.backpacks = action.payload;
    },
    changeInCartBackpacks: (state, action: InCartChanger): void => {
      const product = state.backpacks.find(
        (item) => item.id === action.payload
      );
      product!.inCart = !product?.inCart;
    },
    incBackpacksQuantity: (state, action: QuantityHandler): void => {
      const product = state.backpacks.find(
        (item) => item.id === action.payload
      );
      product!.quantity += 1;
    },
    decBackpacksQuantity: (state, action: QuantityHandler): void => {
      const product = state.backpacks.find(
        (item) => item.id === action.payload
      );
      product!.quantity -= 1;
    },
    sortBackpacks: (state, action: SortHandler): void => {
      const { type1, type2 } = action.payload;

      if (type1 === "price" && type2 === "asc") {
        state.backpacks.sort((prev, next) => prev.price - next.price);
      } else if (type1 === "price" && type2 === "des") {
        state.backpacks.sort((prev, next) => next.price - prev.price);
      } else if (type1 === "rating" && type2 === "asc") {
        state.backpacks.sort((prev, next) => prev.rating - next.rating);
      } else if (type1 === "rating" && type2 === "des") {
        state.backpacks.sort((prev, next) => next.rating - prev.rating);
      }
    },

    // messenger bags actions
    addMessengerBags: (state, action: MessengerBagsPayload) => {
      state.messengerBags = action.payload;
    },
    changeInCartMessengerBags: (state, action: InCartChanger): void => {
      const product = state.messengerBags.find(
        (item) => item.id === action.payload
      );
      product!.inCart = !product?.inCart;
    },
    incMessengerBagsQuantity: (state, action: QuantityHandler): void => {
      const product = state.messengerBags.find(
        (item) => item.id === action.payload
      );
      product!.quantity += 1;
    },
    decMessengerBagsQuantity: (state, action: QuantityHandler): void => {
      const product = state.messengerBags.find(
        (item) => item.id === action.payload
      );
      product!.quantity -= 1;
    },
    sortMessengerBags: (state, action: SortHandler): void => {
      const { type1, type2 } = action.payload;

      if (type1 === "price" && type2 === "asc") {
        state.messengerBags.sort((prev, next) => prev.price - next.price);
      } else if (type1 === "price" && type2 === "des") {
        state.messengerBags.sort((prev, next) => next.price - prev.price);
      } else if (type1 === "rating" && type2 === "asc") {
        state.messengerBags.sort((prev, next) => prev.rating - next.rating);
      } else if (type1 === "rating" && type2 === "des") {
        state.messengerBags.sort((prev, next) => next.rating - prev.rating);
      }
    },

    // business bags actions
    addBusinessBags: (state, action: BusinessBagsPayload) => {
      state.businessBags = action.payload;
    },
    changeInCartBusinessBags: (state, action: InCartChanger): void => {
      const product = state.businessBags.find(
        (item) => item.id === action.payload
      );
      product!.inCart = !product?.inCart;
    },
    incBusinessBagsQuantity: (state, action: QuantityHandler): void => {
      const product = state.businessBags.find(
        (item) => item.id === action.payload
      );
      product!.quantity += 1;
    },
    decBusinessBagsQuantity: (state, action: QuantityHandler): void => {
      const product = state.businessBags.find(
        (item) => item.id === action.payload
      );
      product!.quantity -= 1;
    },
    sortBusinessBags: (state, action: SortHandler): void => {
      const { type1, type2 } = action.payload;

      if (type1 === "price" && type2 === "asc") {
        state.businessBags.sort((prev, next) => prev.price - next.price);
      } else if (type1 === "price" && type2 === "des") {
        state.businessBags.sort((prev, next) => next.price - prev.price);
      } else if (type1 === "rating" && type2 === "asc") {
        state.businessBags.sort((prev, next) => prev.rating - next.rating);
      } else if (type1 === "rating" && type2 === "des") {
        state.businessBags.sort((prev, next) => next.rating - prev.rating);
      }
    },
  },
});
export const ProductsActions = productsSlice.actions;
