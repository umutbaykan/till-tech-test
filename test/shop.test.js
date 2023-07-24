const Shop = require("../lib/shop");
const Item = require("..//lib/item");
const Till = require("../lib/till");
const Printer = require("../lib/printer");
const Discount = require("../lib/discount");
const tenPercentOffAfter50 = require("../lib/discounts/tenPercentOffAfter50");
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

  let shop;

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
    shop = new Shop({}, [], Till, Item, Printer, Discount, [], 8.64, "$");
    shop.updateShopDataFromJson(jsonData);
  });

  test("initializes", () => {
    const shop = new Shop(
      {},
      basket,
      Till,
      Item,
      Printer,
      Discount,
      [percentage5Discount],
      18,
      "£",
      shopTag,
    );
    expect(shop.basket).toEqual(basket);
    expect(shop.till).toEqual(Till);
    expect(shop.item).toEqual(Item);
    expect(shop.printer).toEqual(Printer);
    expect(shop.discount).toEqual(Discount);
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
    expect(Object.keys(shop.availableItems).length).toEqual(15);
    const itemObject = shop.availableItems["Cafe Latte"];
    expect(itemObject instanceof Item).toEqual(true);
    expect(itemObject.name).toEqual("Cafe Latte");
    expect(itemObject.price).toEqual(4.75);
    expect(itemObject.discount).toEqual(null);
  });

  test("updateShopDataFromJson updates the shop tag and available item list", () => {
    expect(shop.shopTag).toEqual(shopTag);
    expect(Object.keys(shop.availableItems).length).toEqual(15);
    const chocMudcake = shop.availableItems["Choc Mudcake"];
    expect(chocMudcake.name).toEqual("Choc Mudcake");
    expect(chocMudcake.price).toEqual(6.4);
    expect(chocMudcake.discount).toEqual(null);
  });

  test("setTaxRate method sets the tax rate to given input", () => {
    expect(shop.taxRate).toEqual(8.64);
    shop.setTaxRate(18);
    expect(shop.taxRate).toEqual(18);
  });

  test("throws an error if tax rate input is not numeric", () => {
    expect(() => shop.setTaxRate("15")).toThrow("Input must be numeric");
  });

  test("setCurrency method sets the currency symbol based on input", () => {
    expect(shop.currency).toEqual("$");
    shop.setCurrency("GBP");
    expect(shop.currency).toEqual("£");
  });

  test("throws an error if currency input is not valid", () => {
    expect(() => shop.setCurrency("15")).toThrow("Invalid input");
  });

  describe("addOrder method", () => {
    test("adds the order to the basket if the order is valid", () => {
      shop.addOrder("Cafe Latte", 1);
      expect(shop.basket.length).toEqual(1);
      expect(shop.basket[0].name).toEqual("Cafe Latte");
      expect(shop.basket[0] instanceof Item).toEqual(true);
    });

    test("can add multiple orders at once", () => {
      shop.addOrder("Cafe Latte", 3);
      expect(shop.basket.length).toEqual(3);
      expect(shop.basket[0].name).toEqual("Cafe Latte");
      expect(shop.basket[0] instanceof Item).toEqual(true);
    });

    test("throws an error if the order does not exist in available items", () => {
      expect(() => shop.addOrder("Cookie", 1)).toThrow("Order invalid.");
      expect(shop.basket.length).toEqual(0);
    });

    describe("addItemDiscount", () => {
      test("adds a discount instance to an item", () => {
        const cafeLatte = shop.availableItems["Cafe Latte"];
        expect(cafeLatte.discount).toEqual(null);
        shop.addItemDiscount(
          "Cafe Latte",
          "fixed",
          3,
          "3 dollars off cafe latte",
        );
        expect(cafeLatte.discount instanceof Discount).toEqual(true);
        expect(cafeLatte.discount.type).toEqual("fixed");
        expect(cafeLatte.discount.value).toEqual(3);
        expect(cafeLatte.discount.description).toEqual(
          "3 dollars off cafe latte",
        );
      });

      test("adds discount to multiple items sharing same substring", () => {
        shop.addItemDiscount(
          "espresso",
          "percentage",
          10,
          "10% off all espressos",
        );
        const singleEspresso = shop.availableItems["Single Espresso"];
        const doubleEspresso = shop.availableItems["Double Espresso"];
        expect(singleEspresso.discount instanceof Discount).toEqual(true);
        expect(doubleEspresso.discount instanceof Discount).toEqual(true);
      });

      test("throws an error if the name does not match any item", () => {
        expect(() =>
          shop.addItemDiscount("Something", "fixed", 10, "10 dollars off"),
        ).toThrow("Name does not match any item.");
      });
    });

    describe("removeItemDiscount method", () => {
      test("removes the discount from an item", () => {
        shop.addItemDiscount(
          "latte",
          "percentage",
          10,
          "10% off all espressos",
        );
        shop.removeItemDiscount("latte");
        expect(shop.availableItems["Cafe Latte"].discount).toEqual(null);
      });

      test("throws an error if the item name does not match anything in availableItems", () => {
        expect(() => shop.removeItemDiscount("cookie")).toThrow(
          "Can't remove discount, name mismatch.",
        );
      });
    });

    describe("addBasketDiscount method", () => {
      test("adds a basket discount that is applied on meeting the condition", () => {
        const tenOff = new tenPercentOffAfter50();
        shop.addBasketDiscount(tenOff);
        const basketDiscount = shop.discounts[0];
        expect(basketDiscount instanceof Discount).toEqual(true);
        expect(basketDiscount.description).toEqual(
          "10 Percent off if your basket cost is more than 50",
        );
        expect(basketDiscount.value).toEqual(10);
        expect(basketDiscount.type).toEqual("percentage");
      });

      describe("removeBasketDiscount method", () => {
        test("removes a basket discount that is already on the shop discounts", () => {
          expect(shop.discounts.length).toEqual(0);
          shop.addBasketDiscount(new tenPercentOffAfter50());
          expect(shop.discounts.length).toEqual(1);
          shop.removeBasketDiscount(
            "10 Percent off if your basket cost is more than 50",
          );
          expect(shop.discounts.length).toEqual(0);
        });

        test("throws an error if discount description does not match", () => {
          expect(() => shop.removeBasketDiscount("some discount")).toThrow(
            "Can't remove discount, name mismatch.",
          );
        });
      });
    });
  });
});
