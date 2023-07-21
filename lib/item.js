class Item {
  constructor(name, price, discount = null) {
    if (typeof name !== "string" || typeof price !== "number") {
      throw new Error("Invalid data.");
    }
    this.name = name;
    this.price = price;
    this.discount = discount;
  }

  applyDiscount = () => {
    if (this.discount === null) {
      return this.price;
    } else if (this.discount.type === "fixed") {
      return this.price - this.discount.value;
    } else if (this.discount.type === "percentage") {
      return (this.price * (100 - this.discount.value)) / 100;
    }
  };
}

module.exports = Item;
