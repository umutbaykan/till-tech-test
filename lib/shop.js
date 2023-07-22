const getSymbolFromCurrency = require("currency-symbol-map");

class Shop {
  constructor(
    availableItems = {},
    basket = [],
    till,
    item,
    printer,
    discount,
    discounts = [],
    taxRate = 15,
    currency = "$",
    shopTag,
  ) {
    (this.availableItems = availableItems), (this.basket = basket);
    this.till = till;
    this.item = item;
    this.printer = printer;
    this.discount = discount;
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

  setTaxRate = (taxRate) => {
    if (typeof taxRate !== "number") {
      throw new Error("Input must be numeric");
    }
    this.taxRate = taxRate;
  };

  setCurrency = (currency) => {
    const result = getSymbolFromCurrency(currency);
    if (result) {
      this.currency = result;
    } else {
      throw new Error("Invalid input");
    }
  };

  addOrder = (order) => {
    if (this.availableItems[order]) {
      this.basket.push(this.availableItems[order]);
    } else {
      throw new Error("Order invalid.");
    }
  };

  addItemDiscount = (
    itemName,
    discountType,
    discountValue,
    discountDescription,
  ) => {
    let hasChanged = false;
    for (const [key, value] of Object.entries(this.availableItems)) {
      if (key.toLowerCase().includes(itemName.toLowerCase())) {
        const discount = new this.discount(
          discountType,
          discountValue,
          discountDescription,
        );
        value.discount = discount;
        hasChanged = true;
      }
    }
    if (!hasChanged) {
      throw new Error("Name does not match any item.");
    }
  };

  removeItemDiscount = (itemName) => {
    let isRemoved = false;
    for (const [key, value] of Object.entries(this.availableItems)) {
      if (key.toLowerCase().includes(itemName.toLowerCase())) {
        value.discount = null;
        isRemoved = true;
      }
    }
    if (!isRemoved) {
      throw new Error("Can't remove discount, name mismatch.");
    }
  };
}

module.exports = Shop;
