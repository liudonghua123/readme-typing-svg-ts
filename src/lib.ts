export type Config = {
  width?: number;
  height?: number;
  background?: string;
  fontCSS?: string;
  duration?: number;
  pause?: number;
  repeat?: boolean;
  font?: string;
  color?: string;
  size?: number;
  vCenter?: boolean;
  center?: boolean;
  letterSpacing?: string;
  multiline?: boolean;
};

export const defaultConfig = {
  font: "Fira Code",
  weight: "400",
  color: "#36BCF7",
  background: "#00000000",
  size: 20,
  center: false,
  vCenter: false,
  width: 400,
  height: 50,
  multiline: false,
  duration: 5000,
  pause: 1000,
  repeat: true,
  fontCSS: '',
  letterSpacing: "normal",
} as const;

export function createTypingSVG(text: string[], config?: Config): string {
  const mergedConfig = { ...defaultConfig, ...config };
  const {
    width,
    height,
    background,
    fontCSS,
    duration,
    pause,
    repeat,
    font,
    color,
    size,
    vCenter,
    center,
    letterSpacing,
    multiline,
  } = mergedConfig;

  let svgContent = `
<svg xmlns='http://www.w3.org/2000/svg'
    xmlns:xlink='http://www.w3.org/1999/xlink'
    viewBox='0 0 ${width} ${height}'
    style='background-color: ${background};'
    width='${width}px' height='${height}px'>
    <style>
        ${fontCSS}
    </style>
`;

  const lastLineIndex = text.length - 1;
  const lineHeight = size + 5;

  for (let i = 0; i <= lastLineIndex; ++i) {
    const nextIndex = i + 1;
    const lineDuration = (duration + pause) * nextIndex;
    // if this is the first line, start at 0 seconds and also after the last line if repeat is true
    // or start after previous line
    const begin = i === 0 ? (repeat ? `0s;d${lastLineIndex}.end` : "0s") : `d${i - 1}.end`;
    // don't delete text after typing the last line if repeat is false
    const freeze = !repeat && i === lastLineIndex;
    // empty line values
    const yOffset = multiline ? (i + 1) * lineHeight : height / 2;
    const emptyLine = `m0,${yOffset} h0`;
    const fullLine = `m0,${yOffset} h${width}`;
    const values = multiline
      ? [emptyLine, emptyLine, fullLine, fullLine]
      : [emptyLine, fullLine, fullLine, freeze ? fullLine : emptyLine];
    const keyTimes = multiline
      ? ["0", `${i / nextIndex}`, `${i / nextIndex + duration / lineDuration}`, "1"]
      : ["0", `${(0.8 * duration) / (duration + pause)}`, `${(0.8 * duration + pause) / (duration + pause)}`, "1"];
    svgContent += `
        <path id='path${i}'>
            <animate 
              id='d${i}'
              attributeName='d' 
              begin='${multiline ? `0s${repeat ? `;d${lastLineIndex}.end` : ""}` : begin}'
              dur='${multiline ? lineDuration : duration + pause}ms' 
              fill='${multiline ? "freeze" : freeze ? "freeze" : "remove"}'
              values='${values.join(" ; ")}' 
              keyTimes='${keyTimes.join(";")}' />
        </path>
        <text font-family='${font}, monospace' fill='${color}' font-size='${size}'
            dominant-baseline='${vCenter ? "middle" : "auto"}'
            x='${center ? "50%" : "0%"}' text-anchor='${center ? "middle" : "start"}'
            letter-spacing='${letterSpacing}'>
            <textPath xlink:href='#path${i}'>
                ${text[i]}
            </textPath>
        </text>
    `;
  }

  svgContent += "</svg>";
  return svgContent;
}
