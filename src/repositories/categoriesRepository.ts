import { prisma } from './../config/db.js';

async function findByName(name: string){
  const category = await prisma.category.findUnique({
    where: {
      name
    }
  });

  return category;
}

async function listCategoriesAndTestsAndteacherDiscipline(){
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      test: {
        select: {
          name: true,
          pdfUrl: true,
          teacherDiscipline: {
            select: {
              disciplineId: true,
              teacherId: true,
              teacher: true
            }
          }
        }
      }
    }
  })

  return categories;
}

export { 
  findByName,
  listCategoriesAndTestsAndteacherDiscipline
}