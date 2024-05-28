const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

/**
 * @swagger
 * tags:
 * name: Documents
 * description: Documents management
 */

/**
 * @swagger
 * /documents:
 * post:
 * summary: Create a new document
 * tags: [Documents]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - title
 * - description
 * - filePath
 * properties:
 * title:
 * type: string
 * description:
 * type: string
 * filePath:
 * type: string
 * responses:
 * 201:
 * description: The document was created successfully
 * 500:
 * description: Some server error
 */
router.post('/', documentController.createDocument);

/**
 * @swagger
 * /documents:
 * get:
 * summary: Get all documents
 * tags: [Documents]
 * responses:
 * 200:
 * description: List of all documents
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * title:
 * type: string
 * description:
 * type: string
 * filePath:
 * type: string
 * 500:
 * description: Some server error
 */
router.get('/', documentController.getAllDocuments);

/**
 * @swagger
 * /documents/{id}:
 * get:
 * summary: Get a document by ID
 * tags: [Documents]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: A document
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * title:
 * type: string
 * description:
 * type: string
 * filePath:
 * type: string
 * 404:
 * description: Document not found
 * 500:
 * description: Some server error
 */
router.get('/:id', documentController.getDocumentById);

/**
 * @swagger
 * /documents/{id}:
 * put:
 * summary: Update a document by ID
 * tags: [Documents]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * description:
 * type: string
 * filePath:
 * type: string
 * responses:
 * 200:
 * description: The document was updated successfully
 * 404:
 * description: Document not found
 * 500:
 * description: Some server error
 */
router.put('/:id', documentController.updateDocument);

/**
 * @swagger
 * /documents/{id}:
 * delete:
 * summary: Delete a document by ID
 * tags: [Documents]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: The document was deleted successfully
 * 404:
 * description: Document not found
 * 500:
 * description: Some server error
 */
router.delete('/:id', documentController.deleteDocument);

module.exports = router;