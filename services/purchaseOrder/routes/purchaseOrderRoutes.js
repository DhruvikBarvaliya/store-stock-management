const express = require("express");
const router = express.Router();
const purchaseOrderController = require("../controllers/purchaseOrderController");

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseOrder:
 *       type: object
 *       required:
 *         - item
 *         - quantity
 *         - supplier
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the purchase order
 *         item:
 *           type: string
 *           description: The item ordered
 *         quantity:
 *           type: integer
 *           description: The quantity of the item ordered
 *         supplier:
 *           type: string
 *           description: The supplier of the item
 *         status:
 *           type: string
 *           description: The status of the purchase order
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the purchase order was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the purchase order was last updated
 *       example:
 *         id: 1
 *         item: "Laptop"
 *         quantity: 10
 *         supplier: "ABC Supplies"
 *         status: "Pending"
 *         createdAt: "2023-05-28T08:00:00Z"
 *         updatedAt: "2023-05-28T08:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: PurchaseOrders
 *   description: The purchase order managing API
 */

/**
 * @swagger
 * /purchaseOrders:
 *   post:
 *     summary: Create a new purchase order
 *     tags: [PurchaseOrders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseOrder'
 *     responses:
 *       201:
 *         description: The purchase order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 *       500:
 *         description: Some server error
 */
router.post("/", purchaseOrderController.createPurchaseOrder);

/**
 * @swagger
 * /purchaseOrders:
 *   get:
 *     summary: Get all purchase orders
 *     tags: [PurchaseOrders]
 *     responses:
 *       200:
 *         description: List of all purchase orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseOrder'
 */
router.get("/", purchaseOrderController.getAllPurchaseOrders);

/**
 * @swagger
 * /purchaseOrders/{id}:
 *   get:
 *     summary: Get a purchase order by ID
 *     tags: [PurchaseOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The purchase order ID
 *     responses:
 *       200:
 *         description: The purchase order description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 *       404:
 *         description: The purchase order was not found
 */
router.get("/:id", purchaseOrderController.getPurchaseOrderById);

/**
 * @swagger
 * /purchaseOrders/{id}:
 *   put:
 *     summary: Update a purchase order by ID
 *     tags: [PurchaseOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The purchase order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseOrder'
 *     responses:
 *       200:
 *         description: The purchase order was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseOrder'
 *       404:
 *         description: The purchase order was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", purchaseOrderController.updatePurchaseOrder);

/**
 * @swagger
 * /purchase-orders/{id}:
 *   delete:
 *     summary: Delete a purchase order by ID
 *     tags: [Purchase Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The purchase order ID
 *     responses:
 *       200:
 *         description: The purchase order was deleted
 *       404:
 *         description: The purchase order was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", purchaseOrderController.deletePurchaseOrder);

module.exports = router;
