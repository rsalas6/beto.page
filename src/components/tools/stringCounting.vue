<template>
  <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <label for="textInput" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      Enter text here
    </label>
    <textarea
      id="textInput"
      v-model="text"
      @input="updateCounts"
      class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 resize-y outline-none"
      rows="10"
      placeholder="Type your text here..."
    ></textarea>
    <div class="mt-4">
      <p class="text-sm text-gray-700 dark:text-gray-300">Character Count: {{ charCount }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">Word Count: {{ wordCount }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">Paragraph Count: {{ paragraphCount }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">Byte Count: {{ byteCount }} ({{ humanReadableSize }})</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      charCount: 0,
      wordCount: 0,
      paragraphCount: 0,
      byteCount: 0,
      humanReadableSize: '',
    };
  },
  methods: {
    updateCounts() {
      this.charCount = this.text.length;
      this.wordCount = this.text.trim().split(/\s+/).filter(word => word).length;
      this.paragraphCount = this.text.trim().split(/\n+/).filter(paragraph => paragraph).length;
      this.byteCount = new Blob([this.text]).size;
      this.humanReadableSize = this.formatBytes(this.byteCount);
    },
    formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
  },
  watch: {
    text() {
      this.updateCounts();
    },
  },
  mounted() {
    this.updateCounts();
  },
};
</script>