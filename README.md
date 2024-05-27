# Store Stock Management API

## Description

The Store Stock Management API is a backend system for managing store inventory, requisitions, purchase orders, gate passes, documents, and store management. This project uses Node.js, Express.js, PostgreSQL with Sequelize ORM, Swagger for API documentation, and Winston for logging. The architecture follows a microservices approach.

## Features

- User authentication and authorization
- Inventory management
- Requisitions management
- Purchase orders management
- Gate pass management
- Document management
- Store management
- Detailed API documentation with Swagger
- Logging with Winston

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- Swagger
- Winston

## Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- Postman for API testing (optional)

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/DhruvikBarvaliya/store-stock-management.git
cd store-stock-management

#bash
npm install

#env
DATABASE_URL=postgres://user:password@localhost:5432/storedb
PORT=3000
JWT_SECRET=your_jwt_secret

#sql
CREATE DATABASE storedb;

#bash
node app.js

#bash
http://localhost:3000/api-docs

#bash
store-stock-management/
├── services/
│   ├── auth/
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   └── authRoutes.js
│   │   ├── services/
│   │   └── index.js
│   ├── inventory/
│   │   ├── controllers/
│   │   │   └── inventoryController.js
│   │   ├── models/
│   │   │   └── InventoryItem.js
│   │   ├── routes/
│   │   │   └── inventoryRoutes.js
│   │   ├── services/
│   │   └── index.js
│   ├── requisitions/
│   │   ├── controllers/
│   │   │   └── requisitionsController.js
│   │   ├── models/
│   │   │   └── Requisition.js
│   │   ├── routes/
│   │   │   └── requisitionsRoutes.js
│   │   ├── services/
│   │   └── index.js
│   ├── purchase-orders/
│   │   ├── controllers/
│   │   │   └── purchaseOrdersController.js
│   │   ├── models/
│   │   │   └── PurchaseOrder.js
│   │   ├── routes/
│   │   │   └── purchaseOrdersRoutes.js
│   │   ├── services/
│   │   └── index.js
│   ├── gate-pass/
│   │   ├── controllers/
│   │   │   └── gatePassController.js
│   │   ├── models/
│   │   │   └── GatePass.js
│   │   ├── routes/
│   │   │   └── gatePassRoutes.js
│   │   ├── services/
│   │   └── index.js
│   ├── documents/
│   │   ├── controllers/
│   │   │   └── documentsController.js
│   │   ├── models/
│   │   │   └── Document.js
│   │   ├── routes/
│   │   │   └── documentsRoutes.js
│   │   ├── services/
│   │   └── index.js
│   └── stores/
│       ├── controllers/
│       │   └── storesController.js
│       ├── models/
│       │   └── Store.js
│       ├── routes/
│       │   └── storesRoutes.js
│       ├── services/
│       └── index.js
├── config/
│   ├── database.js
│   ├── swagger.js
│   └── logger.js
├── logs/
│   ├── error.log
│   └── combined.log
├── .env
├── app.js
└── package.json