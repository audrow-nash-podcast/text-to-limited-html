import { useSignal } from "@preact/signals";
import TextInput from "../islands/TextInput.tsx";
import LimitedHtmlDisplay from "../islands/LimitedHtmlDisplay.tsx";

export default function Home() {
  const inputText = useSignal("");

  return (
    <div class="font-sans text-gray-900 flex flex-col h-screen">
      <h1 class="text-2xl font-bold text-center my-6">Text to Limited HTML Converter</h1>
      <div class="flex flex-col md:flex-row flex-grow overflow-hidden">
        <div class="w-full md:w-1/2 p-4 h-[calc(50vh-4rem)] md:h-auto">
          <TextInput
            value={inputText}
            placeholder="Enter text here"
            className="w-full h-full"
          />
        </div>
        <div class="w-full md:w-1/2 p-4 h-[calc(50vh-4rem)] md:h-auto">
          <LimitedHtmlDisplay
            text={inputText}
            className="w-full h-full"
            placeholder="Converted text will be here"
          />
        </div>
      </div>
      <footer class="bg-gray-100 py-4 text-center text-sm text-gray-600">
        <p>Made by Audrow Nash for the Audrow Nash Podcast</p>
        <a
          href="https://github.com/audrow/text-to-limited-html"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 underline"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}