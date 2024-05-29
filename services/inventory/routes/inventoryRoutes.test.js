const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { Inventory } = require('../models');
const inventoryRoutes = require('./inventoryRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/inventory', inventoryRoutes);

jest.mock('../models');

describe('Inventory Routes', () => {
  let mockInventories;

  beforeEach(() => {
    mockInventories = [
      { id: 1, itemName: 'Laptop', quantity: 50, location: 'Warehouse A', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, itemName: 'Mouse', quantity: 150, location: 'Warehouse B', createdAt: new Date(), updatedAt: new Date() },
    ];
  });

  test('POST /inventory should create a new inventory item', async () => {
    const newInventory = { itemName: 'Keyboard', quantity: 100, location: 'Warehouse C' };

    Inventory.create.mockResolvedValue({ id: 3, ...newInventory });

    const response = await request(app).post('/inventory').send(newInventory);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 3);
    expect(response.body).toMatchObject(newInventory);
  });

  test('GET /inventory should fetch all inventory items', async () => {
    Inventory.findAll.mockResolvedValue(mockInventories);

    const response = await request(app).get('/inventory');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockInventories);
  });

  test('GET /inventory/:id should fetch an inventory item by ID', async () => {
    Inventory.findByPk.mockResolvedValue(mockInventories[0]);

    const response = await request(app).get('/inventory/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockInventories[0]);
  });

  test('GET /inventory/:id should return 404 if inventory item is not found', async () => {
    Inventory.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/inventory/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Inventory item not found');
  });

  test('PUT /inventory/:id should update an inventory item by ID', async () => {
    const updatedInventory = { itemName: 'Laptop', quantity: 45, location: 'Warehouse A' };

    Inventory.findByPk.mockResolvedValue(mockInventories[0]);
    mockInventories[0].update = jest.fn().mockResolvedValue({ ...mockInventories[0], ...updatedInventory });

    const response = await request(app).put('/inventory/1').send(updatedInventory);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedInventory);
  });

  test('PUT /inventory/:id should return 404 if inventory item is not found', async () => {
    Inventory.findByPk.mockResolvedValue(null);

    const response = await request(app).put('/inventory/999').send({ itemName: 'Tablet', quantity: 30, location: 'Warehouse D' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Inventory item not found');
  });

  test('DELETE /inventory/:id should delete an inventory item by ID', async () => {
    Inventory.findByPk.mockResolvedValue(mockInventories[0]);
    mockInventories[0].destroy = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete('/inventory/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Inventory item deleted');
  });

  test('DELETE /inventory/:id should return 404 if inventory item is not found', async () => {
    Inventory.findByPk.mockResolvedValue(null);

    const response = await request(app).delete('/inventory/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Inventory item not found');
  });
});