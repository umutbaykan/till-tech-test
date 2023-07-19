const Item = require("../lib/item");

describe("Item class", () => {
  it("initializes with a name and price", () => {
    const item = new Item("Muffin", 20);
    expect(item.name).toEqual("Muffin");
    expect(item.price).toEqual(20);
  });

  it("fails to initialize with invalid data type for price", () => {
    expect(() => new Item("Muffin", [])).toThrow("Invalid data.");
  });

  it("fails to initialize with invalid data type for name", () => {
    expect(() => new Item(false, 20)).toThrow("Invalid data.");
  });
});
