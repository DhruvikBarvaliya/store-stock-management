const express = require("express");
const router = express.Router();
const requisitionController = require("../controllers/requisitionController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Requisition:
 *       type: object
 *       required:
 *         - item
 *         - quantity
 *         - requestedBy
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the requisition
 *         item:
 *           type: string
 *           description: The item requested
 *         quantity:
 *           type: integer
 *           description: The quantity of the item requested
 *         requestedBy:
 *           type: string
 *           description: The name of the person who requested the item
 *         status:
 *           type: string
 *           description: The status of the requisition
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the requisition was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the requisition was last updated
 *       example:
 *         id: 1
 *         item: "Laptop"
 *         quantity: 10
 *         requestedBy: "John Doe"
 *         status: "Pending"
 *         createdAt: "2023-05-28T08:00:00Z"
 *         updatedAt: "2023-05-28T08:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Requisitions
 *   description: The requisition managing API
 */

/**
 * @swagger
 * /requisitions:
 *   post:
 *     summary: Create a new requisition
 *     tags: [Requisitions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Requisition'
 *     responses:
 *       201:
 *         description: The requisition was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requisition'
 *       500:
 *         description: Some server error
 */
router.post("/", requisitionController.createRequisition);

/**
 * @swagger
 * /requisitions:
 *   get:
 *     summary: Get all requisitions
 *     tags: [Requisitions]
 *     responses:
 *       200:
 *         description: List of all requisitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Requisition'
 */
router.get("/", requisitionController.getAllRequisitions);

/**
 * @swagger
 * /requisitions/{id}:
 *   get:
 *     summary: Get a requisition by ID
 *     tags: [Requisitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The requisition ID
 *     responses:
 *       200:
 *         description: The requisition description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requisition'
 *       404:
 *         description: The requisition was not found
 */
router.get("/:id", requisitionController.getRequisitionById);

/**
 * @swagger
 * /requisitions/{id}:
 *   put:
 *     summary: Update a requisition by ID
 *     tags: [Requisitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The requisition ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Requisition'
 *     responses:
 *       200:
 *         description: The requisition was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Requisition'
 *       404:
 *         description: The requisition was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", requisitionController.updateRequisition);

/**
 * @swagger
 * /requisitions/{id}:
 *   delete:
 *     summary: Delete a requisition by ID
 *     tags: [Requisitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The requisition ID
 *     responses:
 *       200:
 *         description: The requisition was deleted
 *       404:
 *         description: The requisition was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", requisitionController.deleteRequisition);

module.exports = router;
