import { assertEquals } from "@std/assert";
import { convertToLimitedHtml } from "./convertToLimitedHtml.ts";

Deno.test("convertToLimitedHtml", async (t) => {
  await t.step("escapes HTML characters", () => {
    const input = "<script>alert('XSS')</script>";
    const expected = "&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;";
    assertEquals(convertToLimitedHtml(input), expected);
  });

  await t.step("replaces newlines with <br> tags", () => {
    const input = "Line 1\nLine 2";
    const expected = "Line 1<br>Line 2";
    assertEquals(convertToLimitedHtml(input), expected);
  });

  await t.step("bolds text between asterisks", () => {
    const input = "This is *bold* text";
    const expected = "This is <strong>bold</strong> text";
    assertEquals(convertToLimitedHtml(input), expected);
  });

  await t.step("italicizes text between underscores", () => {
    const input = "This is _italic_ text";
    const expected = "This is <em>italic</em> text";
    assertEquals(convertToLimitedHtml(input), expected);
  });

  await t.step("handles multiple formatting in one string", () => {
    const input = "Hello *bold* and _italic_ and\nnew line";
    const expected =
      "Hello <strong>bold</strong> and <em>italic</em> and<br>new line";
    assertEquals(convertToLimitedHtml(input), expected);
  });
});
