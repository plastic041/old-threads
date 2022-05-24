import { makeTitle } from "~/lib/title";

describe("makeTitle", () => {
  it("should return a title of the given thread", () => {
    const thread = {
      id: "RA4eesoKZMo34LwhCG60A",
      title: "some kind of long title I think",
      posts: [],
    };
    expect(makeTitle(thread)).toBe("some-kind-of-long-ti_RA4eesoK");
  });
});
