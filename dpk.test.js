const crypto = require("crypto");
const { deterministicPartitionKey, generateHashFromValue } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns string partion key from event input when string key in input", () => {
    const event = { partitionKey: "testKey" }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });

  it("Returns string partion key from event input when non-string key in input", () => {
    const event = { partitionKey: [1, 2, 3, 4] }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });

  it("Generates and returns partion key from event input when key not in input", () => {
    const event = { random: 'random' }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(generateHashFromValue(event));
    expect(typeof trivialKey).toBe('string');
  });
});
