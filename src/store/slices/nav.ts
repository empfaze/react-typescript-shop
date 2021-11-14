import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavState } from "../../types/nav";

const initialState: NavState = {
  isBurgerVisible: false,
  navIsVisible: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setBurgerVisibility: (state, action: PayloadAction<boolean>) => {
      state.isBurgerVisible = action.payload;
    },
    setNavVisibility: (state, action: PayloadAction<boolean>) => {
      state.navIsVisible = action.payload;
    },
  },
});

export const navActions = navSlice.actions;
