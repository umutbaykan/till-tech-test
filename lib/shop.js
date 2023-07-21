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

  updateShopDataFromJson = (jsonFile) => {
    const { shopName, address, phone, prices } = jsonFile;
  };

  updateShopTag = (shopName, address, phone) => {
    this.shopTag = { shopName: shopName, address: address, phone: phone };
  };
}

module.exports = Shop;
