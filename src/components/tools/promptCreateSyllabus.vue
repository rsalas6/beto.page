<template>
    <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div class="flex flex-wrap gap-2 mb-4">
            <input
                v-model="topic"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                type="text"
                placeholder="Topic"
            />
            <input
                v-model.number="duration"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                type="number"
                placeholder="Duration (weeks)"
            />
            <input
                v-model.number="dailyTheoryTime"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                type="number"
                placeholder="Daily Theory Time (minutes)"
            />
            <input
                v-model.number="dailyPracticeTime"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                type="number"
                placeholder="Daily Practice Time (minutes)"
            />
            <input
                v-model.number="finalProjectDuration"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                type="number"
                placeholder="Final Project Duration (weeks)"
            />
            <select
                v-model="level"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
            >
                <option value="" disabled selected>Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            <textarea
                v-model="additionalInfo"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                placeholder="Additional Information"
            ></textarea>
            <textarea
                v-model="notes"
                class="w-full p-4 border rounded-lg border-gray-300 dark:border-gray-600 outline-none"
                placeholder="Notes"
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
            topic: '',
            duration: null,
            dailyTheoryTime: null,
            dailyPracticeTime: null,
            finalProjectDuration: null,
            level: '',
            additionalInfo: '',
            notes: '',
            outputLanguage: 'English',
            generatedPrompt: '',
        };
    },
    methods: {
        generatePrompt() {
            const fields = {
                topic: this.topic || '',
                duration: this.duration || '',
                dailyTheoryTime: this.dailyTheoryTime || '',
                dailyPracticeTime: this.dailyPracticeTime || '',
                finalProjectDuration: this.finalProjectDuration || '',
                level: this.level || '',
                additionalInfo: this.additionalInfo || '',
                notes: this.notes || '',
                outputLanguage: this.outputLanguage || 'English',
            };

            this.generatedPrompt = this.generatePromptEnglish(fields);
        },
        generatePromptEnglish({ topic, duration, dailyTheoryTime, dailyPracticeTime, finalProjectDuration, level, additionalInfo, notes, outputLanguage }) {
            return `Topic: ${topic}
Duration: ${duration} WEEKS
Daily theory time: ${dailyTheoryTime} minutes
Daily practice time: ${dailyPracticeTime} minutes
Final project duration: ${finalProjectDuration} weeks
Level: ${level}
Additional information to consider: ${additionalInfo}
Notes: ${notes}
---
Develop a syllabus for an intensive course for ${level} level students. The course should allow for one hour daily, divided between theory and practice (Monday to Friday), with the last two days (Saturday and Sunday) dedicated to practicing what was learned during the week. Additionally, a problem should be created for the last two days to practice what was covered during the week.

Theory: Provide a concise introduction to key concepts of the topic, appropriate for the students' level.

Practice: Apply theoretical concepts through practical exercises or small projects.

Integrative Project: Consolidate and apply all weekly learnings in a practical and challenging project.

Final Project: Create a final project demonstrating acquired understanding and skills.

The goal is to complete a weekly integrative project to reinforce acquired skills and knowledge. Guidance is appreciated to structure the content, ensuring a balance between theory and practice, and that each weekly project is an effective learning milestone.

At the beginning of the syllabus, add the title and a brief course description. Create the syllabus in markdown in ${outputLanguage}, also change the titles, subtitles, all to ${outputLanguage}. Don't forget to generate the links within the markdown for Day N, Theory, and Practice.

Markdown format:

# **Course: ${topic}**

## **Course Description**

## **Week <N>: <SUBTOPIC>**

### **[Day <N>: <SUBTOPIC N>](#)**
- **[Theory](#)**: <BRIEF DESCRIPTION OF THE SUBTOPIC>
- **[Practice](#)**: <NAME OF THE SUBTOPIC PRACTICE>.
  - <LIST OF STEPS TO FOLLOW IN THIS PRACTICE>`;
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
