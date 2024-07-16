#!/usr/bin/env node

import { createTypingSVG, TypingSVGOptions } from "./lib";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { Command } from "commander";

const program = new Command();

program
  .option("-t, --text <items>", "Text to type", "Hello, World!")
  .option("-s, --speed <number>", "Typing speed in ms", "100")
  .option("-f, --font-size <number>", "Font size", "24")
  .option("-w, --font-weight <number>", "Font weight", "400")
  .option("-m, --font-family <string>", "Font family", "Fira Code")
  .option("-l, --letter-spacing <string>", "Letter spacing", "normal")
  .option("-c, --color <color>", "Text color", "#36BCF7FF")
  .option("-b, --background-color <color>", "Background color", "#00000000")
  .option("--width <number>", "SVG width", "435")
  .option("--height <number>", "SVG height", "500")
  .option("--loop", "Loop typing animation", false)
  .option("--cursor", "Show cursor", true)
  .option("--cursor-char <char>", "Cursor character", "|")
  .option("--pause <number>", "Pause between texts in ms", "1000")
  .option("--duration <number>", "Duration per line in ms", "5000")
  .option("--horizontally-centered", "Horizontally center text", false)
  .option("--vertically-centered", "Vertically center text", false)
  .option("--multiline", "Each sentence on a new line", false)
  .option("--repeat", "Repeat text", false)
  .option("--random", "Randomize text", false)
  .option("-o, --output <path>", "Output path", "typing.svg");

program.parse(process.argv);

const options = program.opts();

async function main() {
  try {
    const svgOptions: TypingSVGOptions = {
      text: options.text.split("|"),
      speed: parseInt(options.speed, 10),
      fontSize: parseInt(options.fontSize, 10),
      fontWeight: parseInt(options.fontWeight, 10),
      fontFamily: options.fontFamily,
      letterSpacing: options.letterSpacing,
      color: options.color,
      backgroundColor: options.backgroundColor,
      width: parseInt(options.width, 10),
      height: parseInt(options.height, 10),
      loop: options.loop,
      cursor: options.cursor,
      cursorChar: options.cursorChar,
      pause: parseInt(options.pause, 10),
      duration: parseInt(options.duration, 10),
      horizontallyCentered: options.horizontallyCentered,
      verticallyCentered: options.verticallyCentered,
      multiline: options.multiline,
      repeat: options.repeat,
      random: options.random,
    };

    const svgString = createTypingSVG(svgOptions).outerHTML;
    const outputPath = resolve(options.output);
    await writeFile(outputPath, svgString, "utf-8");
    console.log(`SVG file created at ${outputPath}`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

await main();