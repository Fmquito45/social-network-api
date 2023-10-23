// Import packages and files
const express = require('express');
const db = require('./config/connection.js');
const routes = require('./routes');

// Set up environment variables
const PORT = process.env.PORT || 3001;
const app = express();
// Use middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// route
app.use(routes); 
// MongoDB connected and server started
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });