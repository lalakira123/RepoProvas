import { prisma } from './../config/db.js';

async function findByTeacherAndDisciplineId(teacherId: number, disciplineId: number){
  const teacherDiscipline = await prisma.teacherDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId
    }
  });

  return teacherDiscipline;
}

export {
  findByTeacherAndDisciplineId
}