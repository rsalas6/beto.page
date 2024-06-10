<template>
    <div>
      <textarea v-model="inputCode" placeholder="Enter your JavaScript code here" rows="10" cols="50"></textarea>
      <button @click="formatCode">Format Code</button>
      <pre>{{ formattedCode }}</pre>
    </div>
  </template>
  
  <script>
  import prettier from "prettier/standalone";
  import parserBabel from "prettier/parser-babel"; // Importa el parser Babel para JavaScript
  
  export default {
    data() {
      return {
        inputCode: "",
        formattedCode: ""
      };
    },
    methods: {
      async formatCode() {
        try {
          this.formattedCode = await prettier.format(this.inputCode, {
            parser: "babel", // Usar el parser de Babel para JavaScript
            plugins: [parserBabel]
          });
        } catch (error) {
          console.error("Error formateando el código:", error);
          this.formattedCode = this.inputCode; // Devuelve el código original en caso de error
        }
      }
    }
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    margin-bottom: 1em;
  }
  
  pre {
    background-color: #f5f5f5;
    padding: 1em;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  </style>
  