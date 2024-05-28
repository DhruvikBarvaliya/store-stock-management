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
 * summary: Add a new inventory item
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
 * properties:
 * itemName:
 * type: string
 * quantity:
 * type: integer
 * location:
 * type: string
 * responses:
 * 201:
 * description: The inventory item was added successfully
 * 500:
 * description: Some server error
 */
router.post('/', inventoryController.addInventoryItem);

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
 * 500:
 * description: Some server error
 */
router.get('/', inventoryController.getInventoryList);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const inventoryController = require('../controllers/inventoryController');
// const authMiddleware = require('../../auth/middleware/authMiddleware');

// /**
//  * @swagger
//  * components:
//  * schemas:
//  * InventoryItem:
//  * type: object
//  * required:
//  * - name
//  * - quantity
//  * - location
//  * properties:
//  * id:
//  * type: integer
//  * description: The auto-generated id of the inventory item
//  * name:
//  * type: string
//  * description: The name of the inventory item
//  * quantity:
//  * type: integer
//  * description: The quantity of the inventory item
//  * location:
//  * type: string
//  * description: The location of the inventory item
//  * example:
//  * id: 1
//  * name: Widget
//  * quantity: 100
//  * location: Main Warehouse
//  */

// /**
//  * @swagger
//  * tags:
//  * name: Inventory
//  * description: The inventory managing API
//  */

// /**
//  * @swagger
//  * /api/inventory:
//  * post:
//  * summary: Create a new inventory item
//  * tags: [Inventory]
//  * requestBody:
//  * required: true
//  * content:
//  * application/json:
//  * schema:
//  * $ref: '#/components/schemas/InventoryItem'
//  * responses:
//  * 201:
//  * description: The inventory item was successfully created
//  * content:
//  * application/json:
//  * schema:
//  * $ref: '#/components/schemas/InventoryItem'
//  * 500:
//  * description: Some server error
//  */
// router.post('/', authMiddleware, inventoryController.addItem);

// /**
//  * @swagger
//  * /api/inventory:
//  * get:
//  * summary: Returns the list of all the inventory items
//  * tags: [Inventory]
//  * responses:
//  * 200:
//  * description: The list of the inventory items
//  * content:
//  * application/json:
//  * schema:
//  * type: array
//  * items:
//  * $ref: '#/components/schemas/InventoryItem'
//  */
// router.get('/', authMiddleware, inventoryController.getItems);

// /**
//  * @swagger
//  * /api/inventory/{id}:
//  * get:
//  * summary: Get the inventory item by id
//  * tags: [Inventory]
//  * parameters:
//  * - in: path
//  * name: id
//  * schema:
//  * type: integer
//  * required: true
//  * description: The inventory item id
//  * responses:
//  * 200:
//  * description: The inventory item description by id
//  * content:
//  * application/json:
//  * schema:
//  * $ref: '#/components/schemas/InventoryItem'
//  * 404:
//  * description: The inventory item was not found
//  * 500:
//  * description: Some error happened
//  */
// router.get('/:id', authMiddleware, inventoryController.getItemById);

// /**
//  * @swagger
//  * /api/inventory/{id}:
//  * put:
//  * summary: Update the inventory item by the id
//  * tags: [Inventory]
//  * parameters:
//  * - in: path
//  * name: id
//  * schema:
//  * type: integer
//  * required: true
//  * description: The inventory item id
//  * requestBody:
//  * required: true
//  * content:
//  * application/json:
//  * schema:
//  * $ref: '#/components/schemas/InventoryItem'
//  * responses:
//  * 200:
//  * description: The inventory item was updated
//  * content:
//  * application/json:
//  * schema:
//  * $ref: '#/components/schemas/InventoryItem'
//  * 404:
//  * description: The inventory item was not found
//  * 500:
//  * description: Some error happened
//  */
// router.put('/:id', authMiddleware, inventoryController.updateItem);

// /**
//  * @swagger
//  * /api/inventory/{id}:
//  * delete:
//  * summary: Remove the inventory item by id
//  * tags: [Inventory]
//  * parameters:
//  * - in: path
//  * name: id
//  * schema:
//  * type: integer
//  * required: true
//  * description: The inventory item id
//  * responses:
//  * 204:
//  * description: The inventory item was deleted
//  * 404:
//  * description: The inventory item was not found
//  * 500:
//  * description: Some error happened
//  */
// router.delete('/:id', authMiddleware, inventoryController.deleteItem);

// module.exports = router;