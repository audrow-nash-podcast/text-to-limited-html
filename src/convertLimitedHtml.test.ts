import { assertEquals } from "@std/assert";
import {
  convertFromLimitedHtml,
  convertToLimitedHtml,
} from "./convertLimitedHtml.ts";

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

  await t.step("adds parentheses to time codes", () => {
    const input = "0:00 Start\n1:36 Introduction";
    const expected = "(0:00) Start<br>(1:36) Introduction";
    assertEquals(convertToLimitedHtml(input), expected);
  });

  await t.step("handles longer time codes", () => {
    const input = "42:33 Section One\n1:02:06 Section Two";
    const expected = "(42:33) Section One<br>(1:02:06) Section Two";
    assertEquals(convertToLimitedHtml(input), expected);
  });

  await t.step("handles multiple time codes in one string", () => {
    const input = "0:00 Start\n1:36 Middle\n42:33 End";
    const expected = "(0:00) Start<br>(1:36) Middle<br>(42:33) End";
    assertEquals(convertToLimitedHtml(input), expected);
  });
});

Deno.test("convertFromLimitedHtml", async (t) => {
  await t.step("converts HTML entities back to characters", () => {
    const input = "&lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;";
    const expected = "<script>alert('XSS')</script>";
    assertEquals(convertFromLimitedHtml(input), expected);
  });

  await t.step("converts <br> tags back to newlines", () => {
    const input = "Line 1<br>Line 2";
    const expected = "Line 1\nLine 2";
    assertEquals(convertFromLimitedHtml(input), expected);
  });

  await t.step("converts <strong> tags back to asterisks", () => {
    const input = "This is <strong>bold</strong> text";
    const expected = "This is *bold* text";
    assertEquals(convertFromLimitedHtml(input), expected);
  });

  await t.step("converts <em> tags back to underscores", () => {
    const input = "This is <em>italic</em> text";
    const expected = "This is _italic_ text";
    assertEquals(convertFromLimitedHtml(input), expected);
  });

  await t.step("handles multiple formatting in one string", () => {
    const input =
      "Hello <strong>bold</strong> and <em>italic</em> and<br>new line";
    const expected = "Hello *bold* and _italic_ and\nnew line";
    assertEquals(convertFromLimitedHtml(input), expected);
  });

  await t.step("round trip conversion", () => {
    const original =
      "Hello *bold* and _italic_ and\nnew line with <special> characters";
    const limitedHtml = convertToLimitedHtml(original);
    const roundTrip = convertFromLimitedHtml(limitedHtml);
    assertEquals(roundTrip, original);
  });
});
