const express = require('express'); // express framework for creating server
const aiRoutes = require('./routes/ai.routes'); // importing my ai routes file
const cors = require('cors'); // cors for handling cross-origin requests

const app = express(); // creating express app

// CORS configuration - allow all origins for now
app.use(cors()); // using cors so frontend can talk with backend
 
// Body parsing middleware
app.use(express.json({ limit: '10mb' })); // to read json body data with max 10mb size

// Test endpoint
app.get('/', (req, res) => {  // simple test route
  res.status(200).json({ 
    status: 'OK',  // response status
    message: 'Server is running', // message to check if server is working
    timestamp: new Date().toISOString() // current time in ISO format
  });
});

// API routes
app.use('/ai', aiRoutes); // using ai routes on /ai path

// 404 handler
app.use((req, res) => { // if route not found
  res.status(404).json({ error: 'Route not found' }); // send 404 response
});

// Error handling middleware
app.use((err, req, res, next) => { // global error handler
  console.error(err.stack); // print error in console
  res.status(500).json({ error: 'Something went wrong!' }); // send 500 response
});

module.exports = app; // exporting app so i can use it in other file
