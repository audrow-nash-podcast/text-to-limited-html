// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $LimitedHtmlDisplay from "./islands/LimitedHtmlDisplay.tsx";
import * as $TextInput from "./islands/TextInput.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/LimitedHtmlDisplay.tsx": $LimitedHtmlDisplay,
    "./islands/TextInput.tsx": $TextInput,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
