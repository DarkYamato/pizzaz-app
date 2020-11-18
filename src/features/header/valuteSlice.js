import { createSlice } from "@reduxjs/toolkit";

const prevValute = localStorage.getItem("valute");
export const valuteSlice = createSlice({
  name: "valute",
  initialState: {
    currentValute: prevValute || "USD",
  },
  reducers: {
    changeCurrentValute: (state, { payload }) => {
      state.currentValute = payload;
    },
  },
});

export const { changeCurrentValute } = valuteSlice.actions;

export const changeValute = (value) => (dispatch) => {
  localStorage.setItem("valute", value);
  dispatch(changeCurrentValute(value));
};

export const selectValute = (state) => state.currentValute;

export default valuteSlice.reducer;
