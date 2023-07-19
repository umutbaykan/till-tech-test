const Item = require('../lib/item');

describe("Item class", () => {
  it("initializes with a name and price", () => {
    item = new Item("Muffin", 20)
    expect(item.name).toEqual("Muffin")
    expect(item.price).toEqual(20)
  })
})