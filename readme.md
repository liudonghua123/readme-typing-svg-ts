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

Import the library and generate a typing SVG:

```typescript
import { createTypingSVG } from "readme-typing-svg-ts";

const svg = createTypingSVG({
  text: ["Hello, world!"],
  speed: 100,
  loop: true,
  cursor: true,
});

console.log(svg.outerHTML);

process.exit(0);
```

### Parameters

- **text**: The text to be typed out.
- **speed**: Typing speed in milliseconds per character.
- **loop**: Whether the animation should loop (default: `false`).
- **cursor**: Whether to show the cursor (default: `true`).

## Examples

See the [examples](https://github.com/liudonghua123/readme-typing-svg-ts/tree/main/examples) directory for sample usage.

## Development

To contribute or modify the library, clone the repository and install the dependencies:

```bash
git clone https://github.com/liudonghua123/readme-typing-svg-ts.git
cd readme-typing-svg-ts
npm install
```

Run the development server:

```bash
npm run dev
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
