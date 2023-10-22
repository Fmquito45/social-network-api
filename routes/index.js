const router = require('express').Router(); 
const apiRoutes = require('./api');
router.use('/api',apiRoutes);
router.use((req, res)=>{
    return res.status(500).send('Invalid Route');
});

module.exports = router;