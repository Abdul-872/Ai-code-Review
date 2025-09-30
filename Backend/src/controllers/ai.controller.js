// ai.controller.js
const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;
    
    // Validate input
    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        error: "Code is required and must be a string",
        success: false
      });
    }

    if (code.trim().length === 0) {
      return res.status(400).json({
        error: "Code cannot be empty",
        success: false
      });
    }

    // Call AI service
    const response = await aiService(code);
    
    // Return successful response
    res.json({
      review: response,
      success: true
    });
    
  } catch (error) {
    console.error("AI Controller Error:", error.message);
    
    // Return detailed error information
    res.status(500).json({
      error: error.message || "Something went wrong with the AI service",
      success: false
    });
  }
};
