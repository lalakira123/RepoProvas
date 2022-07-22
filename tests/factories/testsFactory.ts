import { faker } from '@faker-js/faker';

function createValidBody(){
  return {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryName: 'Projeto',
    disciplineName: 'React',
    teacherName: 'Diego Pinho'
  }
}

function createInvalidBody(){
  return {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryName: 'Blabla',
    disciplineName: 'Blabla',
    teacherName: 'Blabla'
  }
}

export {
  createValidBody,
  createInvalidBody
}