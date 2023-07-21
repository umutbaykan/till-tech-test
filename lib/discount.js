class Discount {
  constructor(type, value) {
    if (type !== "percentage" && type !== "fixed") {
      throw new Error("Type must be percentage or fixed!");
    }
    this.type = type;
    this.value = value;
  }
}

module.exports = Discount;
