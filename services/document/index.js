const express = require('express');
const router = express.Router();
const documentRoutes = require('./routes/documentRoutes');

router.use('/documents', documentRoutes);

module.exports = router;