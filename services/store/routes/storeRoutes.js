
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const authMiddleware = require('../../auth/middleware/authMiddleware');

/**
 * @swagger
 * components:
 * schemas:
 * Store:
 * type: object
 * required:
 * - name
 * - location
 * properties:
 * id:
 * type: integer
 * description: The auto-generated id of the store
 * name:
 * type: string
 * description: The name of the store
 * location:
 * type: string
 * description: The location of the store
 * example:
 * id: 1
 * name: Main Store
 * location: Downtown
 */

/**
 * @swagger
 * tags:
 * name: Store
 * description: The store managing API
 */

/**
 * @swagger
 * /api/stores:
 * post:
 * summary: Create a new store
 * tags: [Store]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Store'
 * responses:
 * 201:
 * description: The store was successfully created
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Store'
 * 500:
 * description: Some server error
 */
router.post('/', authMiddleware, storeController.createStore);

/**
 * @swagger
 * /api/stores:
 * get:
 * summary: Returns the list of all stores
 * tags: [Store]
 * responses:
 * 200:
 * description: The list of stores
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Store'
 */
router.get('/', authMiddleware, storeController.getStores);

module.exports = router;