import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import supertest from 'supertest';

import app from './../../src/app.js';

import { prisma } from './../../src/config/db.js';

interface CreateUser {
  email: string,
  password: string,
  confirmPassword: string
}

function createValidBody(){
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password
  }
}

function createInvalidBody(){
  return {
    email: faker.internet.userName(),
    password: faker.internet.password(),
    confirmPassword: faker.internet.password()
  }
}

async function createUser(body: CreateUser){
  const { email, password } = body;
  await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10)
    }
  });
}

type Login = Omit<CreateUser, 'confirmPassword'>;

async function login(body: Login){
  const response = await supertest(app).post('/signin').send(body);
  return response.text;
}

export {
  createValidBody,
  createInvalidBody,
  createUser,
  login
}