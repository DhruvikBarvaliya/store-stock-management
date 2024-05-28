const express = require('express');
const router = express.Router();
const requisitionController = require('../controllers/requisitionController');

/**
 * @swagger
 * tags:
 * name: Requisitions
 * description: Requisitions management
 */

/**
 * @swagger
 * /requisitions:
 * post:
 * summary: Create a new requisition
 * tags: [Requisitions]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - requisitionNumber
 * - requester
 * - totalAmount
 * - status
 * properties:
 * requisitionNumber:
 * type: string
 * requester:
 * type: string
 * totalAmount:
 * type: number
 * format: float
 * status:
 * type: string
 * responses:
 * 201:
 * description: The requisition was created successfully
 * 500:
 * description: Some server error
 */
router.post('/', requisitionController.createRequisition);

/**
 * @swagger
 * /requisitions:
 * get:
 * summary: Get all requisitions
 * tags: [Requisitions]
 * responses:
 * 200:
 * description: List of all requisitions
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * requisitionNumber:
 * type: string
 * requester:
 * type: string
 * totalAmount:
 * type: number
 * format: float
 * status:
 * type: string
 * 500:
 * description: Some server error
 */
router.get('/', requisitionController.getAllRequisitions);

/**
 * @swagger
 * /requisitions/{id}:
 * get:
 * summary: Get a requisition by ID
 * tags: [Requisitions]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: A requisition
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * requisitionNumber:
 * type: string
 * requester:
 * type: string
 * totalAmount:
 * type: number
 * format: float
 * status:
 * type: string
 * 404:
 * description: Requisition not found
 * 500:
 * description: Some server error
 */
router.get('/:id', requisitionController.getRequisitionById);

/**
 * @swagger
 * /requisitions/{id}:
 * put:
 * summary: Update a requisition by ID
 * tags: [Requisitions]
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
 * requisitionNumber:
 * type: string
 * requester:
 * type: string
 * totalAmount:
 * type: number
 * format: float
 * status:
 * type: string
 * responses:
 * 200:
 * description: The requisition was updated successfully
 * 404:
 * description: Requisition not found
 * 500:
 * description: Some server error
 */
router.put('/:id', requisitionController.updateRequisition);

/**
 * @swagger
 * /requisitions/{id}:
 * delete:
 * summary: Delete a requisition by ID
 * tags: [Requisitions]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: The requisition was deleted successfully
 * 404:
 * description: Requisition not found
 * 500:
 * description: Some server error
 */
router.delete('/:id', requisitionController.deleteRequisition);

module.exports = router;