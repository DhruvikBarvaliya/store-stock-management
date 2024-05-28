const express = require('express');
const router = express.Router();
const gatePassRoutes = require('./routes/gatePassRoutes');

router.use('/gate-pass', gatePassRoutes);

module.exports = router;