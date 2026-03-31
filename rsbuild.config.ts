import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    meta: {
      "HTTP-EQUIV": "Access-Control-Allow-Origin",
      CONTENT: "https://wahapedia.ru",
    },
  },
});
