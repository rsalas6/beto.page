<template>
    <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="tool in tools"
          :key="tool.href"
          @click="applyTransformation(tool.method)"
          class="w-[calc(33.333%-0.5rem)] px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
        >
          {{ tool.title }}
        </button>
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
        Switch Input/Output
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
            title: 'Uppercase',
            description: 'Converts characters to uppercase.',
            method: 'uppercase',
          },
          {
            title: 'Lowercase',
            description: 'Converts characters to lowercase.',
            method: 'lowercase',
          },
          {
            title: 'Capitalize',
            description: 'Capitalizes the first letter of each word in a string.',
            method: 'capitalize',
          },
          {
            title: 'Reverse',
            description: 'Reverses the order of characters in a string.',
            method: 'reverse',
          },
          {
            title: 'Remove Accents',
            description: 'Removes accent marks from characters in a string.',
            method: 'remove-accents',
          },
          {
            title: 'Slugify',
            description: 'Converts text to a URL-friendly slug.',
            method: 'slugify',
          },
          {
            title: 'Camel Case',
            description: 'Converts text to camelCase.',
            method: 'camel-case',
          },
          {
            title: 'Snake Case',
            description: 'Converts text to snake_case.',
            method: 'snake-case',
          },
        ],
      };
    },
    methods: {
      applyTransformation(method) {
        switch (method) {
          case 'uppercase':
            this.outputText = this.inputText.toUpperCase();
            break;
          case 'lowercase':
            this.outputText = this.inputText.toLowerCase();
            break;
          case 'capitalize':
            this.outputText = this.inputText.replace(/\b\w/g, (c) => c.toUpperCase());
            break;
          case 'reverse':
            this.outputText = this.inputText.split('').reverse().join('');
            break;
          case 'remove-accents':
            this.outputText = this.inputText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            break;
          case 'slugify':
            this.outputText = this.inputText
              .toLowerCase()
              .trim()
              .replace(/[\s\W-]+/g, '-');
            break;
          case 'camel-case':
            this.outputText = this.inputText
              .toLowerCase()
              .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            break;
          case 'snake-case':
            this.outputText = this.inputText
              .toLowerCase()
              .replace(/\W+/g, ' ')
              .split(' ')
              .join('_');
            break;
          default:
            this.outputText = this.inputText;
        }
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
      switchTexts() {
        const temp = this.inputText;
        this.inputText = this.outputText;
        this.outputText = temp;
      },
    },
  };
</script>