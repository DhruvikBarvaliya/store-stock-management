const express = require('express');
const router = express.Router();
const requisitionController = require('../controllers/requisitionController');
const authMiddleware = require('../../auth/middleware/authMiddleware');

/**
 * @swagger
 * components:
 * schemas:
 * Requisition:
 * type: object
 * required:
 * - itemName
 * - quantity
 * - requestedBy
 * properties:
 * id:
 * type: integer
 * description: The auto-generated id of the requisition
 * itemName:
 * type: string
 * description: The name of the item
 * quantity:
 * type: integer
 * description: The quantity of the item
 * requestedBy:
 * type: string
 * description: The name of the person requesting the item
 * status:
 * type: string
 * enum: [pending, approved, rejected]
 * description: The status of the requisition
 * example:
 * id: 1
 * itemName: Widget
 * quantity: 100
 * requestedBy: John Doe
 * status: pending
 */

/**
 * @swagger
 * tags:
 * name: Requisition
 * description: The requisition managing API
 */

/**
 * @swagger
 * /api/requisition:
 * post:
 * summary: Create a new requisition
 * tags: [Requisition]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Requisition'
 * responses:
 * 201:
 * description: The requisition was successfully created
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Requisition'
 * 500:
 * description: Some server error
 */
router.post('/', authMiddleware, requisitionController.createRequisition);

/**
 * @swagger
 * /api/requisition:
 * get:
 * summary: Returns the list of all the requisitions
 * tags: [Requisition]
 * responses:
 * 200:
 * description: The list of the requisitions
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Requisition'
 */
router.get('/', authMiddleware, requisitionController.getRequisitions);

/**
 * @swagger
 * /api/requisition/{id}:
 * get:
 * summary: Get the requisition by id
 * tags: [Requisition]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: The requisition id
 * responses:
 * 200:
 * description: The requisition description by id
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Requisition'
 * 404:
 * description: The requisition was not found
 * 500:
 * description: Some error happened
 */
router.get('/:id', authMiddleware, requisitionController.getRequisitionById);

/**
 * @swagger
 * /api/requisition/{id}:
 * put:
 * summary: Update the requisition by the id
 * tags: [Requisition]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: The requisition id
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Requisition'
 * responses:
 * 200:
 * description: The requisition was updated
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Requisition'
 * 404:
 * description: The requisition was not found
 * 500:
 * description: Some error happened
 */
router.put('/:id', authMiddleware, requisitionController.updateRequisition);

/**
 * @swagger
 * /api/requisition/{id}:
 * delete:
 * summary: Remove the requisition by id
 * tags: [Requisition]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: The requisition id
 * responses:
 * 204:
 * description: The requisition was deleted
 * 404:
 * description: The requisition was not found
 * 500:
 * description: Some error happened
 */
router.delete('/:id', authMiddleware, requisitionController.deleteRequisition);

module.exports = router;