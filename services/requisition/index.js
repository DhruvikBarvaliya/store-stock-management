const express = require('express');
const router = express.Router();
const requisitionRoutes = require('./routes/requisitionRoutes');

router.use('/requisitions', requisitionRoutes);

module.exports = router;