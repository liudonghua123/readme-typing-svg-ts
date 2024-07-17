import { createTypingSVG } from "readme-typing-svg-ts";

const svg = createTypingSVG({
  text: ["Hello", "world!"],
});

console.log(svg);

process.exit(0);
