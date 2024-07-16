import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib.ts',
      name: 'TypingSVG',
      fileName: (format) => `typing-svg.${format}.js`,
    },
  },
});
