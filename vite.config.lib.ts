import { defineConfig } from "vite";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  build: {
    lib: {
      entry: "src/lib.ts",
      name: "TypingSVG",
      fileName: (format) => `typing-svg.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        // List all external dependencies here
        "node:fs",
        "node:path",
        "node:url",
        // Include other external libraries if any
      ],
      output: {
        globals: {
          // Define global variables for external dependencies
        },
      },
      plugins: [
        nodeResolve({
          preferBuiltins: true,
        }),
      ],
    },
    target: "esnext", // Adjust to the Node.js version you target
    minify: false, // Optionally, disable minification for easier debugging
    sourcemap: true, // Generate source maps for debugging
  },
});
