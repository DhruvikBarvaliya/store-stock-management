const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Inventory:
 *       type: object
 *       required:
 *         - itemName
 *         - quantity
 *         - location
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the inventory item
 *         itemName:
 *           type: string
 *           description: The name of the inventory item
 *         quantity:
 *           type: integer
 *           description: The quantity of the inventory item
 *         location:
 *           type: string
 *           description: The location of the inventory item
 *         status:
 *           type: string
 *           description: The status of the inventory item
 *       example:
 *         id: 1
 *         itemName: Widget
 *         quantity: 100
 *         location: Warehouse A
 *         status: Available
 */

/**
 * @swagger
 * tags:
 *   name: Inventories
 *   description: The inventory managing API
 */

/**
 * @swagger
 * /inventories:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       201:
 *         description: The inventory item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       500:
 *         description: Some server error
 */
router.post("/", inventoryController.createInventory);

/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventories]
 *     responses:
 *       200:
 *         description: List of all inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 */
router.get("/", async (req, res) => {
  try {
    const inventories = await Inventory.findAll();
    res.status(200).json(inventories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inventory items" });
  }
});

/**
 * @swagger
 * /inventories/{id}:
 *   get:
 *     summary: Get an inventory item by ID
 *     tags: [Inventories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The inventory item ID
 *     responses:
 *       200:
 *         description: The inventory item description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: The inventory item was not found
 */
router.get("/", inventoryController.getAllInventories);

/**
 * @swagger
 * /inventories/{id}:
 *   put:
 *     summary: Update an inventory item by ID
 *     tags: [Inventories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The inventory item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: The inventory item was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: The inventory item was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", inventoryController.updateInventory);

/**
 * @swagger
 * /inventories/{id}:
 *   delete:
 *     summary: Delete an inventory item by ID
 *     tags: [Inventories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The inventory item ID
 *     responses:
 *       200:
 *         description: The inventory item was deleted
 *       404:
 *         description: The inventory item was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;
