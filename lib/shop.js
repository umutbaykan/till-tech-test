class Shop {
  constructor(
    availableItems = {},
    basket = [],
    till,
    printer,
    discounts = [],
    taxRate,
    currency,
    shopTag,
  ) {
    (this.availableItems = availableItems), (this.basket = basket);
    this.till = till;
    this.printer = printer;
    this.discounts = discounts;
    (this.taxRate = taxRate),
      (this.currency = currency),
      (this.shopTag = shopTag);
  }
}

module.exports = Shop;
