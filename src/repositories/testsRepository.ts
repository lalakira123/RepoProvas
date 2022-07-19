import { prisma } from './../config/db.js';

import { CreateDataTest } from './../services/testsService.js';

async function create(test: CreateDataTest){
  const { name, pdfUrl, categoryId, teacherDisciplineId } = test;
  await prisma.test.create({
    data: {
      name,
      pdfUrl,
      categoryId,
      teacherDisciplineId
    }
  });
}

export {
  create
}