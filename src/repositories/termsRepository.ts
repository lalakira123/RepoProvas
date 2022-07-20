import { prisma } from './../config/db.js';

async function list(){
  const terms = await prisma.term.findMany();
  return terms;
}

export {
  list
}