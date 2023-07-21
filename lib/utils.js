const getDiscountPrice = (price, discount) => {
  if (discount === null) {
    return price;
  } else if (discount.type === "fixed") {
    return price - discount.value;
  } else if (discount.type === "percentage") {
    return (price * (100 - discount.value)) / 100;
  }
};

module.exports = getDiscountPrice