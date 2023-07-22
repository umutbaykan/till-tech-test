const Shop = require("../lib/shop");
const Item = require("..//lib/item");
const Till = require("../lib/till");
const Printer = require("../lib/printer");
const Discount = require("../lib/discount");
const rawJson = require("../samples.json");
const jsonData = rawJson[0];

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
      Item,
      Printer,
      [percentage5Discount],
      18,
      "£",
      shopTag,
    );
    expect(shop.basket).toEqual(basket);
    expect(shop.till).toEqual(Till);
    expect(shop.item).toEqual(Item);
    expect(shop.printer).toEqual(Printer);
    expect(shop.discounts).toEqual([percentage5Discount]);
    expect(shop.taxRate).toEqual(18);
    expect(shop.currency).toEqual("£");
    expect(shop.shopTag).toEqual(shopTag);
  });

  test("updateShopTag updates the shop class properties", () => {
    const shop = new Shop();
    expect(shop.shopTag).toEqual(undefined);
    const { shopName, address, phone } = shopTag;
    shop.updateShopTag(shopName, address, phone);
    expect(shop.shopTag).toEqual(shopTag);
  });

  test("updateAvailableItems creates item instances from json data and sets class availableItems property", () => {
    const shop = new Shop();
    shop.item = Item;
    shop.updateAvailableItems(jsonData.prices);
    expect(Object.keys(shop.availableItems).length).toEqual(15);
    const itemObject = shop.availableItems["Cafe Latte"];
    expect(itemObject instanceof Item).toEqual(true);
    expect(itemObject.name).toEqual("Cafe Latte");
    expect(itemObject.price).toEqual(4.75);
    expect(itemObject.discount).toEqual(null);
  });

  test("updateShopDataFromJson updates the shop tag and available item list", () => {
    const shop = new Shop();
    shop.item = Item;
    shop.updateShopDataFromJson(jsonData);
    expect(shop.shopTag).toEqual(shopTag);
    expect(Object.keys(shop.availableItems).length).toEqual(15);
    const chocMudcake = shop.availableItems["Choc Mudcake"];
    expect(chocMudcake.name).toEqual("Choc Mudcake");
    expect(chocMudcake.price).toEqual(6.4);
    expect(chocMudcake.discount).toEqual(null);
  });

  test("setTaxRate method sets the tax rate to given input", () => {
    const shop = new Shop();
    expect(shop.taxRate).toEqual(15);
    shop.setTaxRate(18);
    expect(shop.taxRate).toEqual(18);
  });

  test("throws an error if tax rate input is not numeric", () => {
    const shop = new Shop();
    expect(() => shop.setTaxRate("15")).toThrow("Input must be numeric");
  });

  test("setCurrency method sets the currency symbol based on input", () => {
    const shop = new Shop();
    expect(shop.currency).toEqual("$");
    shop.setCurrency("GBP");
    expect(shop.currency).toEqual("£");
  });

  test("throws an error if currency input is not valid", () => {
    const shop = new Shop();
    expect(() => shop.setCurrency("15")).toThrow("Invalid input");
  });

  describe("addOrder method", () => {
    test("adds the order to the basket if the order is valid", () => {
      const shop = new Shop();
      shop.item = Item;
      shop.updateShopDataFromJson(jsonData);
      shop.addOrder("Cafe Latte");
      expect(shop.basket.length).toEqual(1);
      expect(shop.basket[0].name).toEqual("Cafe Latte");
      expect(shop.basket[0] instanceof Item).toEqual(true);
    });

    test("throws an error if the order does not exist in available items", () => {
      const shop = new Shop();
      shop.item = Item;
      shop.updateShopDataFromJson(jsonData);
      expect(() => shop.addOrder("Cookie")).toThrow("Order invalid.");
      expect(shop.basket.length).toEqual(0);
    });
  });
});
