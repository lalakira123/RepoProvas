import { prisma } from './../config/db.js';

async function findByName(name: string){
  const teacher = await prisma.teacher.findUnique({
    where: {
      name
    }
  });

  return teacher;
}

export {
  findByName
}