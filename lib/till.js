class Till {
  constructor(basket = [], discounts = {}) {
    this.basket = basket;
    this.discounts = discounts;
  }

  calculateTotal = () => {
    let total = 0;
    this.basket.map((item) => {
      total += item.price;
    });
    return total;
  };
}

module.exports = Till;
