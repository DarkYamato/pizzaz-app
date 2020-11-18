import menu, { getMenu, getMenuSuccess, getMenuFailure } from "./menuSlice";

describe("menu reducer", () => {
  it("should handle initial state", () => {
    expect(menu(undefined, {})).toEqual({
      loading: false,
      hasErrors: false,
      menu: [],
    });
  });

  it("should handle GET_MENU", () => {
    expect(
      menu(
        {
          loading: false,
          hasErrors: false,
          menu: [],
        },
        {
          type: getMenu.type,
        }
      )
    ).toEqual({
      loading: true,
      hasErrors: false,
      menu: [],
    });
  });

  it("should handle GET_MENU_SUCCESS", () => {
    expect(
      menu(
        {
          loading: true,
          hasErrors: false,
          menu: [],
        },
        {
          type: getMenuSuccess.type,
          payload: [
            {
              id: 1,
              name: "Turkey",
              img: "img",
              composition: "Turkey",
              price: {
                USD: "17.99",
                EUR: "15.14",
              },
            },
          ],
        }
      )
    ).toEqual({
      loading: false,
      hasErrors: false,
      menu: [
        {
          id: 1,
          name: "Turkey",
          img: "img",
          composition: "Turkey",
          price: {
            USD: "17.99",
            EUR: "15.14",
          },
        },
      ],
    });
  });

  it("should handle GET_MENU_FAILURE", () => {
    expect(
      menu(
        {
          loading: false,
          hasErrors: true,
          menu: [],
        },
        {
          type: getMenuFailure.type,
        }
      )
    ).toEqual({
      loading: false,
      hasErrors: true,
      menu: [],
    });
  });
});
