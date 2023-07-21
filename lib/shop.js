class Shop {
  constructor(
    availableItems = {},
    basket = [],
    till,
    item,
    printer,
    discounts = [],
    taxRate,
    currency,
    shopTag,
  ) {
    (this.availableItems = availableItems), (this.basket = basket);
    this.till = till;
    this.item = item;
    this.printer = printer;
    this.discounts = discounts;
    (this.taxRate = taxRate),
      (this.currency = currency),
      (this.shopTag = shopTag);
  }

  updateShopDataFromJson = (jsonFile) => {
    const { shopName, address, phone, prices } = jsonFile;
    this.updateShopTag(shopName, address, phone);
    this.updateAvailableItems(prices);
  };

  updateShopTag = (shopName, address, phone) => {
    this.shopTag = { shopName: shopName, address: address, phone: phone };
  };

  updateAvailableItems = (itemJsonData) => {
    const availableItems = {};
    Object.keys(itemJsonData[0]).map((name) => {
      const price = itemJsonData[0][name];
      const item = new this.item(name, price);
      availableItems[name] = item;
    });
    this.availableItems = availableItems;
  };
}

module.exports = Shop;
