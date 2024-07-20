import { escape } from "npm:html-escaper";

export function convertToLimitedHtml(input: string): string {
  // Escape HTML characters
  let html = escape(input);

  // Replace newlines with <br> tags
  html = html.replace(/\n/g, "<br>");

  // Bold text between asterisks
  html = html.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

  // Italic text between underscores
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  return html;
}
