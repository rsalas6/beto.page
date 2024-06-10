<template>
  <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="flex flex-wrap gap-2 mb-4">
      <input
        v-model="inputText"
        class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
        type="text"
        placeholder="Enter text here"
      />
      <input
        v-model.number="qrSize"
        class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
        type="number"
        placeholder="Enter size (px)"
      />

      <button
        @click="generateQRCode"
        class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
      >
        Generate QR Code
      </button>
    </div>

    <div v-if="qrCodeUrl" class="mt-4 flex flex-col items-center">
      <img :src="qrCodeUrl" :width="qrSize" :height="qrSize" alt="QR Code" />
      <button
        @click="downloadQRCode('png')"
        class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
      >
        Download as PNG
      </button>
      <button
        @click="downloadQRCode('svg')"
        class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
      >
        Download as SVG
      </button>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  data() {
    return {
      inputText: '',
      qrSize: 300,
      qrCodeUrl: '',
    };
  },
  methods: {
    async generateQRCode() {
      try {
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, this.inputText, { width: this.qrSize, height: this.qrSize });
        this.qrCodeUrl = canvas.toDataURL('image/png');
      } catch (err) {
        console.error('Failed to generate QR Code: ', err);
      }
    },
    async downloadQRCode(format) {
      try {
        const canvas = document.createElement('canvas');
        if (format === 'png') {
          await QRCode.toCanvas(canvas, this.inputText, { width: this.qrSize, height: this.qrSize });
          const pngUrl = canvas.toDataURL('image/png');
          this.downloadImage(pngUrl, 'qr-code.png');
        } else if (format === 'svg') {
          const svgUrl = await QRCode.toString(this.inputText, { type: 'svg', width: this.qrSize, height: this.qrSize });
          const blob = new Blob([svgUrl], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          this.downloadImage(url, 'qr-code.svg');
          URL.revokeObjectURL(url);
        }
      } catch (err) {
        console.error('Failed to download QR Code: ', err);
      }
    },
    downloadImage(url, filename) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style>
/* No additional styles needed since we're using Tailwind CSS */
</style>
