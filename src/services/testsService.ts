import { Test } from '@prisma/client';

import { notFound } from './../middlewares/errorHandlerMiddleware.js';

import * as categoriesRepository from './../repositories/categoriesRepository.js';
import * as disciplinesRepository from './../repositories/disciplineRepository.js';
import * as teachersRepository from './../repositories/teachersRepository.js';
import * as teachersDisciplinesRepository from './../repositories/teachersDisciplinesRepository.js';
import * as testsRepository from './../repositories/testsRepository.js';

export interface BodyDataTest {
  name: string,
  pdfUrl: string,
  categoryName: string,
  disciplineName: string,
  teacherName: string
}

export type CreateDataTest = Omit<Test, 'id'>;

async function create(test: BodyDataTest){
  const { name, pdfUrl, categoryName, disciplineName, teacherName } = test;

  const existCategory = await categoriesRepository.findByName(categoryName);
  if(!existCategory) throw notFound();

  const existDiscipline = await disciplinesRepository.findByName(disciplineName);
  if(!existDiscipline) throw notFound();

  const existTeacher = await teachersRepository.findByName(teacherName);
  if(!existTeacher) throw notFound();

  const existTeacherDiscipline = await teachersDisciplinesRepository.findByTeacherAndDisciplineId(
    existTeacher.id, 
    existDiscipline.id
  );
  if(!existTeacherDiscipline) throw notFound();

  const testData: CreateDataTest = {
    name,
    pdfUrl,
    categoryId: existCategory.id,
    teacherDisciplineId: existTeacherDiscipline.id
  }

  await testsRepository.create(testData);
}

export {
  create 
}