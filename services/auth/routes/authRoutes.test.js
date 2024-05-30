const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const authRoutes = require('./authRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

jest.mock('../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Routes', () => {
  const mockUsers = [
    { id: 1, username: 'john_doe', password: 'hashed_password', email: 'john@example.com' },
    { id: 2, username: 'jane_doe', password: 'hashed_password', email: 'jane@example.com' },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('POST /auth/register should register a new user', async () => {
    const newUser = { username: 'new_user', password: 'password123', email: 'new_user@example.com' };

    bcrypt.hash.mockResolvedValue('hashed_password');
    User.create.mockResolvedValue({ id: 3, ...newUser, password: 'hashed_password' });

    const response = await request(app).post('/auth/register').send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 3);
    expect(response.body).toMatchObject({ username: 'new_user', email: 'new_user@example.com' });
  });

  test('POST /auth/login should log in a user', async () => {
    const loginUser = { username: 'john_doe', password: 'password123' };

    User.findOne.mockResolvedValue(mockUsers[0]);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake_jwt_token');

    const response = await request(app).post('/auth/login').send(loginUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token', 'fake_jwt_token');
  });

  test('POST /auth/login should return 401 if password is incorrect', async () => {
    const loginUser = { username: 'john_doe', password: 'wrong_password' };

    User.findOne.mockResolvedValue(mockUsers[0]);
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app).post('/auth/login').send(loginUser);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });

  test('POST /auth/login should return 404 if user is not found', async () => {
    const loginUser = { username: 'non_existent_user', password: 'password123' };

    User.findOne.mockResolvedValue(null);

    const response = await request(app).post('/auth/login').send(loginUser);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });
});