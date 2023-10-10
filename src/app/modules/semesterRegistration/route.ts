import express from 'express';
import { SemesterRegistrationController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const route = express.Router();

route.get('/single/:id', SemesterRegistrationController.getRegisteredSemester);
route.delete(
  '/delete/:id',
  SemesterRegistrationController.deleteRegisteredSemester
);
route.post(
  '/start-new-semester/:id',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startNewSemester
);
route.put(
  '/update/:id',
  SemesterRegistrationController.updateRegisteredSemested
);
route.put('/update-credit', SemesterRegistrationController.updateTotalCredit);
route.post('/create', SemesterRegistrationController.registerSemester);
route.post(
  '/start_registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.insertStudentRegistrationIntoDB
);
route.post(
  '/enroll_course',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.enrollIntoCourse
);

route.post(
  '/withdraw_course',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.withdrawCourse
);
route.post(
  '/confirm-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.confirmRegistration
);
route.get('/all', SemesterRegistrationController.getRegisteredSemesters);

route.get(
  '/get-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMyRegistration
);


export const SemesterRegisterRouter = route;
