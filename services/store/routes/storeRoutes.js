const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

/**
 * @swagger
 * tags:
 * name: Stores
 * description: Stores management
 */

/**
 * @swagger
 * /stores:
 * post:
 * summary: Create a new store
 * tags: [Stores]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - location
 * - manager
 * - contact
 * properties:
 * name:
 * type: string
 * location:
 * type: string
 * manager:
 * type: string
 * contact:
 * type: string
 * responses:
 * 201:
 * description: The store was created successfully
 * 500:
 * description: Some server error
 */
router.post('/', storeController.createStore);

/**
 * @swagger
 * /stores:
 * get:
 * summary: Get all stores
 * tags: [Stores]
 * responses:
 * 200:
 * description: List of all stores
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * name:
 * type: string
 * location:
 * type: string
 * manager:
 * type: string
 * contact:
 * type: string
 * 500:
 * description: Some server error
 */
router.get('/', storeController.getAllStores);

/**
 * @swagger
 * /stores/{id}:
 * get:
 * summary: Get a store by ID
 * tags: [Stores]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: A store
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * name:
 * type: string
 * location:
 * type: string
 * manager:
 * type: string
 * contact:
 * type: string
 * 404:
 * description: Store not found
 * 500:
 * description: Some server error
 */
router.get('/:id', storeController.getStoreById);

/**
 * @swagger
 * /stores/{id}:
 * put:
 * summary: Update a store by ID
 * tags: [Stores]
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
 * name:
 * type: string
 * location:
 * type: string
 * manager:
 * type: string
 * contact:
 * type: string
 * responses:
 * 200:
 * description: The store was updated successfully
 * 404:
 * description: Store not found
 * 500:
 * description: Some server error
 */
router.put('/:id', storeController.updateStore);

/**
 * @swagger
 * /stores/{id}:
 * delete:
 * summary: Delete a store by ID
 * tags: [Stores]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: The store was deleted successfully
 * 404:
 * description: Store not found
 * 500:
 * description: Some server error
 */
router.delete('/:id', storeController.deleteStore);

module.exports = router;
