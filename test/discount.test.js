const Discount = require("../lib/discount");

class MuffinDiscount extends Discount {
  constructor() {
    super("percentage", 10, "10% off from muffins if you buy three");
  }
  checkApplicable = (basket) => {
    const filteredList = basket.filter((item) => item.name === "Muffin");
    if (filteredList.length > 2) {
      return true;
    } else return false;
  };
}

describe("Discount class", () => {
  it("initializes with type, value and description constructors", () => {
    const discount = new Discount("fixed", 2, "2 dollars off");
    expect(discount.type).toEqual("fixed");
    expect(discount.value).toEqual(2);
    expect(discount.description).toEqual("2 dollars off");
  });

  it("throws an error if discount type is neither fixed nor percentage", () => {
    expect(() => new Discount("amount", 5)).toThrow(
      "Type must be percentage or fixed!",
    );
  });

  it("has a discount condition which return true by default", () => {
    const discount = new Discount("fixed", 3);
    expect(discount.checkApplicable()).toEqual(true);
  });
});

describe("Discount instances", () => {
  test("creates a specific condition for the discount to be applied", () => {
    const basket = [{ name: "Muffin" }, { name: "Muffin" }, { name: "Muffin" }];
    const muffinDiscount = new MuffinDiscount();
    expect(muffinDiscount.type).toEqual("percentage");
    expect(muffinDiscount.value).toEqual(10);
    expect(muffinDiscount.description).toEqual(
      "10% off from muffins if you buy three",
    );
    expect(muffinDiscount.checkApplicable(basket)).toEqual(true);
  });

  test("returns false if the discount condition is not met", () => {
    const basket = [{ name: "Coffee" }, { name: "Muffin" }, { name: "Muffin" }];
    const muffinDiscount = new MuffinDiscount();
    expect(muffinDiscount.checkApplicable(basket)).toEqual(false);
  });
});
