class Till {
  static getDiscountPrice = (price, discount) => {
    if (discount === null) {
      return price;
    } else if (discount.type === "fixed") {
      return price - discount.value;
    } else if (discount.type === "percentage") {
      return (price * (100 - discount.value)) / 100;
    }
  };

  static calculateTotal = (basket) => {
    let grossTotal = 0;
    let discountTotal = 0;
    basket.map((item) => {
      grossTotal += item.price;
      discountTotal += this.getDiscountPrice(item.price, item.discount);
    });
    return { grossTotal: grossTotal, discountTotal: discountTotal };
  };

  static calculateTax = (grossTotal, taxRatio) => {
    return Math.round((grossTotal / taxRatio) * 100) / 100;
  };

  static calculateChange = (amountPaid, cost) => {
    const change = amountPaid - cost;
    if (change < 0) {
      throw new Error("Insufficient funds.");
    }
    return Math.round(change * 100) / 100;
  };
}

module.exports = Till;
