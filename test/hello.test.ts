const testFunc = () => `Hello`;

describe(`Testing Jest`, () => {
  test("Testing Hello Function", () => {
    const result = testFunc();

    expect(result).toBe("Hello");
  });
});
