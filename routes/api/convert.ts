import { FreshContext } from "$fresh/server.ts";
import { convertToLimitedHtml } from "../../src/convertLimitedHtml.ts";

export const handler = async (
  req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const text = body.text;

      if (typeof text !== "string") {
        return new Response(
          JSON.stringify({
            error: "Invalid 'text' argument. Must be a string.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const convertedText = convertToLimitedHtml(text);

      return new Response(JSON.stringify({ convertedText }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (_error) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON or conversion error" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } else {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
