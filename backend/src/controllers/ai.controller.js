const aiService = require('../services/ai.services') // importing ai service

// controller function to get review from ai
module.exports.getReview = async (req, res) => {
    const code = req.body.code; // getting code from request body

    if (!code) { // if code is missing
        return res.status(400).send("Prompt is required!") // send error response
    }

    const response = await aiService(code) // call ai service with code

    res.send(response) // send ai response back to client
}
