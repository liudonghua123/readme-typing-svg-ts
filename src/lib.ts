import { SVG, registerWindow } from "@svgdotjs/svg.js";

// check if we are in a node environment, define browser in vite.config.ts for conditional import of svgdom
// @ts-ignore
if (typeof browser === "undefined") {
  const { createSVGWindow } = await import("svgdom")
  // returns a window with a document and an svg root node
  const window = createSVGWindow();
  // register window and document
  registerWindow(window, window.document);
}

export interface TypingSVGOptions {
  text: string[];
  speed: number;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  letterSpacing: string;
  color: string;
  backgroundColor: string;
  width: number;
  height: number;
  loop: boolean;
  cursor: boolean;
  cursorChar: string;
  pause: number;
  duration: number;
  horizontallyCentered: boolean;
  verticallyCentered: boolean;
  multiline: boolean;
  repeat: boolean;
  random: boolean;
}

export function createTypingSVG(options: TypingSVGOptions): SVGSVGElement {
  const {
    text = ["The five boxing wizards jump quickly"],
    speed = 100,
    fontFamily = "Fira Code",
    fontWeight = 400,
    fontSize = 24,
    letterSpacing = "normal",
    color = "#36BCF7FF",
    backgroundColor = "#00000000",
    width = 500,
    height = 100,
    loop = true,
    cursor = true,
    cursorChar = "|",
    pause = 1000,
    duration = 5000,
    horizontallyCentered = false,
    verticallyCentered = false,
    multiline = false,
    repeat = false,
    random = false,
  } = options;

  const canvas = SVG().size(width, height).viewbox(0, 0, width, height);
  canvas.rect(width, height).fill(backgroundColor);

  const textElement = canvas
    .text("")
    .font({
      size: fontSize,
      fill: color,
      weight: fontWeight,
      family: fontFamily,
      letterSpacing: letterSpacing,
    })
    .move(10, height / 2 - fontSize / 2);

  const cursorElement = cursor
    ? canvas
        .text(cursorChar)
        .font({
          size: fontSize,
          fill: color,
          weight: fontWeight,
          family: fontFamily,
          letterSpacing: letterSpacing,
        })
        .animate()
        .attr({ opacity: 0 })
        .loop(1000, 1, 1)
    : null;

  let index = 0;
  let textIndex = 0;

  const type = () => {
    if (textIndex < text.length) {
      const currentText = random ? text[Math.floor(Math.random() * text.length)] : text[textIndex];
      if (index < currentText.length) {
        textElement.text(currentText.substr(0, index + 1));
        index++;
        setTimeout(type, speed);
      } else {
        index = 0;
        textIndex++;
        setTimeout(() => {
          if (textIndex < text.length) {
            if (!multiline) {
              textElement.clear();
            }
            type();
          } else if (loop) {
            textIndex = 0;
            setTimeout(type, pause);
          }
        }, pause);
      }
    }
  };

  type();
  return canvas.node;
}
