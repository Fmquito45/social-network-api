const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const thoughtRoutes = require('./thoughtRoutes.js');

// endpoint for user
router.use('/users', userRoutes);
// endpoint for thought
router.use('/thoughts', thoughtRoutes);
// exports router
module.exports = router;