const Till = require("../lib/till");

describe("Till class", () => {
  it("initializes with an empty basket and discounts", () => {
    const till = new Till();
    expect(till.basket).toEqual({});
    expect(till.discounts).toEqual({});
  });

  it("initializes with objects if passed in", () => {
    const someDiscount = () => {};
    const till = new Till({ Muffin: 1 }, { someDiscount });
    expect(till.basket).toEqual({ Muffin: 1 });
    expect(till.discounts).toEqual({ someDiscount });
  });
});
