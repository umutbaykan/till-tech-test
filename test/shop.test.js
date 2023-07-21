const Shop = require("../lib/shop");
const Item = require("..//lib/item");
const Till = require("../lib/till");
const Printer = require("../lib/printer");
const Discount = require("../lib/discount");

describe("Shop class", () => {
  let coffee;
  let muffin;
  let tiramisu;

  let fixed2Discount;
  let percentage10Discount;
  let percentage5Discount;

  let basket;

  let shopTag;

  beforeEach(() => {
    fixed2Discount = new Discount("fixed", 2, "2 dollars off coffee");
    percentage10Discount = new Discount(
      "percentage",
      10,
      "10 percent off muffin",
    );
    percentage5Discount = class BasketDiscount extends Discount {
      constructor() {
        super("percentage", 5, "5 percent off if cost > 50");
      }

      checkApplicable = (totals) => {
        if (totals.discountTotal > 50) {
          return true;
        } else {
          return false;
        }
      };
    };
    coffee = new Item("Coffee", 10, fixed2Discount);
    muffin = new Item("Muffin", 20, percentage10Discount);
    tiramisu = new Item("Tiramisu", 35);
    basket = [coffee, coffee, muffin, tiramisu];
    shopTag = {
      shopName: "The Coffee Connection",
      address: "123 Lakeside Way",
      phone: "16503600708",
    };
  });
  test("initializes", () => {
    const shop = new Shop(
      {},
      basket,
      Till,
      Printer,
      [percentage5Discount],
      18,
      "£",
      shopTag,
    );
    expect(shop.basket).toEqual(basket);
    expect(shop.till).toEqual(Till);
    expect(shop.printer).toEqual(Printer);
    expect(shop.discounts).toEqual([percentage5Discount]);
    expect(shop.taxRate).toEqual(18);
    expect(shop.currency).toEqual("£");
    expect(shop.shopTag).toEqual(shopTag);
  });
});
