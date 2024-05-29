const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { GatePass } = require('../models');
const gatePassRoutes = require('./gatePassRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/gatePass', gatePassRoutes);

jest.mock('../models');

describe('GatePass Routes', () => {
  let mockGatePasses;

  beforeEach(() => {
    mockGatePasses = [
      { id: 1, passNumber: 'GP001', issuedBy: 'John Doe', issuedTo: 'Jane Smith', dateIssued: '2023-01-01', status: 'Active', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, passNumber: 'GP002', issuedBy: 'Alice Brown', issuedTo: 'Bob Johnson', dateIssued: '2023-02-01', status: 'Inactive', createdAt: new Date(), updatedAt: new Date() },
    ];
  });

  test('POST /gatePass should create a new gate pass', async () => {
    const newGatePass = { passNumber: 'GP003', issuedBy: 'Charlie Green', issuedTo: 'Daisy White', dateIssued: '2023-03-01', status: 'Active' };

    GatePass.create.mockResolvedValue({ id: 3, ...newGatePass });

    const response = await request(app).post('/gatePass').send(newGatePass);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 3);
    expect(response.body).toMatchObject(newGatePass);
  });

  test('GET /gatePass should fetch all gate passes', async () => {
    GatePass.findAll.mockResolvedValue(mockGatePasses);

    const response = await request(app).get('/gatePass');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockGatePasses);
  });

  test('GET /gatePass/:id should fetch a gate pass by ID', async () => {
    GatePass.findByPk.mockResolvedValue(mockGatePasses[0]);

    const response = await request(app).get('/gatePass/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockGatePasses[0]);
  });

  test('GET /gatePass/:id should return 404 if gate pass is not found', async () => {
    GatePass.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/gatePass/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Gate pass not found');
  });

  test('PUT /gatePass/:id should update a gate pass by ID', async () => {
    const updatedGatePass = { passNumber: 'GP001', issuedBy: 'John Doe', issuedTo: 'Jane Doe', dateIssued: '2023-01-01', status: 'Inactive' };

    GatePass.findByPk.mockResolvedValue(mockGatePasses[0]);
    mockGatePasses[0].update = jest.fn().mockResolvedValue({ ...mockGatePasses[0], ...updatedGatePass });

    const response = await request(app).put('/gatePass/1').send(updatedGatePass);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedGatePass);
  });

  test('PUT /gatePass/:id should return 404 if gate pass is not found', async () => {
    GatePass.findByPk.mockResolvedValue(null);

    const response = await request(app).put('/gatePass/999').send({ passNumber: 'GP004', issuedBy: 'Eve Black', issuedTo: 'Frank White', dateIssued: '2023-04-01', status: 'Active' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Gate pass not found');
  });

  test('DELETE /gatePass/:id should delete a gate pass by ID', async () => {
    GatePass.findByPk.mockResolvedValue(mockGatePasses[0]);
    mockGatePasses[0].destroy = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete('/gatePass/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Gate pass deleted');
  });

  test('DELETE /gatePass/:id should return 404 if gate pass is not found', async () => {
    GatePass.findByPk.mockResolvedValue(null);

    const response = await request(app).delete('/gatePass/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Gate pass not found');
  });
});
