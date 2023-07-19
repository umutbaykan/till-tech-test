class Item {
  constructor(name, price) {
    if (typeof name !== "string" || typeof price !== "number") {
      throw new Error("Invalid data.");
    }
    this.name = name;
    this.price = price;
  }
}

module.exports = Item;
