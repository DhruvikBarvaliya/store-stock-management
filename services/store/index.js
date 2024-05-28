const express = require('express');
const router = express.Router();
const storeRoutes = require('./routes/storeRoutes');

router.use('/stores', storeRoutes);

module.exports = router;
