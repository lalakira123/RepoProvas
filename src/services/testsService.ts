import { Test } from '@prisma/client';

import { notFound } from './../middlewares/errorHandlerMiddleware.js';

import * as categoriesRepository from './../repositories/categoriesRepository.js';
import * as disciplinesRepository from './../repositories/disciplineRepository.js';
import * as teachersRepository from './../repositories/teachersRepository.js';
import * as teachersDisciplinesRepository from './../repositories/teachersDisciplinesRepository.js';
import * as testsRepository from './../repositories/testsRepository.js';
import * as termsRepository from './../repositories/termsRepository.js';

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

async function listByDiscipline(){
  const termsAndDisciplines = await termsRepository.listTermsAndDisciplines();
  
  const categoriesAndTestsAndteacherDiscipline = await categoriesRepository.listCategoriesAndTestsAndteacherDiscipline();

  const list = [];

  termsAndDisciplines.forEach((item1) => {
    let termsDisciplines = {
      ...item1,
      discipline: []
    };

    item1.discipline.forEach((discipline) => {

      let newObjectDiscipline = {
        ...discipline,
        category: []
      }

      categoriesAndTestsAndteacherDiscipline.forEach((item2) => {

        let category = {
          ...item2,
          test: []
        };
        
        item2.test.forEach((test) => {
          if(test.teacherDiscipline.disciplineId === discipline.id){
            category.test.push(test);
          } 
        })
          
        if(category.test.length !== 0) {
          newObjectDiscipline.category.push(category);
        }
      })

      termsDisciplines.discipline.push(newObjectDiscipline);
    })
    list.push(termsDisciplines);
  })

  return list;
}

async function listByTeacher(){
  const teachers = await teachersRepository.listTeachers();

  const categoriesAndTestsAndteacherDiscipline = await categoriesRepository.listCategoriesAndTestsAndteacherDiscipline();

  const list = [];

  teachers.forEach((teacher) => {
    let object1 = {
      ...teacher,
      category: []
    }

    categoriesAndTestsAndteacherDiscipline.forEach((item) => {
      let category = {
        ...item,
        test: []
      }

      item.test.forEach((test) => {
        if(test.teacherDiscipline.teacherId === teacher.id){
          category.test.push(test);
        }
      })

      if(category.test.length !== 0) {
        object1.category.push(category);
      }
    })

    list.push(object1);
  })

  return list;
}

export {
  create,
  listByDiscipline,
  listByTeacher
}