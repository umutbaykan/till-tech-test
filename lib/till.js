class Till {
  static calculateRawTotal = (basket) => {
    let total = 0;
    basket.map((item) => {
      total += item.price;
    });
    return total;
  };

  // static calculateDiscount = (basket) => {
  //   let total = 0;
  //   basket.map((item) => {

  //   })
  // }

  static calculateTax = (basket, taxRatio) => {
    const taxAmount = this.calculateRawTotal(basket);
    return Math.round((taxAmount / taxRatio) * 100) / 100;
  };

  static calculateChange = (basket, amount, taxRatio) => {
    const change =
      amount -
      this.calculateRawTotal(basket) -
      this.calculateTax(basket, taxRatio);
    if (change < 0) {
      throw new Error("Insufficient funds.");
    }
    return Math.round(change * 100) / 100;
  };
}

module.exports = Till;
