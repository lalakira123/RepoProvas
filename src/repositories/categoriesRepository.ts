import { prisma } from './../config/db.js';

async function findByName(name: string){
  const category = await prisma.category.findUnique({
    where: {
      name
    }
  });

  return category;
}

export { 
  findByName
}