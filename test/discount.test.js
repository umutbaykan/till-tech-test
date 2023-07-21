const Discount = require("../lib/discount");

describe("Discount class", () => {
  it("initializes with type, value and description constructors", () => {
    const discount = new Discount("fixed", 2, "2 dollars off");
    expect(discount.type).toEqual("fixed");
    expect(discount.value).toEqual(2);
    expect(discount.description).toEqual("2 dollars off")
  });

  it("throws an error if discount type is neither fixed nor percentage", () => {
    expect(() => new Discount("amount", 5)).toThrow(
      "Type must be percentage or fixed!",
    );
  });

  it("has a discount condition which return true by default", () => {
    const discount = new Discount("fixed", 3)
    expect(discount.discountCondition()).toEqual(true)
  })
});
