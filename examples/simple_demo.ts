import { createTypingSVG } from "readme-typing-svg-ts";

const svg = createTypingSVG({
  text: ["Hello, world!"],
  speed: 100,
  loop: true,
  cursor: true,
});

console.log(svg.outerHTML);

process.exit(0);
