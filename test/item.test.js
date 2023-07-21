const Item = require("../lib/item");

describe("Item class", () => {
  let fixedDiscount;
  let percentageDiscount;

  beforeEach(() => {
    fixedDiscount = { type: "fixed", value: 2 };
    percentageDiscount = { type: "percentage", value: 5 };
  });

  it("initializes with a name and price", () => {
    const item = new Item("Muffin", 20);
    expect(item.name).toEqual("Muffin");
    expect(item.price).toEqual(20);
    expect(item.discount).toEqual(null);
  });

  it("fails to initialize with invalid data type for price", () => {
    expect(() => new Item("Muffin", [])).toThrow("Invalid data.");
  });

  it("fails to initialize with invalid data type for name", () => {
    expect(() => new Item(false, 20)).toThrow("Invalid data.");
  });

  it("can be added a discount", () => {
    const item = new Item("Muffin", 20);
    item.discount = { type: "fixed", percentage: 2 };
    expect(item.discount).toEqual({ type: "fixed", percentage: 2 });
  });

  it("applies a fixed discount and returns discounted price", () => {
    const item = new Item("Muffin", 20, fixedDiscount);
    expect(item.applyDiscount()).toEqual(18);
  });

  it("applies a percentage discount and returns discounted price", () => {
    const item = new Item("Muffin", 20, percentageDiscount);
    expect(item.applyDiscount()).toEqual(19);
  });

  it("does not apply any discount if there are none specified", () => {
    const item = new Item("Muffin", 20);
    expect(item.applyDiscount()).toEqual(20);
  });
});
