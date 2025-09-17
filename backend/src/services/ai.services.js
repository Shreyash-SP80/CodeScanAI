
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

// Load .env variables
dotenv.config();

// Function to create AI instance with specific API key
function createAIInstance(apiKey = null) {
  // Use provided API key or fall back to environment variable
  const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;
  
  return new GoogleGenAI({
    apiKey: effectiveApiKey,
  });
}
 
const model = "gemini-2.5-flash";

// function to generate response from ai
async function generateData(prompt, userApiKey = null) {
  try {
    // Create AI instance with the appropriate API key
    const ai = createAIInstance(userApiKey);
    
    const result = await ai.models.generateContent({
      model,
      systemInstruction: {
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
      contents: [
        { role: "user", parts: [{ text: prompt }] }
      ],
    });

    // Try the official helper first
    if (result?.response?.text) {
      const output = result.response.text();
      return output;
    }

    // Fallback: extract from candidates manually
    const output =
      result?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No text found";

    return output;
  } catch (err) {
    console.error("Error:", err.message);
    
    // Handle specific error cases
    if (err.message.includes('API key not valid')) {
      throw new Error('API key not valid');
    } else if (err.message.includes('Quota exceeded')) {
      throw new Error('Quota exceeded');
    } else {
      throw err; // Re-throw other errors
    }
  }
}

module.exports = generateData;
