
const aiService = require('../services/ai.services')

// controller function to get review from ai
module.exports.getReview = async (req, res) => {
    const code = req.body.code; // getting code from request body
    const userApiKey = req.body.apiKey; // getting API key from request body

    if (!code) { // if code is missing
        return res.status(400).send("Code is required!") // send error response
    }
 
    try {
      const response = await aiService(code, userApiKey) // call ai service with code and API key
      res.send(response) // send ai response back to client
    } catch (error) {
      console.error("Error in getReview:", error.message);
      
      // Handle specific error cases
      if (error.message === 'API key not valid') {
        return res.status(401).send('Invalid API key. Please check your API key and try again.');
      } else if (error.message === 'Quota exceeded') {
        return res.status(429).send('API quota exceeded. Please try again later or use your own API key.');
      } else {
        return res.status(500).send('An error occurred while processing your request.');
      }
    }
}
