import { Signal } from "@preact/signals";
import { JSX } from "preact";

interface TextInputProps {
  value: Signal<string>;
  placeholder?: string;
  className?: string;
}

export default function TextInput(
  { value, placeholder = "", className = "" }: TextInputProps,
) {
  const handleChange = (e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    value.value = (e.target as HTMLTextAreaElement).value;
  };

  const handlePaste = async () => {
    try {
      value.value = await navigator.clipboard.readText();
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <div class={`relative ${className}`}>
      <textarea
        value={value}
        onInput={handleChange}
        placeholder={placeholder}
        class="w-full h-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <button
        onClick={handlePaste}
        class="absolute top-2 right-2 p-1 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
        aria-label="Paste from clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      </button>
    </div>
  );
}
