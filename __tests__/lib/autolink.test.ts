import { autolink } from "~/lib/autolink";
import { escapeHtml } from "~/lib/escapeHtml";

describe("autolink", () => {
  it("should replace >> number with sanitized html", () => {
    const str = ">>10 입니다";
    const sanitized = escapeHtml(str);
    const result = autolink(sanitized, 100);
    const expected = `<a class="number-link" href="#10">&gt;&gt;10</a> 입니다`;
    expect(result).toBe(expected);
  });

  it("should not replace >>number if maxNumber is less than number", () => {
    const str = ">>10 입니다";
    const sanitized = escapeHtml(str);
    const result = autolink(sanitized, 4);
    const expected = `&gt;&gt;10 입니다`;
    expect(result).toBe(expected);
  });

  it("should replace multiple >>number with <a href>", () => {
    const str = ">>10 >>20 입니다";
    const sanitized = escapeHtml(str);
    const result = autolink(sanitized, 100);
    const expected = `<a class="number-link" href="#10">&gt;&gt;10</a> <a class="number-link" href="#20">&gt;&gt;20</a> 입니다`;
    expect(result).toBe(expected);
  });

  it("should replace multiple >>number, but not replace >>number if maxNumber is less than number", () => {
    const str = ">>10 >>20 입니다";
    const sanitized = escapeHtml(str);
    const result = autolink(sanitized, 14);
    const expected = `<a class="number-link" href="#10">&gt;&gt;10</a> &gt;&gt;20 입니다`;
    expect(result).toBe(expected);
  });
});
