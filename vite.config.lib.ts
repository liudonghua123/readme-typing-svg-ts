import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/lib.ts",
      name: "TypingSVG",
      fileName: (format) => `typing-svg.${format}.js`,
      formats: ["es"],
    },
    target: "esnext", // Adjust to the Node.js version you target
    minify: false, // Optionally, disable minification for easier debugging
    sourcemap: true, // Generate source maps for debugging
  },
});
