import app from './../src/app.js';
import supertest from 'supertest';

import { prisma } from './../src/config/db.js';

import * as usersFactory from './factories/usersFactory.js';

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users;`;
});

describe('Test Route Users', () => {
  it('given a valid input on /signup should create a new user returning status 201', async () => {
    const body = usersFactory.createValidBody();

    const response = await supertest(app).post('/signup').send(body);
    expect(response.statusCode).toEqual(201);
  });

  it('given a invalid input on /signup should return status 422', async () => {
    const body = usersFactory.createInvalidBody();

    const response = await supertest(app).post('/signup').send(body);
    expect(response.statusCode).toEqual(422);
  });

  it('if try to create an user on /signup that already exist should return status 409', async () => {
    const body = usersFactory.createValidBody();
    await usersFactory.createUser(body);

    const response = await supertest(app).post('/signup').send(body);
    expect(response.statusCode).toEqual(409);
  });

  it('given a valida input on /signin should receive a token and status 200', async () => {
    const body = usersFactory.createValidBody();
    await usersFactory.createUser(body);
    delete body.confirmPassword;

    const response = await supertest(app).post('/signin').send(body);
    expect(response.statusCode).toEqual(200);
  });

  it('given an invalid email on /signin should return status 404', async () => {
    const body = usersFactory.createValidBody();
    await usersFactory.createUser(body);

    const secondBody = usersFactory.createValidBody();

    const invalidBody = {
      ...body,
      email: secondBody.email
    }
    delete invalidBody.confirmPassword;

    const response = await supertest(app).post('/signin').send(invalidBody);
    expect(response.statusCode).toEqual(404);
  });

  it('given an invalid password on /signin should return status 401', async () => {
    let body = usersFactory.createValidBody();
    await usersFactory.createUser(body);

    body = {
      ...body,
      password: 'mmmmmmmmmmmmmmmm123'
    }
    delete body.confirmPassword;

    const response = await supertest(app).post('/signin').send(body);
    expect(response.statusCode).toEqual(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
})