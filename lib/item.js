class Item {
  constructor(name, price, discount = null) {
    if (typeof name !== "string" || typeof price !== "number") {
      throw new Error("Invalid data.");
    }
    this.name = name;
    this.price = price;
    this.discount = discount;
  }
}

module.exports = Item;
