import { prisma } from './../config/db.js';

import { CreateDataUser } from './../services/usersService.js';

async function findByEmail(email: string){
  const user = prisma.user.findUnique({
    where: {
      email
    }
  });

  return user;
}

async function create(user: CreateDataUser){
  const { email, password } = user;
  await prisma.user.create({
    data: {
      email,
      password
    }
  });
}

export {
  findByEmail,
  create
}