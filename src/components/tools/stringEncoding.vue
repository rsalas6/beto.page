<template>
  <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="flex flex-wrap gap-2 mb-4">
      <div
        v-for="tool in tools"
        :key="tool.methods.encode"
        class="flex gap-2 w-full"
      >
        <button
          @click="applyTransformation(tool.methods.encode)"
          class="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
        >
          {{ tool.title }} Encode
        </button>
        <button
          @click="applyTransformation(tool.methods.decode)"
          class="w-1/2 px-4 py-2 bg-green-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-green-600"
        >
          {{ tool.title }} Decode
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="inputText" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
        <textarea
          id="inputText"
          v-model="inputText"
          class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 resize-y outline-none"
          rows="10"
          placeholder="Enter text here"
        ></textarea>
      </div>
  
      <div>
        <label for="outputText" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
        <textarea
          id="outputText"
          v-model="outputText"
          readonly
          class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 resize-y outline-none bg-gray-100 dark:bg-gray-700"
          rows="10"
          placeholder="Output will appear here"
        ></textarea>
      </div>
    </div>

    <button
      @click="copyToClipboard"
      ref="copyButton"
      class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
    >
      Copy to Clipboard
    </button>

    <button
      @click="downloadOutputAsTxt"
      class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
    >
      Download output as .txt
    </button>

    <button
      @click="switchTexts"
      class="mt-4 w-full px-4 py-2 bg-sky-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-sky-600"
    >
      Switch Input <- Output
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      outputText: '',
      tools: [
        {
          title: 'Base64',
          methods: {
            encode: 'encodeBase64',
            decode: 'decodeBase64',
          },
        },
        {
          title: 'Hex',
          methods: {
            encode: 'encodeHex',
            decode: 'decodeHex',
          },
        },
        {
          title: 'URL',
          methods: {
            encode: 'encodeURL',
            decode: 'decodeURL',
          },
        },
        {
          title: 'HTML Entities',
          methods: {
            encode: 'encodeHTMLEntities',
            decode: 'decodeHTMLEntities',
          },
        },
      ],
    };
  },
  methods: {
    applyTransformation(method) {
      switch (method) {
        case 'encodeBase64':
          this.outputText = btoa(this.inputText);
          break;
        case 'decodeBase64':
          try {
            this.outputText = atob(this.inputText);
          } catch (e) {
            this.outputText = 'Invalid Base64 string';
          }
          break;
        case 'encodeHex':
          this.outputText = this.inputText.split('').map(char => char.charCodeAt(0).toString(16)).join('');
          break;
        case 'decodeHex':
          try {
            this.outputText = this.inputText.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
          } catch (e) {
            this.outputText = 'Invalid Hex string';
          }
          break;
        case 'encodeURL':
          this.outputText = encodeURIComponent(this.inputText);
          break;
        case 'decodeURL':
          try {
            this.outputText = decodeURIComponent(this.inputText);
          } catch (e) {
            this.outputText = 'Invalid URL string';
          }
          break;
        case 'encodeHTMLEntities':
          this.outputText = this.inputText.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
            return '&#' + i.charCodeAt(0) + ';';
          });
          break;
        case 'decodeHTMLEntities':
          this.outputText = this.inputText.replace(/&#(\d+);/g, function(match, num) {
            return String.fromCharCode(num);
          });
          break;
        default:
          this.outputText = this.inputText;
      }
    },
    switchTexts() {
      const temp = this.inputText;
      this.inputText = this.outputText;
      this.outputText = temp;
    },
    async copyToClipboard() {
      const copyButton = this.$refs.copyButton;
      try {
        await navigator.clipboard.writeText(this.outputText);
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('bg-green-700');

        setTimeout(() => {
          copyButton.textContent = 'Copy to Clipboard';
          copyButton.classList.remove('bg-green-700');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
    downloadOutputAsTxt() {
      const blob = new Blob([this.outputText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'output.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  },
};
</script>