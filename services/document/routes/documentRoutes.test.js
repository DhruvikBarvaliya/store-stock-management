const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { Document } = require('../models');
const documentRoutes = require('./documentRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/documents', documentRoutes);

jest.mock('../models');

describe('Document Routes', () => {
  let mockDocuments;

  beforeEach(() => {
    mockDocuments = [
      { id: 1, title: 'Invoice', content: 'This is an invoice.', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'Receipt', content: 'This is a receipt.', createdAt: new Date(), updatedAt: new Date() },
    ];
  });

  test('POST /documents should create a new document', async () => {
    const newDocument = { title: 'Contract', content: 'This is a contract.' };

    Document.create.mockResolvedValue({ id: 3, ...newDocument });

    const response = await request(app).post('/documents').send(newDocument);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 3);
    expect(response.body).toMatchObject(newDocument);
  });

  test('GET /documents should fetch all documents', async () => {
    Document.findAll.mockResolvedValue(mockDocuments);

    const response = await request(app).get('/documents');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockDocuments);
  });

  test('GET /documents/:id should fetch a document by ID', async () => {
    Document.findByPk.mockResolvedValue(mockDocuments[0]);

    const response = await request(app).get('/documents/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockDocuments[0]);
  });

  test('GET /documents/:id should return 404 if document is not found', async () => {
    Document.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/documents/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Document not found');
  });

  test('PUT /documents/:id should update a document by ID', async () => {
    const updatedDocument = { title: 'Updated Invoice', content: 'This is an updated invoice.' };

    Document.findByPk.mockResolvedValue(mockDocuments[0]);
    mockDocuments[0].update = jest.fn().mockResolvedValue({ ...mockDocuments[0], ...updatedDocument });

    const response = await request(app).put('/documents/1').send(updatedDocument);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedDocument);
  });

  test('PUT /documents/:id should return 404 if document is not found', async () => {
    Document.findByPk.mockResolvedValue(null);

    const response = await request(app).put('/documents/999').send({ title: 'Non-existent Document', content: 'This document does not exist.' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Document not found');
  });

  test('DELETE /documents/:id should delete a document by ID', async () => {
    Document.findByPk.mockResolvedValue(mockDocuments[0]);
    mockDocuments[0].destroy = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete('/documents/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Document deleted');
  });

  test('DELETE /documents/:id should return 404 if document is not found', async () => {
    Document.findByPk.mockResolvedValue(null);

    const response = await request(app).delete('/documents/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Document not found');
  });
});