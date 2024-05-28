const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');

/**
 * @swagger
 * tags:
 * name: PurchaseOrders
 * description: Purchase Orders management
 */

/**
 * @swagger
 * /purchase-orders:
 * post:
 * summary: Create a new purchase order
 * tags: [PurchaseOrders]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - orderNumber
 * - supplier
 * - totalAmount
 * - status
 * properties:
 * orderNumber:
 * type: string
 * supplier:
 * type: string
 * totalAmount:
 * type: number
 * format: float
 * status:
 * type: string
 * responses:
 * 201:
 * description: The purchase order was created successfully
 * 500:
 * description: Some server error
 */
router.post('/', purchaseOrderController.createPurchaseOrder);

/**
 * @swagger
 * /purchase-orders:
 * get:
 * summary: Get all purchase orders
 * tags: [PurchaseOrders]
 * responses:
 * 200:
 * description: List of all purchase orders
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * orderNumber:
 * type: string
 * supplier:
 * type: string
 * totalAmount:
 * type: number
 * format: float
 * status:
 * type: string
 * 500:
 * description: Some server error
 */
router.get('/', purchaseOrderController.getAllPurchaseOrders);

/**
 * @swagger
 * /purchase-orders/{id}:
 * get:
 * summary: Get a purchase order by ID
 * tags: [PurchaseOrders]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: A purchase order
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * orderNumber:
 * type: string
 * supplier:
 * type: string
 * totalAmount:
 * type: number
 * format: float
 * status:
 * type: string
 * 404:
 * description: Purchase Order not found
 * 500:
 * description: Some server error
 */
router.get('/:id', purchaseOrderController.getPurchaseOrderById);

/**
 * @swagger
 * /purchase-orders/{id}:
 * put:
 * summary: Update a purchase order by ID
 * tags: [PurchaseOrders]
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
 * orderNumber:
 * type: string
 * supplier:
 * type: string
 * totalAmount:
 * type: number
 * format: float
 * status:
 * type: string
 * responses:
 * 200:
 * description: The purchase order was updated successfully
 * 404:
 * description: Purchase Order not found
 * 500:
 * description: Some server error
 */
router.put('/:id', purchaseOrderController.updatePurchaseOrder);

/**
 * @swagger
 * /purchase-orders/{id}:
 * delete:
 * summary: Delete a purchase order by ID
 * tags: [PurchaseOrders]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: The purchase order was deleted successfully
 * 404:
 * description: Purchase Order not found
 * 500:
 * description: Some server error
 */
router.delete('/:id', purchaseOrderController.deletePurchaseOrder);

module.exports = router;
