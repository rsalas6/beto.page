import type { ToolGroup } from "@types";

export const toolGroups: ToolGroup[] = [
  {
    title: 'String Tools',
    description: 'Comprehensive tools for string manipulation.',
    tools: [
      {
        title: 'String Conversion',
        description: 'Tools for converting strings between different formats.',
        href: 'string-conversion',
        draft: false
      },
      {
        title: 'String Counting',
        description: 'Tools for counting characters and words in a string.',
        href: 'string-counting',
        draft: false
      },
      {
        title: 'Encoding and Decoding',
        description: 'Tools for encoding and decoding strings in various formats.',
        href: 'string-encoding',
        draft: false
      },
      {
        title: 'Hashing',
        description: 'Tools for generating hashes from strings.',
        href: 'hashing',
        draft: true
      },
      {
        title: 'String Security',
        description: 'Tools for improving the security and usage of strings in URLs.',
        href: 'string-security',
        draft: true
      }
    ]
  },
  {
    title: 'Utilities Tools',
    description: 'Various utility tools for different purposes.',
    tools: [
      {
        title: 'QR Code Generator',
        description: 'Generates a QR code from the provided text.',
        href: 'qr-code-generator',
        draft: false
      },
      {
        title: 'Currency Converter',
        description: 'Converts various currencies using current exchange rates.',
        href: 'currency-converter',
        draft: false
      }
    ]
  },
  {
    title: 'Prompts Builder',
    description: 'Tools for creating various types of prompts.',
    tools: [
      {
        title: 'Create a Syllabus',
        description: 'Generates a syllabus for a given topic over a specified number of weeks.',
        href: 'prompt-create-syllabus',
        draft: false
      },
      {
        title: 'Algorithm Problem Prompt',
        description: 'Generates a detailed prompt for solving an algorithmic problem.',
        href: 'prompt-algorithm-problem',
        draft: false
      }
    ]
  },
];




// import type { ToolGroup } from "@types";

// export const toolGroups: ToolGroup[] = [
//   {
//     title: 'Conversión de Cadenas',
//     description: 'Herramientas para convertir cadenas entre diferentes formatos.',
//     tools: {
//       '/string/uppercase': {
//         title: 'Uppercase Converter',
//         description: 'Converts characters to uppercase.',
//         draft: false
//       },
//       '/tools/string/lowercase': {
//         title: 'Lowercase Converter',
//         description: 'Converts characters to lowercase.',
//         draft: true
//       },
//       '/tools/string/capitalize': {
//         title: 'Capitalize Words',
//         description: 'Capitalizes the first letter of each word in a string.',
//         draft: false
//       },
//       '/tools/string/reverse': {
//         title: 'Reverse String',
//         description: 'Reverses the order of characters in a string.',
//         draft: false
//       },
//       '/tools/string/remove-accents': {
//         title: 'Remove Accents',
//         description: 'Removes accent marks from characters in a string.',
//         draft: false
//       },
//       '/tools/string/rot13': {
//         title: 'ROT13 Encoder',
//         description: 'Encodes a string using ROT13.',
//         draft: false
//       }
//     }
//   },
//   {
//     title: 'Contado de Cadenas',
//     description: 'Herramientas para contar caracteres y palabras en una cadena.',
//     tools: {
//       '/tools/string/word-count': {
//         title: 'Word Count',
//         description: 'Counts the number of words in a string.',
//         draft: false
//       },
//       '/tools/string/char-count': {
//         title: 'Character Count',
//         description: 'Counts the number of characters in a string.',
//         draft: false
//       }
//     }
//   },
//   {
//     title: 'Codificación y Decodificación',
//     description: 'Herramientas para codificar y decodificar cadenas en varios formatos.',
//     tools: {
//       '/tools/string/base64-encode': {
//         title: 'Base64 Encode',
//         description: 'Encodes a string to Base64 format.',
//         draft: false
//       },
//       '/tools/string/base64-decode': {
//         title: 'Base64 Decode',
//         description: 'Decodes a Base64 encoded string.',
//         draft: false
//       },
//       '/tools/string/url-encode': {
//         title: 'URL Encode',
//         description: 'Encodes a string to be safely used in a URL.',
//         draft: false
//       },
//       '/tools/string/url-decode': {
//         title: 'URL Decode',
//         description: 'Decodes a URL encoded string.',
//         draft: false
//       }
//     }
//   },
//   {
//     title: 'Hashing',
//     description: 'Herramientas para generar hashes de cadenas.',
//     tools: {
//       '/tools/string/md5': {
//         title: 'MD5 Hash Generator',
//         description: 'Generates an MD5 hash of a string.',
//         draft: false
//       },
//       '/tools/string/sha1': {
//         title: 'SHA-1 Hash Generator',
//         description: 'Generates a SHA-1 hash of a string.',
//         draft: false
//       },
//       '/tools/string/sha256': {
//         title: 'SHA-256 Hash Generator',
//         description: 'Generates a SHA-256 hash of a string.',
//         draft: false
//       }
//     }
//   },
//   {
//     title: 'Manipulación de HTML',
//     description: 'Herramientas para manipular entidades HTML en cadenas.',
//     tools: {
//       '/tools/string/html-encode': {
//         title: 'HTML Entity Encoder',
//         description: 'Encodes a string to HTML entities.',
//         draft: false
//       },
//       '/tools/string/html-decode': {
//         title: 'HTML Entity Decoder',
//         description: 'Decodes HTML entities in a string.',
//         draft: false
//       }
//     }
//   },
//   {
//     title: 'Seguridad de Cadenas',
//     description: 'Herramientas para mejorar la seguridad y el uso de cadenas en URLs.',
//     tools: {
//       '/tools/string/slug': {
//         title: 'Slug Generator',
//         description: 'Generates a URL-friendly slug from a string.',
//         draft: false
//       },
//       '/tools/string/trim-spaces': {
//         title: 'Trim Spaces',
//         description: 'Removes leading and trailing spaces from a string.',
//         draft: false
//       }
//     }
//   }
// ];
