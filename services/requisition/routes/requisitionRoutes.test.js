const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { Requisition } = require('../models');
const requisitionRoutes = require('./requisitionRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/requisitions', requisitionRoutes);

jest.mock('../models');

describe('Requisition Routes', () => {
  let mockRequisitions;

  beforeEach(() => {
    mockRequisitions = [
      { id: 1, item: 'Laptop', quantity: 10, department: 'IT', status: 'Pending', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, item: 'Monitor', quantity: 5, department: 'HR', status: 'Approved', createdAt: new Date(), updatedAt: new Date() },
    ];
  });

  test('POST /requisitions should create a new requisition', async () => {
    const newRequisition = { item: 'Keyboard', quantity: 15, department: 'IT', status: 'Pending' };

    Requisition.create.mockResolvedValue({ id: 3, ...newRequisition });

    const response = await request(app).post('/requisitions').send(newRequisition);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 3);
    expect(response.body).toMatchObject(newRequisition);
  });

  test('GET /requisitions should fetch all requisitions', async () => {
    Requisition.findAll.mockResolvedValue(mockRequisitions);

    const response = await request(app).get('/requisitions');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockRequisitions);
  });

  test('GET /requisitions/:id should fetch a requisition by ID', async () => {
    Requisition.findByPk.mockResolvedValue(mockRequisitions[0]);

    const response = await request(app).get('/requisitions/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockRequisitions[0]);
  });

  test('GET /requisitions/:id should return 404 if requisition is not found', async () => {
    Requisition.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/requisitions/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Requisition not found');
  });

  test('PUT /requisitions/:id should update a requisition by ID', async () => {
    const updatedRequisition = { item: 'Laptop', quantity: 12, department: 'IT', status: 'Approved' };

    Requisition.findByPk.mockResolvedValue(mockRequisitions[0]);
    mockRequisitions[0].update = jest.fn().mockResolvedValue({ ...mockRequisitions[0], ...updatedRequisition });

    const response = await request(app).put('/requisitions/1').send(updatedRequisition);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedRequisition);
  });

  test('PUT /requisitions/:id should return 404 if requisition is not found', async () => {
    Requisition.findByPk.mockResolvedValue(null);

    const response = await request(app).put('/requisitions/999').send({ item: 'Tablet', quantity: 2, department: 'HR', status: 'Pending' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Requisition not found');
  });

  test('DELETE /requisitions/:id should delete a requisition by ID', async () => {
    Requisition.findByPk.mockResolvedValue(mockRequisitions[0]);
    mockRequisitions[0].destroy = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete('/requisitions/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Requisition deleted');
  });

  test('DELETE /requisitions/:id should return 404 if requisition is not found', async () => {
    Requisition.findByPk.mockResolvedValue(null);

    const response = await request(app).delete('/requisitions/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Requisition not found');
  });
});