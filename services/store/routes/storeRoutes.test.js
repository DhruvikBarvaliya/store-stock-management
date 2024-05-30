const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { Store } = require('../models/store');
const storeRoutes = require('./storeRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/stores', storeRoutes);

jest.mock('../models/store');

describe('Store Routes', () => {
  let mockStores;

  beforeEach(() => {
    mockStores = [
      { id: 1, name: 'Store A', location: 'Location A', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Store B', location: 'Location B', createdAt: new Date(), updatedAt: new Date() },
    ];
  });

  test('POST /stores should create a new store', async () => {
    const newStore = { name: 'Store C', location: 'Location C' };

    Store.create.mockResolvedValue({ id: 3, ...newStore });

    const response = await request(app).post('/stores').send(newStore);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 3);
    expect(response.body).toMatchObject(newStore);
  });

  test('GET /stores should fetch all stores', async () => {
    Store.findAll.mockResolvedValue(mockStores);

    const response = await request(app).get('/stores');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockStores);
  });

  test('GET /stores/:id should fetch a store by ID', async () => {
    Store.findByPk.mockResolvedValue(mockStores[0]);

    const response = await request(app).get('/stores/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockStores[0]);
  });

  test('GET /stores/:id should return 404 if store is not found', async () => {
    Store.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/stores/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Store not found');
  });

  test('PUT /stores/:id should update a store by ID', async () => {
    const updatedStore = { name: 'Store A Updated', location: 'Location A Updated' };

    Store.findByPk.mockResolvedValue(mockStores[0]);
    mockStores[0].update = jest.fn().mockResolvedValue({ ...mockStores[0], ...updatedStore });

    const response = await request(app).put('/stores/1').send(updatedStore);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedStore);
  });

  test('PUT /stores/:id should return 404 if store is not found', async () => {
    Store.findByPk.mockResolvedValue(null);

    const response = await request(app).put('/stores/999').send({ name: 'Store D', location: 'Location D' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Store not found');
  });

  test('DELETE /stores/:id should delete a store by ID', async () => {
    Store.findByPk.mockResolvedValue(mockStores[0]);
    mockStores[0].destroy = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete('/stores/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Store deleted');
  });

  test('DELETE /stores/:id should return 404 if store is not found', async () => {
    Store.findByPk.mockResolvedValue(null);

    const response = await request(app).delete('/stores/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Store not found');
  });
});