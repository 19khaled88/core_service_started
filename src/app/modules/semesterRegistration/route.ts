import express from 'express';
import { SemesterRegistrationController } from './controller';
import validateRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.post('/create', SemesterRegistrationController.registerSemester);
route.get('/single/:id', SemesterRegistrationController.getRegisteredSemester);
route.delete(
  '/delete/:id',
  SemesterRegistrationController.deleteRegisteredSemester
);
route.put(
  '/update/:id',
  SemesterRegistrationController.updateRegisteredSemested
);
route.get('/all', SemesterRegistrationController.getRegisteredSemesters);

export const SemesterRegisterRouter = route;
