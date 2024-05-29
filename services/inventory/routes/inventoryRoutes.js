const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

/**
 * @swagger
 * tags:
 * name: Inventory
 * description: Inventory management
 */

/**
 * @swagger
 * /inventory:
 * post:
 * summary: Create a new inventory item
 * tags: [Inventory]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - itemName
 * - quantity
 * - location
 * - status
 * properties:
 * itemName:
 * type: string
 * quantity:
 * type: integer
 * location:
 * type: string
 * status:
 * type: string
 * responses:
 * 201:
 * description: The inventory item was created successfully
 * 500:
 * description: Some server error
 */
router.post('/', inventoryController.createInventory);

/**
 * @swagger
 * /inventory:
 * get:
 * summary: Get all inventory items
 * tags: [Inventory]
 * responses:
 * 200:
 * description: List of all inventory items
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * itemName:
 * type: string
 * quantity:
 * type: integer
 * location:
 * type: string
 * status:
 * type: string
 * 500:
 * description: Some server error
 */
router.get('/', inventoryController.getAllInventories);

/**
 * @swagger
 * /inventory/{id}:
 * get:
 * summary: Get an inventory item by ID
 * tags: [Inventory]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: An inventory item
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * itemName:
 * type: string
 * quantity:
 * type: integer
 * location:
 * type: string
 * status:
 * type: string
 * 404:
 * description: Inventory item not found
 * 500:
 * description: Some server error
 */
router.get('/:id', inventoryController.getInventoryById);

/**
 * @swagger
 * /inventory/{id}:
 * put:
 * summary: Update an inventory item by ID
 * tags: [Inventory]
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
 * itemName:
 * type: string
 * quantity:
 * type: integer
 * location:
 * type: string
 * status:
 * type: string
 * responses:
 * 200:
 * description: The inventory item was updated successfully
 * 404:
 * description: Inventory item not found
 * 500:
 * description: Some server error
 */
router.put('/:id', inventoryController.updateInventory);

/**
 * @swagger
 * /inventory/{id}:
 * delete:
 * summary: Delete an inventory item by ID
 * tags: [Inventory]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: The inventory item was deleted successfully
 * 404:
 * description: Inventory item not found
 * 500:
 * description: Some server error
 */
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;