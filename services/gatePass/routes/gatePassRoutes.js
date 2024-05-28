const express = require("express");
const router = express.Router();
const gatePassController = require("../controllers/gatePassController");
/** * @swagger * tags: * name: GatePass * description: Gate Pass management */
/** * @swagger * /gate-pass: * post: * summary: Create a new gate pass * tags: [GatePass] * requestBody: * required: true * content: * application/json: * schema: * type: object * required: * - material * - quantity * - issuedBy * properties: * material: * type: string * quantity: * type: integer * issuedBy: * type: string * responses: * 201: * description: The gate pass was created successfully * 500: * description: Some server error */ router.post(
  "/",
  gatePassController.createGatePass
);
/** * @swagger * /gate-pass: * get: * summary: Get all gate passes * tags: [GatePass] * responses: * 200: * description: List of all gate passes * content: * application/json: * schema: * type: array * items: * type: object * properties: * id: * type: integer * material: * type: string * quantity: * type: integer * issuedBy: * type: string * 500: * description: Some server error */ router.get(
  "/",
  gatePassController.getGatePasses
);
module.exports = router;
