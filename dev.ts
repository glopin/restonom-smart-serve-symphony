import { esbuild, http } from "./deps.ts";
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

const port = 8000;

// Build the React application
try {
  console.log("Building React application...");
  const result = await esbuild.build({
    entryPoints: ["./deno-src/main.tsx"],
    bundle: true,
    outfile: "./deno-public/bundle.js",
    platform: "browser",
    format: "esm",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  });
  if (result.errors.length > 0) {
    console.error("Build failed:", result.errors);
    Deno.exit(1);
  }
  console.log("Build successful!");
} catch (error) {
  console.error("esbuild error:", error);
  Deno.exit(1);
} finally {
  esbuild.stop();
}

// Serve static files
console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
http.serve(async (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/") {
    try {
      const content = await Deno.readTextFile("./deno-public/index.html");
      return new Response(content, {
        headers: { "Content-Type": "text/html" },
      });
    } catch (e) {
      console.error("Error serving index.html:", e);
      return new Response("Not Found", { status: 404 });
    }
  }

  if (url.pathname === "/bundle.js") {
     try {
      const content = await Deno.readTextFile("./deno-public/bundle.js");
      return new Response(content, {
        headers: { "Content-Type": "application/javascript" },
      });
    } catch (e) {
      console.error("Error serving bundle.js:", e);
      return new Response("Not Found", { status: 404 });
    }
  }

  // Fallback for other static assets if any (e.g. images, css)
  // Note: For a more robust solution, consider placing assets in deno-public
  // and using serveDir for that directory.
  return serveDir(req, {
    fsRoot: "deno-public", // Serve files from deno-public
    urlRoot: "", // Serve them at the root of the domain
    showDirListing: true,
    enableCors: true,
  });
}, { port });
