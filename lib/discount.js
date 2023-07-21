class Discount {
  constructor(type, value, description) {
    if (type !== "percentage" && type !== "fixed") {
      throw new Error("Type must be percentage or fixed!");
    }
    this.type = type;
    this.value = value;
    this.description = description;
  }

  discountCondition = () => {
    return true
  }
}

module.exports = Discount;
