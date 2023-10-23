const router = require('express').Router(); 
const apiRoutes = require('./api');
// endpoint set
router.use('/api',apiRoutes);
router.use((req, res)=>{
    return res.status(500).send('Invalid Route');
});
// exports router
module.exports = router;