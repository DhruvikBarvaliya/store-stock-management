const express = require("express");
const router = express.Router();
const gatePassController = require("../controllers/gatePassController");

/**
 * @swagger
 * tags:
 * name: GatePass
 * description: GatePass management
 */

/**
 * @swagger
 * /gatePasses:
 * post:
 * summary: Create a new gate pass
 * tags: [GatePass]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - passNumber
 * - vehicleNumber
 * - driverName
 * - issueDate
 * - status
 * properties:
 * passNumber:
 * type: string
 * vehicleNumber:
 * type: string
 * driverName:
 * type: string
 * issueDate:
 * type: string
 * format: date
 * status:
 * type: string
 * responses:
 * 201:
 * description: The gate pass was created successfully
 * 500:
 * description: Some server error
 */
router.post('/', gatePassController.createGatePass);

/**
 * @swagger
 * /gatePasses:
 * get:
 * summary: Get all gate passes
 * tags: [GatePass]
 * responses:
 * 200:
 * description: List of all gate passes
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * passNumber:
 * type: string
 * vehicleNumber:
 * type: string
 * driverName:
 * type: string
 * issueDate:
 * type: string
 * format: date
 * status:
 * type: string
 * 500:
 * description: Some server error
 */
router.get('/', gatePassController.getAllGatePasses);

/**
 * @swagger
 * /gatePasses/{id}:
 * get:
 * summary: Get a gate pass by ID
 * tags: [GatePass]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: A gate pass
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * passNumber:
 * type: string
 * vehicleNumber:
 * type: string
 * driverName:
 * type: string
 * issueDate:
 * type: string
 * format: date
 * status:
 * type: string
 * 404:
 * description: Gate pass not found
 * 500:
 * description: Some server error
 */
router.get('/:id', gatePassController.getGatePassById);

/**
 * @swagger
 * /gatePasses/{id}:
 * put:
 * summary: Update a gate pass by ID
 * tags: [GatePass]
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
 * passNumber:
 * type: string
 * vehicleNumber:
 * type: string
 * driverName:
 * type: string
 * issueDate:
 * type: string
 * format: date
 * status:
 * type: string
 * responses:
 * 200:
 * description: The gate pass was updated successfully
 * 404:
 * description: Gate pass not found
 * 500:
 * description: Some server error
 */
router.put('/:id', gatePassController.updateGatePass);

/**
 * @swagger
 * /gatePasses/{id}:
 * delete:
 * summary: Delete a gate pass by ID
 * tags: [GatePass]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: The gate pass was deleted successfully
 * 404:
 * description: Gate pass not found
 * 500:
 * description: Some server error
 */

router.delete('/:id', gatePassController.deleteGatePass);
module.exports = router;