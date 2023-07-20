const Printer = require("../lib/printer");

describe("Printer class", () => {
  let mock_coffee;
  let mock_muffin;
  let basket;
  let tillObject;
  let shopTag;

  beforeEach(() => {
    shopTag = {
      shopName: "The Coffee Connection",
      address: "123 Lakeside Way",
      phone: "16503600708",
    };
    mock_muffin = { name: "Muffin", price: 20 };
    mock_coffee = { name: "Coffee", price: 10.45 };
    basket = [mock_coffee, mock_coffee, mock_muffin];
    tillObject = {
      basketTotal: 42.35,
      tax: 10.56,
      change: 4.21,
      discount: 5,
      cash: 55,
      currency: "$",
      grandTotal: 50.79,
    };
  });

  it("prints the headers", () => {
    const fakeDate = new Date(2023, 6, 20, 12, 30, 0, 0);

    expect(Printer.headers(shopTag, fakeDate)).toEqual([
      "Thank you for shopping at The Coffee Connection",
      "Address: 123 Lakeside Way",
      "Phone: 16503600708",
      "Order checkout: Thu Jul 20 2023 12:30:00",
    ]);
  });

  it("prints the headers on current date", () => {
    const currentDate = new Date().toString().slice(0, 24)
    expect(Printer.headers(shopTag)).toEqual([
      "Thank you for shopping at The Coffee Connection",
      "Address: 123 Lakeside Way",
      "Phone: 16503600708",
      `Order checkout: ${currentDate}`,
    ]);
  })

  it("prints customer names, order items, their quantities, and their regular prices", () => {
    expect(Printer.basketList(basket)).toEqual([
      "Coffee 2 x 10.45",
      "Muffin 1 x 20",
    ]);
  });

  it("prints all the payment calculations of the order", () => {
    expect(Printer.receipt(tillObject)).toEqual([
      "Discount: 5% from $42.35",
      "Tax: $10.56",
      "Total: $50.79",
      "Cash: $55",
      "Change: $4.21",
    ]);
  });
});
