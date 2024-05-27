
const express = require('express');
const documentController = require('../controllers/documentController');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload());

/**
 * @swagger
 * components:
 * schemas:
 * Document:
 * type: object
 * required:
 * - name
 * - path
 * properties:
 * id:
 * type: string
 * description: The auto-generated ID of the document
 * name:
 * type: string
 * description: The name of the document
 * path:
 * type: string
 * description: The path to the document file
 * example:
 * name: sample.docx
 * path: /path/to/sample.docx
 */

/**
 * @swagger
 * tags:
 * name: Documents
 * description: API endpoints for managing documents
 */

/**
 * @swagger
 * /api/documents:
 * post:
 * summary: Upload a document
 * tags: [Documents]
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * document:
 * type: string
 * format: binary
 * responses:
 * 201:
 * description: Document uploaded successfully
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Document'
 * 500:
 * description: Internal server error
 */
router.post('/', documentController.uploadDocument);

/**
 * @swagger
 * /api/documents:
 * get:
 * summary: Get all documents
 * tags: [Documents]
 * responses:
 * 200:
 * description: List of documents
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Document'
 * 500:
 * description: Internal server error
 */
router.get('/', documentController.getDocuments);

module.exports = router;





// services/documents/index.js

const express = require('express');
const documentRoutes = require('./routes/documentRoutes');
const logger = require('../../../logs/logger');

const app = express();
app.use(express.json());

// Routes
app.use('/api/documents', documentRoutes);

// Error handler
app.use((err, req, res, next) => {
    logger.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;