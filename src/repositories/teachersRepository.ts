import { prisma } from './../config/db.js';

async function findByName(name: string){
  const teacher = await prisma.teacher.findUnique({
    where: {
      name
    }
  });

  return teacher;
}

async function listTeachers(){
  const teachers = await prisma.teacher.findMany();

  return teachers;
}

export {
  findByName,
  listTeachers
}