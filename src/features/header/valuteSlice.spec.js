import valute, { changeCurrentValute } from "./valuteSlice";

describe("valute reducer", () => {
  it("should handle initial state", () => {
    expect(valute(undefined, {})).toEqual({
      currentValute: "USD",
    });
  });

  it("should handle CHANGE_CURRENT_VALUTE", () => {
    expect(
      valute(
        {
          currentValute: "USD",
        },
        {
          type: changeCurrentValute.type,
          payload: "EUR",
        }
      )
    ).toEqual({
      currentValute: "EUR",
    });

    expect(
      valute(
        {
          currentValute: "EUR",
        },
        {
          type: changeCurrentValute.type,
          payload: "USD",
        }
      )
    ).toEqual({
      currentValute: "USD",
    });
  });
});
