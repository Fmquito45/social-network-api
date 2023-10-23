// Import the mongoose 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONOGDB_URI || 'mongodb://localhost:27017/networkDB');
// Export connection 
module.exports = mongoose.connection