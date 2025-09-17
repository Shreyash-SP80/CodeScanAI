const express = require('express') // express framework
const aiController = require('../controllers/ai.controller') // importing ai controller file
const router = express.Router() // creating router object

// route to get code review from ai
router.post("/get-review", aiController.getReview)

module.exports = router // exporting router so it can be used in app.js
 
