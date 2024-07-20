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
    <div class={`relative flex flex-col ${className}`}>
      <div class="absolute top-2 right-2 flex items-center z-10">
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
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>

      <div
        class="flex-grow w-full h-full p-3 border border-gray-300 rounded-md overflow-auto bg-gray-50"
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