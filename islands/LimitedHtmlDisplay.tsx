import { Signal, useSignal } from "@preact/signals";
import { convertToLimitedHtml } from "../src/convertToLimitedHtml.ts";

interface LimitedTextDisplayProps {
  text: Signal<string>;
  className?: string;
  placeholder?: string;
}

export default function LimitedHtmlDisplay({
  text,
  className = "",
  placeholder = ""
}: LimitedTextDisplayProps) {
  const showToast = useSignal(false);

  const copyToClipboard = () => {
    const convertedText = convertToLimitedHtml(text.value);
    navigator.clipboard.writeText(convertedText).then(() => {
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    });
  };

  return (
    <div class={`relative w-full h-full ${className}`}>
      <div class="absolute top-2 right-2 flex items-center">
        {showToast.value && (
          <div class="mr-2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm">
            Copied!
          </div>
        )}
        <button
          onClick={copyToClipboard}
          class="p-1 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          title="Copy to clipboard"
          disabled={!text.value.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
      </div>

      <div
        class={`w-full h-full p-3 border border-gray-300 rounded-md overflow-auto bg-gray-50 ${className}`}
      >
        {text.value.trim() ? (
          convertToLimitedHtml(text.value)
        ) : (
          <p class="text-gray-400 italic">{placeholder}</p>
        )}
      </div>
    </div>
  );
}