import express from 'express';
import { AcademicFacucltyController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './validation';
const route = express.Router();

route.post('/create', validateRequest(AcademicFacultyValidation.validation), AcademicFacucltyController.createAcademicFaculty);
route.get(
    '/single/:id',
    AcademicFacucltyController.getAcademicFaculty
);
route.delete(
    '/delete/:id',
    AcademicFacucltyController.deleteAcademicFaculty
);
route.put(
    '/update/:id',
    AcademicFacucltyController.updateAcademicFaculty
);
route.get(
    '/all',
    AcademicFacucltyController.getAcademicFaculties
);

export const AcademiFacultyRouter = route;
