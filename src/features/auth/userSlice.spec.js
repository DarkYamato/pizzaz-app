import user, { addUser } from "./userSlice";

describe("user reducer", () => {
  it("should handle initial state", () => {
    expect(user(undefined, {})).toEqual({
      name: "",
      surname: "",
      email: "",
      orderHistory: [],
    });
  });

  it("should handle ADD_USER", () => {
    expect(
      user(
        {
          name: "",
          surname: "",
          email: "",
          orderHistory: [],
        },
        {
          type: addUser.type,
          payload: {
            name: "John",
            surname: "Doe",
            email: "dorian@mail.com",
            orderHistory: [{ id: 1, counter: 2 }],
          },
        }
      )
    ).toEqual({
      name: "John",
      surname: "Doe",
      email: "dorian@mail.com",
      orderHistory: [{ id: 1, counter: 2 }],
    });
  });
});
