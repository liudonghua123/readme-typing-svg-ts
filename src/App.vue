<template>
  <div class="container">
    <h1>Readme Typing SVG</h1>
    <div class="content">
      <form class="form-section" @change="renderPreview">
        <h2>Add your text</h2>
        <div v-for="(_, index) in form.text" :key="index" class="form-group">
          <label :for="'line-' + index">Line {{ index + 1 }}</label>
          <input :id="'line-' + index" type="text" v-model="form.text[index]" />
        </div>
        <button @click="addLine" class="add-line-button">+ Add line</button>
        <h2>Options</h2>
        <div class="form-group">
          <label for="font">Font</label>
          <input type="text" id="font" v-model="form.font" />
        </div>
        <div class="form-group">
          <label for="weight">Font weight</label>
          <input type="number" id="weight" v-model="form.weight" />
        </div>
        <div class="form-group">
          <label for="size">Font size</label>
          <input type="number" id="size" v-model="form.size" />
        </div>
        <div class="form-group">
          <label for="letterSpacing">Letter spacing</label>
          <input type="text" id="letterSpacing" v-model="form.letterSpacing" />
        </div>
        <div class="form-group">
          <label for="duration">Duration (ms per line)</label>
          <input type="number" id="duration" v-model="form.duration" />
        </div>
        <div class="form-group">
          <label for="pause">Pause (ms after line)</label>
          <input type="number" id="pause" v-model="form.pause" />
        </div>
        <div class="form-group">
          <label for="color">Font color</label>
          <input type="color" id="color" v-model="form.color" />
        </div>
        <div class="form-group">
          <label for="background">Background color</label>
          <input type="color" id="background" v-model="form.background" />
        </div>
        <div class="form-group">
          <label for="center">Horizontally Centered</label>
          <select v-model="form.center">
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
        <div class="form-group">
          <label for="vCenter">Vertically Centered</label>
          <select v-model="form.vCenter">
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
        <div class="form-group">
          <label for="multiline">Multiline</label>
          <select v-model="form.multiline">
            <option value="false">Type sentences on one line</option>
            <option value="true">Each sentence on a new line</option>
          </select>
        </div>
        <div class="form-group">
          <label for="repeat">Repeat</label>
          <select v-model="form.repeat">
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
        <div class="form-group">
          <label for="width">Width</label>
          <input type="number" id="width" v-model="form.width" />
        </div>
        <div class="form-group">
          <label for="height">Height</label>
          <input type="number" id="height" v-model="form.height" />
        </div>
        <button @click="reset" class="reset-button">Reset</button>
        <button @click="copyPermalink" class="copy-permalink-button">Copy Permalink</button>
      </form>
      <div class="preview-section">
        <h2>Preview</h2>
        <div id="preview"></div>
        <h2>Markdown</h2>
        <textarea :value="markdownCode" readonly></textarea>
        <button class="markdown-button" @click="copyToClipboard(markdownCode)">Copy to Clipboard</button>
        <h2>HTML</h2>
        <textarea :value="htmlCode" readonly></textarea>
        <button class="html-button" @click="copyToClipboard(htmlCode)">Copy to Clipboard</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createTypingSVG, defaultConfig, Config } from "./lib";

import { onMounted } from "vue";

const defaultValue = { ...defaultConfig, text: ["hello", "world"] };
const form = ref(defaultValue);
const markdownCode = ref("");
const htmlCode = ref("");

const addLine = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  form.value.text.push("");
};

const reset = () => {
  form.value = defaultValue;
};

const _generateTypingSVG = () => {
  const svgOptions: Config = {
    ...form.value,
  };
  const text = form.value.text.filter((line) => line.trim() !== "");
  const svg = createTypingSVG(text, svgOptions);
  return svg;
};

const _renderMarkdownAndHTML = (svg: string) => {
  const queryParams = new URLSearchParams({
    text: form.value.text.join("\n"),
    font: form.value.font,
    fontCSS: form.value.fontCSS?.toString(),
    size: form.value.size?.toString(),
    letterSpacing: form.value.letterSpacing,
    color: form.value.color,
    background: form.value.background,
    width: form.value.width?.toString(),
    height: form.value.height?.toString(),
    pause: form.value.pause?.toString(),
    duration: form.value.duration?.toString(),
    center: form.value.center?.toString(),
    vCenter: form.value.vCenter?.toString(),
    multiline: form.value.multiline?.toString(),
    repeat: form.value.repeat?.toString(),
  } as Record<keyof Config, string>);

  // filter out undefined/null or default values
  const queryParamsFilted = new URLSearchParams();
  queryParams.forEach((value, key) => {
    if (value && value !== new String(defaultValue[key as keyof Config]).toString()) {
      queryParamsFilted.append(key, value);
    }
  });

  const baseUrl = "https://liudonghua123.github.io/readme-typing-svg-ts";
  const queryString = queryParamsFilted.toString();
  const url = `${baseUrl}?${queryString}`;
  const imageDataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

  markdownCode.value = `[![Typing SVG](${imageDataUrl})](${url})`;
  htmlCode.value = `<a href="${url}"><img src="${imageDataUrl}" alt="Typing SVG" /></a>`;
};

const renderPreview = () => {
  const svg = _generateTypingSVG();
  console.info(`renderPreview svg: ${svg}`);
  const preview = document.getElementById("preview");
  if (preview) {
    preview.innerHTML = svg;
  }
  _renderMarkdownAndHTML(svg);
};

const copyPermalink = () => {
  navigator.clipboard.writeText(location.href).then(() => {
    alert("Copied to clipboard!");
  });
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
};

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const text = searchParams.getAll("text").filter((line) => line.trim() !== "");
  form.value = { ...form.value, ...Object.fromEntries(searchParams) };
  if (text.length > 0) {
    form.value["text"] = text;
  }
  renderPreview();
});
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.content {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .content {
    flex-direction: row;
    justify-content: space-between;
  }
}

#preview {
  margin: 0 auto 20px;
}

.form-section,
.preview-section {
  width: 100%;
}

@media (min-width: 768px) {
  .form-section,
  .preview-section {
    width: 48%;
  }
}

.form-section {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.preview-section {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  margin-top: 0;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-right: 10px;
  width: 40%;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-line-button,
.reset-button,
.copy-permalink-button,
.generate-button,
.markdown-button,
.html-button,
.copy-button {
  display: block;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.copy-button {
  background: #28a745;
}

.add-line-button:hover,
.reset-button:hover,
.copy-permalink-button:hover,
.generate-button:hover,
.markdown-button:hover,
.html-button:hover,
.copy-button:hover {
  background: #0056b3;
}

.copy-button:hover {
  background: #218838;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100px;
}

input[type="color"] {
  padding: 0;
}
</style>
