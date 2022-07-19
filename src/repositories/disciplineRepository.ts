import { prisma } from './../config/db.js';

async function findByName(name: string){
  const discipline = await prisma.discipline.findUnique({
    where: {
      name
    }
  });

  return discipline;
}

export {
  findByName
}