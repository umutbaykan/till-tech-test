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

  static tax = (tillObject) => {
    return `Tax: ${tillObject.currency}${tillObject.tax}`;
  };
}

module.exports = Printer;
