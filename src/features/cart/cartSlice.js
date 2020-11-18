import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    updateCartAdd: (state, { payload }) => {
      const { id, counter } = payload;
      const orderIndex = state.cart.findIndex((x) => x.id === id);

      if (orderIndex === -1) {
        localStorage.setItem(
          "cart",
          JSON.stringify(state.cart.concat({ id, counter }))
        );
        state.cart = state.cart.concat({ id, counter });
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify(
            state.cart.map((x) => (x.id === id ? { ...x, counter } : x))
          )
        );
        state.cart = state.cart.map((x) =>
          x.id === id ? { ...x, counter } : x
        );
      }
    },
    updateCartDelete: (state, { payload }) => {
      const { id } = payload;
      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.filter((x) => x.id !== id))
      );
      state.cart = state.cart.filter((x) => x.id !== id);
    },
    updateCartClear: (state) => {
      localStorage.setItem("cart", "[]");
      state.cart = [];
    },
  },
});

export const {
  updateCartAdd,
  updateCartDelete,
  updateCartClear,
} = cartSlice.actions;

export const addToCart = (id, counter) => (dispatch) => {
  dispatch(updateCartAdd({ id, counter }));
};

export const deleteFromCart = (id) => (dispatch) => {
  dispatch(updateCartDelete({ id }));
};

export const clearCart = () => (dispatch) => {
  dispatch(updateCartClear());
};

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
