const Printer = require("../lib/printer");

describe("Printer class", () => {
  it("prints the headers", () => {
    const shopTag = {
      shopName: "The Coffee Connection",
      address: "123 Lakeside Way",
      phone: "16503600708",
    };

    const fakeDate = new Date(2023, 6, 20, 12, 30, 0, 0);

    expect(Printer.headers(shopTag, fakeDate)).toEqual([
      "Thank you for shopping at The Coffee Connection",
      "Address: 123 Lakeside Way",
      "Phone: 16503600708",
      "Order checkout: Thu Jul 20 2023 12:30:00",
    ]);
  });
});
