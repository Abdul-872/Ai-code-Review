// ai.service.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction:`
    you are a code reviewer, who have an experties in development,you look for the code and find the problem and uggest th solution to the developer,

    you always try to find the best solution for the developer and also try to make the code more efficient and clean 
    `

 });

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;
