#!/usr/bin/env node

import { createTypingSVG, defaultConfig, Config } from "./lib.js";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { Command } from "commander";

const program = new Command();

program
  .option("-t, --text <items>", "Text to type", "Hello, World!")
  .option("-s, --size <number>", "Font size", defaultConfig.size.toString())
  .option("-m, --font <string>", "Font family", defaultConfig.font)
  .option("-l, --letter-spacing <string>", "Letter spacing", defaultConfig.letterSpacing)
  .option("-c, --color <color>", "Text color", defaultConfig.color)
  .option("-b, --background <color>", "Background color", defaultConfig.background)
  .option("--width <number>", "SVG width", defaultConfig.width.toString())
  .option("--height <number>", "SVG height", defaultConfig.height.toString())
  .option("--pause <number>", "Pause between texts in ms", defaultConfig.pause.toString())
  .option("--duration <number>", "Duration per line in ms", defaultConfig.duration.toString())
  .option("--center", "Horizontally center text", defaultConfig.center)
  .option("--vCenter", "Vertically center text", defaultConfig.vCenter)
  .option("--multiline", "Each sentence on a new line", defaultConfig.multiline)
  .option("--repeat", "Repeat text", defaultConfig.repeat)
  .option("-o, --output <path>", "Output path", "typing.svg");

program.parse(process.argv);

const options = program.opts();

async function main() {
  try {
    const text = options.text.split(",");
    const config: Config = {
      size: parseInt(options.size),
      font: options.font,
      letterSpacing: options.letterSpacing,
      color: options.color,
      background: options.background,
      width: parseInt(options.width),
      height: parseInt(options.height),
      pause: parseInt(options.pause),
      duration: parseInt(options.duration),
      center: options.horizontallyCentered,
      vCenter: options.vCenter,
      multiline: options.multiline,
      repeat: options.repeat,
    };

    const svgString = createTypingSVG(text, config);
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
