const express = require('express');
const router = express.Router();
const gatePassRoutes = require('./routes/gatePassRoutes');

router.use('/gatePasses', gatePassRoutes);

module.exports = router;