import cart, {
  updateCartAdd,
  updateCartDelete,
  updateCartClear,
} from "./cartSlice";

describe("cart reducer", () => {
  it("should handle initial state", () => {
    expect(cart(undefined, {})).toEqual({ cart: [] });
  });

  it("should handle UPDATE_CART_ADD", () => {
    expect(
      cart(
        { cart: [] },
        {
          type: updateCartAdd.type,
          payload: {
            id: 3,
            counter: 1,
          },
        }
      )
    ).toEqual({
      cart: [
        {
          id: 3,
          counter: 1,
        },
      ],
    });

    expect(
      cart(
        {
          cart: [
            {
              id: 3,
              counter: 1,
            },
          ],
        },
        {
          type: updateCartAdd.type,
          payload: {
            id: 3,
            counter: 3,
          },
        }
      )
    ).toEqual({
      cart: [
        {
          id: 3,
          counter: 3,
        },
      ],
    });

    expect(
      cart(
        {
          cart: [
            {
              id: 3,
              counter: 3,
            },
          ],
        },
        {
          type: updateCartAdd.type,
          payload: {
            id: 2,
            counter: 5,
          },
        }
      )
    ).toEqual({
      cart: [
        {
          id: 3,
          counter: 3,
        },
        {
          id: 2,
          counter: 5,
        },
      ],
    });
  });

  it("should handle UPDATE_CART_DELETE", () => {
    expect(
      cart(
        {
          cart: [
            {
              id: 3,
              counter: 3,
            },
            {
              id: 2,
              counter: 5,
            },
          ],
        },
        {
          type: updateCartDelete.type,
          payload: {
            id: 3,
          },
        }
      )
    ).toEqual({
      cart: [
        {
          id: 2,
          counter: 5,
        },
      ],
    });
  });

  it("should handle UPDATE_CART_CLEAR", () => {
    expect(
      cart(
        {
          cart: [
            {
              id: 2,
              counter: 5,
            },
          ],
        },
        {
          type: updateCartClear.type,
        }
      )
    ).toEqual({ cart: [] });
  });
});
