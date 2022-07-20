import * as termsRepository from './../repositories/termsRepository.js';

async function list(){
  const terms = await termsRepository.list();

  return terms;
}

export {
  list
}