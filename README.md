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
git clone https://github.com/your-username/store-stock-management.git
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
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   ├── inventory/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   └── ...
├── config/
│   ├── database.js
│   └── swagger.js
├── logs/
├── .env
├── app.js
└── package.json


