// ai.service.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Check if API key is available
if (!process.env.GOOGLE_GEMINI_KEY) {
  throw new Error("GOOGLE_GEMINI_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", // Fixed: changed from gemini-2.5-flash to gemini-1.5-flash
    systemInstruction: `
    You are a code reviewer with expertise in development. You look at the code and find problems and suggest solutions to the developer.

    You always try to find the best solution for the developer and also try to make the code more efficient and clean.
    
    Please provide:
    1. Issues found in the code
    2. Suggestions for improvement
    3. Best practices recommendations
    4. Code optimization tips if applicable
    `
});

async function generateContent(prompt) {
  try {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error("Valid prompt is required");
    }
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    if (!response) {
      throw new Error("No response received from Gemini API");
    }
    
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    
    // Handle specific API errors
    if (error.message.includes('API_KEY_INVALID')) {
      throw new Error("Invalid API key. Please check your Gemini API key.");
    }
    
    if (error.message.includes('QUOTA_EXCEEDED')) {
      throw new Error("API quota exceeded. Please try again later.");
    }
    
    if (error.message.includes('MODEL_NOT_FOUND')) {
      throw new Error("Model not found. Please check the model name.");
    }
    
    // Re-throw with more context
    throw new Error(`AI service error: ${error.message}`);
  }
}

module.exports = generateContent;
