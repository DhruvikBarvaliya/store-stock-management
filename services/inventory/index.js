const express = require('express');
const router = express.Router();
const inventoryRoutes = require('./routes/inventoryRoutes');

router.use('/inventory', inventoryRoutes);

module.exports = router;