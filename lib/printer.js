class Printer {
  static headers = (shopTag, date = new Date()) => {
    return [
      `Thank you for shopping at ${shopTag.shopName}`,
      `Address: ${shopTag.address}`,
      `Phone: ${shopTag.phone}`,
      `Order checkout: ${date.toString().slice(0, 24)}`,
    ];
  };

  static basketList = (basket) => {
    let counts = {};
    let output = [];

    basket.forEach((item) => {
      if (counts[item.name] === undefined) {
        counts[item.name] = { quantity: 1, price: item.price };
      } else {
        counts[item.name]["quantity"] = counts[item.name]["quantity"] + 1;
      }
    });
    for (const item in counts) {
      const { quantity, price } = counts[item];
      output.push(`${item} ${quantity} x ${price}`);
    }
    return output;
  };

  static receipt = (tillObject) => {
    const { discount, tax, basketTotal, grandTotal, cash, change, currency } =
      tillObject;
    return [
      `Discount: ${discount}% from ${currency + basketTotal}`,
      `Tax: ${currency + tax}`,
      `Total: ${currency + grandTotal}`,
      `Cash: ${currency + cash}`,
      `Change: ${currency + change}`,
    ];
  };
}

module.exports = Printer;
