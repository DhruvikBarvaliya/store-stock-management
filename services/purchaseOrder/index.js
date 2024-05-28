const express = require('express');
const router = express.Router();
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');

router.use('/purchase-orders', purchaseOrderRoutes);

module.exports = router;