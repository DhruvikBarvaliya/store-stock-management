const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { PurchaseOrder } = require("../models");
const purchaseOrderRoutes = require("./purchaseOrderRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/purchase-orders", purchaseOrderRoutes);

jest.mock("../models");

describe("Purchase Order Routes", () => {
  let mockPurchaseOrders;

  beforeEach(() => {
    mockPurchaseOrders = [
      {
        id: 1,
        item: "Laptop",
        quantity: 10,
        supplier: "Supplier Inc.",
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        item: "Monitor",
        quantity: 5,
        supplier: "Supplier Inc.",
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  test("POST /purchase-orders should create a new purchase order", async () => {
    const newPurchaseOrder = {
      item: "Keyboard",
      quantity: 15,
      supplier: "Supplier Inc.",
      status: "Pending",
    };

    PurchaseOrder.create.mockResolvedValue({ id: 3, ...newPurchaseOrder });

    const response = await request(app)
      .post("/purchase-orders")
      .send(newPurchaseOrder);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id", 3);
    expect(response.body).toMatchObject(newPurchaseOrder);
  });

  test("GET /purchase-orders should fetch all purchase orders", async () => {
    PurchaseOrder.findAll.mockResolvedValue(mockPurchaseOrders);

    const response = await request(app).get("/purchase-orders");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockPurchaseOrders);
  });

  test("GET /purchase-orders/:id should fetch a purchase order by ID", async () => {
    PurchaseOrder.findByPk.mockResolvedValue(mockPurchaseOrders[0]);

    const response = await request(app).get("/purchase-orders/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockPurchaseOrders[0]);
  });

  test("GET /purchase-orders/:id should return 404 if purchase order is not found", async () => {
    PurchaseOrder.findByPk.mockResolvedValue(null);

    const response = await request(app).get("/purchase-orders/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "Purchase order not found");
  });

  test("PUT /purchase-orders/:id should update a purchase order by ID", async () => {
    const updatedPurchaseOrder = {
      item: "Laptop",
      quantity: 12,
      supplier: "Supplier Inc.",
      status: "Completed",
    };

    PurchaseOrder.findByPk.mockResolvedValue(mockPurchaseOrders[0]);
    mockPurchaseOrders[0].update = jest
      .fn()
      .mockResolvedValue({ ...mockPurchaseOrders[0], ...updatedPurchaseOrder });

    const response = await request(app)
      .put("/purchase-orders/1")
      .send(updatedPurchaseOrder);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedPurchaseOrder);
  });

  test("PUT /purchase-orders/:id should return 404 if purchase order is not found", async () => {
    PurchaseOrder.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .put("/purchase-orders/999")
      .send({
        item: "Tablet",
        quantity: 2,
        supplier: "Supplier Inc.",
        status: "Pending",
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "Purchase order not found");
  });

  test("DELETE /purchase-orders/:id should delete a purchase order by ID", async () => {
    PurchaseOrder.findByPk.mockResolvedValue(mockPurchaseOrders[0]);
    mockPurchaseOrders[0].destroy = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete("/purchase-orders/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Purchase order deleted");
  });

  test("DELETE /purchase-orders/:id should return 404 if purchase order is not found", async () => {
    PurchaseOrder.findByPk.mockResolvedValue(null);

    const response = await request(app).delete("/purchase-orders/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error", "Purchase order not found");
  });
});
