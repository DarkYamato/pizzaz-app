import { createSlice } from "@reduxjs/toolkit";

import { getMenu as getMenuApi } from "../../api";

export const initialState = {
  loading: false,
  hasErrors: false,
  menu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    getMenu: (state) => {
      state.loading = true;
    },
    getMenuSuccess: (state, { payload }) => {
      state.menu = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getMenuFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getMenu, getMenuSuccess, getMenuFailure } = menuSlice.actions;

export const selectMenu = (state) => state.menu;

export default menuSlice.reducer;

export const fetchMenu = () => {
  return async (dispatch) => {
    dispatch(getMenu());

    try {
      const response = await getMenuApi();
      const data = response.data;

      dispatch(getMenuSuccess(data));
    } catch (error) {
      dispatch(getMenuFailure());
    }
  };
};
