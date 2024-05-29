const express = require("express");
const router = express.Router();
const gatePassController = require("../controllers/gatePassController");

/**
 * @swagger
 * components:
 *   schemas:
 *     GatePass:
 *       type: object
 *       required:
 *         - gatePassNumber
 *         - vehicleNumber
 *         - issuedBy
 *         - issueDate
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the gate pass
 *         gatePassNumber:
 *           type: string
 *           description: The gate pass number
 *         vehicleNumber:
 *           type: string
 *           description: The vehicle number
 *         issuedBy:
 *           type: string
 *           description: The person who issued the gate pass
 *         issueDate:
 *           type: string
 *           format: date
 *           description: The date when the gate pass was issued
 *         status:
 *           type: string
 *           description: The status of the gate pass
 *       example:
 *         id: 1
 *         gatePassNumber: GP123
 *         vehicleNumber: ABC123
 *         issuedBy: User1
 *         issueDate: 2023-05-28
 *         status: Pending
 */

/**
 * @swagger
 * tags:
 *   name: GatePasses
 *   description: The gate pass managing API
 */

/**
 * @swagger
 * /gatePasses:
 *   post:
 *     summary: Create a new gate pass
 *     tags: [GatePasses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GatePass'
 *     responses:
 *       201:
 *         description: The gate pass was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GatePass'
 *       500:
 *         description: Some server error
 */
router.post("/", gatePassController.createGatePass);

/**
 * @swagger
 * /gatePasses:
 *   get:
 *     summary: Get all gate passes
 *     tags: [GatePasses]
 *     responses:
 *       200:
 *         description: List of all gate passes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GatePass'
 */
router.get("/", gatePassController.getAllGatePasses);

/**
 * @swagger
 * /gatePasses/{id}:
 *   get:
 *     summary: Get a gate pass by ID
 *     tags: [GatePasses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The gate pass ID
 *     responses:
 *       200:
 *         description: The gate pass description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GatePass'
 *       404:
 *         description: The gate pass was not found
 */
router.get("/:id", gatePassController.getGatePassById);

/**
 * @swagger
 * /gatePasses/{id}:
 *   put:
 *     summary: Update a gate pass by ID
 *     tags: [GatePasses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The gate pass ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GatePass'
 *     responses:
 *       200:
 *         description: The gate pass was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GatePass'
 *       404:
 *         description: The gate pass was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", gatePassController.updateGatePass);

/**
 * @swagger
 * /gatePasses/{id}:
 *   delete:
 *     summary: Delete a gate pass by ID
 *     tags: [GatePasses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The gate pass ID
 *     responses:
 *       200:
 *         description: The gate pass was deleted
 *       404:
 *         description: The gate pass was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", gatePassController.deleteGatePass);
module.exports = router;
