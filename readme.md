# readme-typing-svg-ts

[![NPM Version](https://img.shields.io/npm/v/readme-typing-svg-ts)](https://www.npmjs.com/package/readme-typing-svg-ts)
[![Build Status](https://github.com/liudonghua123/readme-typing-svg-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/liudonghua123/readme-typing-svg-ts/actions)
[![License](https://img.shields.io/github/license/liudonghua123/readme-typing-svg-ts)](https://github.com/liudonghua123/readme-typing-svg-ts/blob/main/LICENSE)

`readme-typing-svg-ts` is a TypeScript library that generates typing SVG animations for your GitHub README files. Enhance your README with dynamic, typewriter-style text effects to capture attention and convey information more effectively.

## Features

- **Typing Animation**: Generate SVG animations that simulate typing.
- **Customizable**: Adjust text, typing speed, colors, and more.
- **TypeScript**: Benefit from type safety and modern JavaScript features.
- **Lightweight**: Minimal dependencies for a lightweight footprint.
- **Easy Integration**: Simple to integrate into any GitHub README.

## Installation

Install the package via npm:

```bash
npm install readme-typing-svg-ts
```

Or via yarn:

```bash
yarn add readme-typing-svg-ts
```

## Usage

### LIB usage

Import the library and generate a typing SVG:

```typescript
import { createTypingSVG } from "readme-typing-svg-ts";

const svg = createTypingSVG({
  text: ["Hello", "world!"],
});

console.log(svg);

process.exit(0);
```

### CLI usage

Install the package globally:

```shell
npm install -g readme-typing-svg-ts # or yarn global add readme-typing-svg-ts
```

```shell
> readme-typing-svg-ts --help
Usage: cli [options]

Options:
  -t, --text <items>             Text to type (default: "Hello, World!")
  -s, --size <number>            Font size (default: "20")
  -m, --font <string>            Font family (default: "Fira Code")
  -l, --letter-spacing <string>  Letter spacing (default: "normal")
  -c, --color <color>            Text color (default: "#36BCF7")
  -b, --background <color>       Background color (default: "#00000000")
  --width <number>               SVG width (default: "400")
  --height <number>              SVG height (default: "50")
  --pause <number>               Pause between texts in ms (default: "1000")
  --duration <number>            Duration per line in ms (default: "5000")
  --center                       Horizontally center text (default: false)
  --vCenter                      Vertically center text (default: false)
  --multiline                    Each sentence on a new line (default: false)
  --repeat                       Repeat text (default: true)
  -o, --output <path>            Output path (default: "typing.svg")
  -h, --help                     display help for command

> readme-typing-svg-ts -t "hello,world"
SVG file created at D:\code\node\readme-typing-svg-ts\examples\typing.svg

> 
```

### Parameters

See the full available config options on [src/lib.ts](src/lib.ts).

## Examples

See the [examples/simple_demo.ts](examples/simple_demo.ts) directory for sample usage.

## Development

To contribute or modify the library, clone the repository and install the dependencies:

```bash
git clone https://github.com/liudonghua123/readme-typing-svg-ts.git
cd readme-typing-svg-ts
npm install
```

Run the development server:

```bash
npm run build # build the static files served via gh-pages
npm run build-lib # build the lib and cli
```

Run tests:

```bash
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/liudonghua123/readme-typing-svg-ts/blob/main/LICENSE) file for details.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](https://github.com/liudonghua123/readme-typing-svg-ts/blob/main/CONTRIBUTING.md) file for guidelines.

## Acknowledgements

Special thanks to the contributors and the open-source community for their support.
