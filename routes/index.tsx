import { useSignal } from "@preact/signals";
import TextInput from "../islands/TextInput.tsx";
import LimitedHtmlDisplay from "../islands/LimitedHtmlDisplay.tsx";

export default function Home() {
  const inputText = useSignal("");

  return (
    <div class="font-sans text-gray-900 flex flex-col min-h-screen">
      <main class="flex-grow">
        <h1 class="text-2xl font-bold text-center my-6">
          Text to Limited HTML Converter
        </h1>
        <div class="flex flex-col md:flex-row mx-4 gap-4">
          <TextInput
            value={inputText}
            placeholder="Enter text here"
            className="flex-1 h-[calc(100vh-12rem)]"
          />
          <LimitedHtmlDisplay
            text={inputText}
            className="flex-1 h-[calc(100vh-12rem)]"
            placeholder="Converted text will be here"
          />
        </div>
      </main>
      <footer class="bg-gray-100 py-4 text-center text-sm text-gray-600">
        <p>
          Made by Audrow Nash for the{" "}
          <a
            href="https://www.audrownashpodcast.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-800 underline"
          >
            Audrow Nash Podcast
          </a>
        </p>
        <a
          href="https://github.com/audrow-nash-podcast/text-to-limited-html"
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
