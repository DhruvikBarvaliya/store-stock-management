const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 * schemas:
 * User:
 * type: object
 * required:
 * - username
 * - email
 * - password
 * properties:
 * id:
 * type: integer
 * description: The auto-generated id of the user
 * username:
 * type: string
 * description: The username of the user
 * email:
 * type: string
 * description: The email of the user
 * password:
 * type: string
 * description: The password of the user
 * example:
 * id: 1
 * username: john_doe
 * email: john@example.com
 * password: password123
 */

/**
 * @swagger
 * tags:
 * name: Auth
 * description: The authentication API
 */

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Register a new user
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * responses:
 * 201:
 * description: The user was successfully created
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 500:
 * description: Some server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Login a user
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * example:
 * email: john@example.com
 * password: password123
 * responses:
 * 200:
 * description: The user was successfully logged in
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * 404:
 * description: User not found
 * 401:
 * description: Invalid password
 * 500:
 * description: Some server error
 */
router.post('/login', authController.login);

module.exports = router;




// services/auth/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};