const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Store:
 *       type: object
 *       required:
 *         - name
 *         - location
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the store
 *         name:
 *           type: string
 *           description: The name of the store
 *         location:
 *           type: string
 *           description: The location of the store
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the store was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the store was last updated
 *       example:
 *         id: 1
 *         name: "Main Store"
 *         location: "Downtown"
 *         createdAt: "2023-05-28T08:00:00Z"
 *         updatedAt: "2023-05-28T08:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: The store managing API
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       201:
 *         description: The store was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       500:
 *         description: Some server error
 */
router.post("/", storeController.createStore);

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: List of all stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 */
router.get("/", storeController.getAllStores);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get a store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The store ID
 *     responses:
 *       200:
 *         description: The store description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: The store was not found
 */
router.get("/:id", storeController.getStoreById);

/**
 * @swagger
 * /stores/{id}:
 *   put:
 *     summary: Update a store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The store ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       200:
 *         description: The store was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: The store was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", storeController.updateStore);

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     summary: Delete a store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The store ID
 *     responses:
 *       200:
 *         description: The store was deleted
 *       404:
 *         description: The store was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", storeController.deleteStore);

module.exports = router;
