import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

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

async function login(){
  
}

export {
  createValidBody,
  createInvalidBody,
  createUser
}