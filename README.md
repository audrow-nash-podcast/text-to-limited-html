# Limited HTML Converter

[![Deno CI](https://github.com/audrow-nash-podcast/text-to-limited-html/actions/workflows/ci.yaml/badge.svg)](https://github.com/audrow-nash-podcast/text-to-limited-html/actions/workflows/ci.yaml)

## Motivation

This project provides a simple web application that converts plain text with
basic formatting into limited HTML. It's designed to offer a safe way to allow
user-generated content with some formatting options without exposing the system
to the risks associated with full HTML input.

## Features

- Text input area for entering content
- Real-time conversion of input text to limited HTML
- Display area showing the converted HTML output
- Copy to clipboard functionality for the converted HTML
- URL parameter support for sharing converted text
- API endpoint for programmatic conversion

## How It Works

The application uses the Fresh framework with Deno and includes the following
conversion process:

- Escaping HTML characters to prevent XSS attacks
- Converting newlines to `<br>` tags
- Converting text between asterisks (*) to bold using `<strong>` tags
- Converting text between underscores (_) to italic using `<em>` tags

## Getting Started

### Prerequisites

Make sure you have Deno installed. If not, you can install it from:
https://deno.land/manual/getting_started/installation

### Running the Project Locally

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Start the project by running:

   ```
   deno task start
   ```

   This command will watch the project directory and restart as necessary.

4. Open your browser and visit `http://localhost:8000` to see the application
   running.

## Development

The project uses Fresh, a next-generation web framework for Deno. It leverages
Preact for the UI components and Tailwind CSS for styling.

Key files:

- `routes/index.tsx`: Main page component
- `islands/TextInput.tsx`: Interactive text input component
- `islands/LimitedHtmlDisplay.tsx`: Component to display converted HTML
- `src/convertLimitedHtml.ts`: Core functions for text to HTML conversion and
  vice versa

To run tests:

```
deno task test
```

## API Usage

You can use the API endpoint to convert text programmatically:

POST to `/api/convert` with a JSON body:

```json
{
  "text": "Your text here"
}
```

The response will contain the converted HTML.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for
details.
