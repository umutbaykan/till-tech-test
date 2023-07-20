class Printer {
  static headers = (shopTag, date = new Date()) => {
    return [
      `Thank you for shopping at ${shopTag.shopName}`,
      `Address: ${shopTag.address}`,
      `Phone: ${shopTag.phone}`,
      `Order checkout: ${date.toString().slice(0, 24)}`,
    ];
  };
}

module.exports = Printer;
