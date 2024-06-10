<template>
  <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <form @submit.prevent="convertCurrency">
      <div class="mb-4">
        <label for="amount" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
        <input
          id="amount"
          v-model.number="amount"
          class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none mb-2"
          type="number"
          placeholder="Enter amount"
        />
      </div>

      <div class="mb-4">
        <label for="fromCurrency" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">From Currency</label>
        <select
          id="fromCurrency"
          v-model="fromCurrency"
          class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none mb-2"
        >
          <option v-for="(name, code) in currencies" :key="code" :value="code">
            {{ code }} - {{ name }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="toCurrency" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">To Currency</label>
        <select
          id="toCurrency"
          v-model="toCurrency"
          class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none mb-2"
        >
          <option v-for="(name, code) in currencies" :key="code" :value="code">
            {{ code }} - {{ name }}
          </option>
        </select>
      </div>
      
      <button
        type="submit"
        class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600 cursor-pointer"
      >
        Convert
      </button>
    </form>

    <div v-if="convertedAmount !== null" class="mt-4">
      <p class="text-lg text-gray-700 dark:text-gray-300">Converted Amount: {{ formattedAmount }}</p>
      <p class="text-md text-gray-700 dark:text-gray-300">1 {{ fromCurrency }} = {{ formattedUnitRate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0,
      fromCurrency: 'USD',
      toCurrency: 'MXN',
      convertedAmount: null,
      unitRate: null,
      currencies: {
        USD: 'United States Dollar',
        MXN: 'Mexican Peso',
        EUR: 'Euro',
        GBP: 'British Pound Sterling',
        JPY: 'Japanese Yen',
        AUD: 'Australian Dollar',
        CAD: 'Canadian Dollar',
        CHF: 'Swiss Franc',
        CNY: 'Chinese Yuan',
        SEK: 'Swedish Krona',
        NZD: 'New Zealand Dollar'
      }
    };
  },
  computed: {
    formattedAmount() {
      if (this.convertedAmount === null) return '';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.toCurrency,
        minimumFractionDigits: 2
      }).format(this.convertedAmount);
    },
    formattedUnitRate() {
      if (this.unitRate === null) return '';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.toCurrency,
        minimumFractionDigits: 4
      }).format(this.unitRate);
    }
  },
  methods: {
    async convertCurrency() {
      const endpoint = `https://v6.exchangerate-api.com/v6/ffbfa29098a4f8a47d5c899d/latest/${this.fromCurrency}`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const rate = data.conversion_rates[this.toCurrency];
        this.convertedAmount = this.amount * rate;
        this.unitRate = rate;
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    },
    setParamsFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const amount = urlParams.get('amount');
      const fromCurrency = urlParams.get('from');
      const toCurrency = urlParams.get('to');

      if (amount) this.amount = parseFloat(amount);
      if (fromCurrency && this.currencies[fromCurrency]) this.fromCurrency = fromCurrency;
      if (toCurrency && this.currencies[toCurrency]) this.toCurrency = toCurrency;

      if (amount && fromCurrency && toCurrency) {
        this.convertCurrency();
      }
    }
  },
  mounted() {
    this.setParamsFromURL();
  }
};
</script>
