const Till = require("../lib/till");

describe("Till class", () => {
  let mockCoffee;
  let mockMuffin;
  let mockTiramisu;
  let fixedDiscount;
  let percentageDiscount;
  let trueBasketDiscount;
  let falseBasketDiscount;
  let totals;

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

    falseBasketDiscount = {
      checkApplicable: () => {
        return false;
      },
    };

    totals = { grossTotal: 35, discountTotal: 35 };

    trueBasketDiscount = {
      type: "percentage",
      value: 10,
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
      expect(Till.calculateTax([mockCoffee, mockMuffin], 8.64)).toEqual(3.52);
    });

    test("returns 0 if nothing is in basket", () => {
      expect(Till.calculateTax([], 8.64)).toEqual(0);
    });
  });

  describe("calculate basket discount method", () => {
    test("returns the total basket discount if discount is applicable", () => {
      expect(
        Till.calculateBasketDiscount(
          [mockTiramisu],
          totals,
          trueBasketDiscount,
        ),
      ).toEqual(31.5);
    });

    test("returns the original price if discount isnt applicable", () => {
      expect(
        Till.calculateBasketDiscount(
          [mockTiramisu],
          totals,
          falseBasketDiscount,
        ),
      ).toEqual(35);
    });
  });

  describe("calculate change method", () => {
    // test("returns the change customer will get", () => {
    //   expect(
    //     Till.calculateChange([mockCoffee, mockMuffin], 50, 8.64),
    //   ).toEqual(16.03);
    // });
    // test("throws an error if the amount is less than total", () => {
    //   expect(() =>
    //     Till.calculateChange([mockCoffee, mockMuffin], 30, 8.64),
    //   ).toThrow("Insufficient funds.");
    // });
  });
});
