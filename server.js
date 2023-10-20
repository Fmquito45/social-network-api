// Import packages and files
const express =  require('express');
const db = require('./config/connection.js');


// Set up environment variables
const PORT = process.env.PORT || 3001;
const app = express();
// Use middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });