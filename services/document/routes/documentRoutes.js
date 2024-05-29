const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the document
 *         title:
 *           type: string
 *           description: The title of the document
 *         content:
 *           type: string
 *           description: The content of the document
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the document was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the document was last updated
 *       example:
 *         id: 1
 *         title: "Document Title"
 *         content: "This is the content of the document."
 *         createdAt: "2023-05-28T08:00:00Z"
 *         updatedAt: "2023-05-28T08:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: The document managing API
 */

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Create a new document
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       201:
 *         description: The document was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       500:
 *         description: Some server error
 */
router.post("/", documentController.createDocument);

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of all documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 */
router.get("/", documentController.getAllDocuments);

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     summary: Get a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The document ID
 *     responses:
 *       200:
 *         description: The document description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: The document was not found
 */
router.get("/:id", documentController.getDocumentById);

/**
 * @swagger
 * /documents/{id}:
 *   put:
 *     summary: Update a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       200:
 *         description: The document was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: The document was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", documentController.updateDocument);

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     summary: Delete a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The document ID
 *     responses:
 *       200:
 *         description: The document was deleted
 *       404:
 *         description: The document was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", documentController.deleteDocument);

module.exports = router;
