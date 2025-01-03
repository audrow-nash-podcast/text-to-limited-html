import { escape, unescape } from "npm:html-escaper";

export function convertToLimitedHtml(input: string): string {
  // Escape HTML characters
  let html = escape(input);

  // Add parentheses around time codes (M:SS, MM:SS, H:MM:SS)
  html = html.replace(/^(\d+:\d+(?::\d+)?)/gm, "($1)");

  // Replace newlines with <br> tags
  html = html.replace(/\n/g, "<br>");

  // Bold text between asterisks
  html = html.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

  // Italic text between underscores
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  return html;
}

export function convertFromLimitedHtml(html: string): string {
  // Unescape HTML characters
  let output = unescape(html);

  // Replace <br> tags with newlines
  output = output.replace(/<br\s*\/?>/g, "\n");

  // Convert <strong> tags back to asterisks
  output = output.replace(/<strong>(.*?)<\/strong>/g, "*$1*");

  // Convert <em> tags back to underscores
  output = output.replace(/<em>(.*?)<\/em>/g, "_$1_");

  // Remove parentheses from time codes
  output = output.replace(/^(\d+:\d+(?::\d+)?)/g, "($1)");

  return output;
}
