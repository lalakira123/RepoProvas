import app from './../src/app.js';
import supertest from 'supertest';

import { prisma } from './../src/config/db.js';

import * as usersFactory from './factories/usersFactory.js';
import * as testsFactory from './factories/testsFactory.js';
  
describe('Test Route Tests', () => {
  it('given a valid inputs on /test should create a new test', async () => {
    const body = usersFactory.createValidBody();
    delete body.confirmPassword;

    await usersFactory.createUser(body);

    const token = await usersFactory.login(body);

    const testBody = testsFactory.createValidBody();

    const response = await supertest(app).post('/test').send(testBody).set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toEqual(201);
  });

  it('given a invalid input that doesnt exists on database should return status 404', async () => {
    const body = usersFactory.createValidBody();
    delete body.confirmPassword;

    await usersFactory.createUser(body);

    const token = await usersFactory.login(body);

    const testBody = testsFactory.createInvalidBody();

    const response = await supertest(app).post('/test').send(testBody).set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toEqual(404);
  });

  it('/test/discipline status code 200', async () => {
    const body = usersFactory.createValidBody();
    delete body.confirmPassword;

    await usersFactory.createUser(body);

    const token = await usersFactory.login(body);

    const response = await supertest(app).get('/test/discipline').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toEqual(200);
  });

  it('/test/teacher status code 200', async () => {
    const body = usersFactory.createValidBody();
    delete body.confirmPassword;

    await usersFactory.createUser(body);

    const token = await usersFactory.login(body);
    
    const response = await supertest(app).get('/test/teacher').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toEqual(200);
  });
});
  
afterAll(async () => {
  await prisma.$disconnect();
});