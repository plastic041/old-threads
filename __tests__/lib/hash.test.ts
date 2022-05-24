import { hash } from "~/lib/hash";

describe("hash", () => {
  it("should return a hash of the given string", () => {
    expect(hash("test", 10)).toBe("098f6bcd46");
  });
});
