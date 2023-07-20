class Till {
  constructor(basket = [], discounts = {}, taxRatio = 8.64) {
    this.basket = basket;
    this.discounts = discounts;
    this.taxRatio = taxRatio;
  }

  calculateTotal = () => {
    let total = 0;
    this.basket.map((item) => {
      total += item.price;
    });
    return total;
  };

  calculateTax = () => {
    const taxAmount = this.calculateTotal();
    return Math.round((taxAmount / this.taxRatio) * 100) / 100;
  };
}

module.exports = Till;
