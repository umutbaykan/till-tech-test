const Till = require("../lib/till");

describe("Till class", () => {
  let mock_coffee;
  let mock_muffin;

  beforeEach(() => {
    mock_muffin = { name: "Muffin", price: 20 };
    mock_coffee = { name: "Coffee", price: 10.45 };
  });

  test("initializes with an empty basket and discounts", () => {
    const till = new Till();
    expect(till.basket).toEqual([]);
    expect(till.discounts).toEqual({});
  });

  test("initializes with objects if passed in", () => {
    const someDiscount = () => {};
    const till = new Till([mock_muffin], { someDiscount });
    expect(till.basket).toEqual([mock_muffin]);
    expect(till.discounts).toEqual({ someDiscount });
  });

  describe("calculate total method", () => {
    test("calculates the totals of the items in the basket", () => {
      const till = new Till([mock_coffee, mock_muffin, mock_muffin], {});
      expect(till.calculateTotal()).toEqual(50.45);
    });

    test("returns 0 if nothing is in basket", () => {
      const till = new Till();
      expect(till.calculateTotal()).toEqual(0);
    })
  });
});
