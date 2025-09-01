const dotenv = require("dotenv"); // dotenv to load environment variables
const { GoogleGenAI } = require("@google/genai"); // importing google genai sdk

// Load .env variables
dotenv.config(); // loads variables from .env file into process.env

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // using gemini api key from .env file
});

const model = "gemini-2.5-flash"; // setting model name to use

// function to generate response from ai
async function generateData(prompt) {
  try {
        const result = await ai.models.generateContent({
        model, // model name
        systemInstruction: { // giving system role instruction
            role: "system",
            parts: [
              { text: `You are an expert code reviewer with 7+ years of development experience. Your role is to analyze, review, and improve code written by developers. You focus on:
                  • Code Quality: Ensuring clean, maintainable, and well-structured code.
                  • Best Practices: Suggesting industry-standard coding practices.
                  • Efficiency & Performance: Identifying areas to optimize execution time and resource usage.
                  • Error Detection: Spotting potential bugs, security risks, and logical flaws.
                  • Scalability: Advising on how to make code adaptable for future growth.
                  • Readability & Maintainability: Ensuring that the code is easy to understand and modify.

                  Provide feedback in the following format:
                  1. Start with a brief overall assessment
                  2. List specific issues with ❌ emoji
                  3. Provide recommended fixes with ✅ emoji
                  4. Suggest improvements with 💡 emoji
                  5. End with a summary

                  Be precise, constructive, and offer real-world examples when explaining concepts. Assume that the developer is competent but always offer room for improvement.
              ` }
            ],
        },
        contents: [ // passing user input
            { role: "user", parts: [{ text: prompt }] }
        ],
        });

        // Try the official helper first
        if (result?.response?.text) { // check if response text is available
        const output = result.response.text(); // get output text
        // console.log("Prompt:", prompt);
        // console.log("Result:", output);
        return output; // return result
    }

    // Fallback: extract from candidates manually
    const output =
      result?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No text found";

    // console.log("Prompt:", prompt);
    // console.log("Result:", output);

    return output; // return fallback output
  } catch (err) {
    console.error("Error:", err.message); // log error if any
    return null; // return null on error
  }
}

module.exports = generateData; // exporting function to use in other files
