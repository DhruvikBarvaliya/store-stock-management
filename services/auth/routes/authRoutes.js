const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 * name: Auth
 * description: Authentication and user management
 */

/**
 * @swagger
 * /auth/register:
 * post:
 * summary: Register a new user
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - username
 * - password
 * properties:
 * username:
 * type: string
 * password:
 * type: string
 * responses:
 * 201:
 * description: User registered successfully
 * 500:
 * description: Some server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Login a user
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - username
 * - password
 * properties:
 * username:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: User logged in successfully
 * 401:
 * description: Invalid credentials
 * 500:
 * description: Some server error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/authenticate:
 * get:
 * summary: Authenticate a user
 * tags: [Auth]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: User authenticated successfully
 * 401:
 * description: Invalid token
 * 500:
 * description: Some server error
 */
router.get('/authenticate', authController.authenticate);

module.exports = router;