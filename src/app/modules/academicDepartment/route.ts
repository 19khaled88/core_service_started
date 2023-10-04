import express from 'express';
import { AcademicDepartmentController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './validation';
const route = express.Router();

route.post('/create', validateRequest(AcademicDepartmentValidation.validation), AcademicDepartmentController.createAcademicDepartment);
route.get(
    '/single/:id',
    AcademicDepartmentController.getAcademicDepartment
);
route.delete(
    '/delete/:id',
    AcademicDepartmentController.deleteAcademicDepartment
);
route.put(
    '/update/:id',
    AcademicDepartmentController.updateAcademicDepartment
);
route.get(
    '/all',
    AcademicDepartmentController.getAcademicDepartments
);

export const AcademicDepartmentRouter = route;
