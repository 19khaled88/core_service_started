import express from 'express';
import { FacultyController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './validation';
const route = express.Router();

route.post('/create', validateRequest(FacultyValidation.validation), FacultyController.createFaculty);
route.get(
    '/single/:id',
    FacultyController.getFaculty
);
route.delete(
    '/delete/:id',
    FacultyController.deleteFaculty
);
route.put(
    '/update/:id',
    FacultyController.updateFaculty
);
route.get(
    '/all',
    FacultyController.getFaculties
);

export const FacultyRouter = route;
