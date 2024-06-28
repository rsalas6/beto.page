<template>
    <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div class="flex flex-wrap gap-2 mb-4">
            <textarea
                v-model="problemDescription"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                placeholder="Describe the problem here..."
            ></textarea>
            <select
                v-model="outputLanguage"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none mt-4"
            >
                <option value="English" selected>English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
            </select>
            <button
                @click="generatePrompt"
                class="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
            >
                Generate Prompt
            </button>
        </div>

        <div v-if="generatedPrompt" class="mt-4 flex flex-col items-center">
            <textarea
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                rows="10"
                readonly
            >{{ generatedPrompt }}</textarea>
            <button
                @click="copyPrompt"
                class="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition ease-in-out duration-300 hover:bg-blue-600"
            >
                Copy Prompt and Open ChatGPT
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            problemDescription: '',
            outputLanguage: 'English',
            generatedPrompt: '',
        };
    },
    methods: {
        generatePrompt() {
            const fields = {
                problemDescription: this.problemDescription || '',
                outputLanguage: this.outputLanguage || 'English',
            };

            this.generatedPrompt = this.generatePromptContent(fields);
        },
        generatePromptContent({ problemDescription, outputLanguage }) {
            return `Problem Statement:

${problemDescription}

Describe the problem clearly and concisely.
Define any technical terms or relevant concepts necessary to understand the problem.
Explain the relevance and application of the problem in a real-world context so that students understand its importance.

Problem Breakdown:

Divide the problem into manageable sub-tasks.
Identify the main sub-tasks or components that need to be solved.
Explain how these sub-tasks relate to each other and how they contribute to the solution of the overall problem.

Algorithm Development:

Provide a Python code that describes the algorithm necessary to solve the problem.
Explain each step of the pseudocode in detail, ensuring that students understand the logic behind each operation.
Justify why each step is necessary and how it is implemented, providing clarity on the algorithm's structure.

Practical Examples:

Provide concrete examples that demonstrate the algorithm's functionality.
Explain step-by-step how the algorithm is applied to each example, showing the complete solving process.
Include varied examples covering different possible cases, ensuring students see how to handle various situations.

---
Generate the content in ${outputLanguage}.`;
        },
        copyPrompt() {
            navigator.clipboard.writeText(this.generatedPrompt).then(() => {
                alert('Prompt copied to clipboard');
                window.open('https://chat.openai.com', '_blank');
            });
        },
    },
};
</script>

<style>
/* No additional styles needed since we're using Tailwind CSS */
</style>
