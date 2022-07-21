import { prisma } from './../config/db.js';

async function listTermsAndDisciplines(){
  const termsAndDisciplines = await prisma.term.findMany({
    include: {
      discipline: true
    }
  });

  return termsAndDisciplines;
}

export {
  listTermsAndDisciplines
}