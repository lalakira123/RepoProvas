import Joi from 'joi';

import { BodyDataTest } from './../services/testsService.js';

export const testsSchema = Joi.object<BodyDataTest>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryName: Joi.string().required(),
  disciplineName: Joi.string().required(),
  teacherName: Joi.string().required()
});