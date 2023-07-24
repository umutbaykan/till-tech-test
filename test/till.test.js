const Till = require("../lib/till");

describe("Till class", () => {
  let mockCoffee;
  let mockMuffin;
  let mockTiramisu;
  let fixedDiscount;
  let percentageDiscount;

  beforeEach(() => {
    fixedDiscount = {
      type: "fixed",
      value: 2,
      checkApplicable: () => {
        return true;
      },
    };
    percentageDiscount = {
      type: "percentage",
      value: 20,
      checkApplicable: () => {
        return true;
      },
    };

    mockMuffin = {
      name: "Muffin",
      price: 20,
      discount: percentageDiscount,
    };
    mockCoffee = {
      name: "Coffee",
      price: 10.45,
      discount: fixedDiscount,
    };
    mockTiramisu = {
      name: "Tiramisu",
      price: 35,
      discount: null,
    };
  });

  describe("calculate total method", () => {
    test("calculates the totals of the items in the basket", () => {
      const totals = Till.calculateTotal([mockCoffee, mockMuffin, mockMuffin]);
      expect(totals.grossTotal).toEqual(50.45);
      expect(totals.discountTotal).toEqual(40.45);
    });

    test("reduces the price by percentage if discount type is percentage", () => {
      const totals = Till.calculateTotal([mockMuffin]);
      expect(totals.grossTotal).toEqual(20);
      expect(totals.discountTotal).toEqual(16);
    });

    test("reduces the price by fixed amount if discount type is fixed", () => {
      const totals = Till.calculateTotal([mockCoffee]);
      expect(totals.grossTotal).toEqual(10.45);
      expect(totals.discountTotal).toEqual(8.45);
    });

    test("returns 0 if nothing is in basket", () => {
      expect(Till.calculateTotal([]).grossTotal).toEqual(0);
    });

    test("returns the same amount if item has no discount", () => {
      expect(Till.calculateTotal([mockTiramisu]).grossTotal).toEqual(35);
      expect(Till.calculateTotal([mockTiramisu]).discountTotal).toEqual(35);
    });
  });

  describe("calculate tax method", () => {
    test("calculates the total tax of items in the basket before reductions", () => {
      expect(Till.calculateTax(30.45, 8.64)).toEqual(3.52);
    });
  });

  describe("calculate change method", () => {
    test("returns the change customer will get", () => {
      expect(Till.calculateChange(50, 45.5)).toEqual(4.5);
    });

    test("throws an error if the amount is less than total", () => {
      expect(() => Till.calculateChange(4, 5)).toThrow("Insufficient funds.");
    });
  });
});
