const Discount = require("../lib/discount");

describe("Discount class", () => {
  it("initializes with type and value constructors", () => {
    const discount = new Discount("fixed", 2);
    expect(discount.type).toEqual("fixed");
    expect(discount.value).toEqual(2);
  });

  it("throws an error if discount type is neither fixed nor percentage", () => {
    expect(() => new Discount("amount", 5)).toThrow(
      "Type must be percentage or fixed!",
    );
  });
});
