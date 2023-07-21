const Till = require("../lib/till");

describe("Till class", () => {
  let mock_coffee;
  let mock_muffin;

  beforeEach(() => {
    mock_muffin = { name: "Muffin", price: 20 };
    mock_coffee = { name: "Coffee", price: 10.45 };
  });

  describe("calculate total method", () => {
    test("calculates the totals of the items in the basket", () => {
      expect(
        Till.calculateTotal([mock_coffee, mock_muffin, mock_muffin]),
      ).toEqual(50.45);
    });

    test("returns 0 if nothing is in basket", () => {
      expect(Till.calculateTotal([])).toEqual(0);
    });
  });

  describe("calculate tax method", () => {
    test("calculates the total tax of items in the basket before reductions", () => {
      expect(Till.calculateTax([mock_coffee, mock_muffin], 8.64)).toEqual(3.52);
    });

    test("returns 0 if nothing is in basket", () => {
      expect(Till.calculateTax([], 8.64)).toEqual(0);
    });
  });

  describe("calculate change method", () => {
    test("returns the change customer will get", () => {
      expect(
        Till.calculateChange([mock_coffee, mock_muffin], 50, 8.64),
      ).toEqual(16.03);
    });

    test("throws an error if the amount is less than total", () => {
      expect(() =>
        Till.calculateChange([mock_coffee, mock_muffin], 30, 8.64),
      ).toThrow("Insufficient funds.");
    });
  });

  // describe("calculate discount method", () => {
  //   test("", () => {

  //   })
  // })
});
