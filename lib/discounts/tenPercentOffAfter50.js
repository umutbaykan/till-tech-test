const Discount = require("../discount");

class tenPercentOffAfter50 extends Discount {
  constructor() {
    super(
      "percentage",
      10,
      "10 Percent off if your basket cost is more than 50",
    );
  }

  checkApplicable = (basket, totals) => {
    if (totals.discountTotal > 50) {
      return true;
    }
  };
}

module.exports = tenPercentOffAfter50;
