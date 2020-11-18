import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../api";
const initialState = {
  name: "",
  surname: "",
  email: "",
  orderHistory: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.name = payload.name;
      state.surname = payload.surname;
      state.email = payload.email;
      state.orderHistory = payload.orderHistory;
    },
  },
});

export const { addUser } = userSlice.actions;

export const getUser = () => async (dispatch) => {
  const data = await getCurrentUser();
  if (data && data.user) {
    const { name, surname, email } = data.user;
    const newUser = {
      name,
      surname,
      email,
      orderHistory: data.orderHistory,
    };
    dispatch(addUser(newUser));
  }
};

export const userSignOut = () => (dispatch) => {
  dispatch(addUser(initialState));
  localStorage.setItem("token", "");
};

export const selectUser = (state) => state;

export default userSlice.reducer;
