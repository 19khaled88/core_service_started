import express from 'express';
import { AcademicSemesterController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicValidation } from './validation';

const router = express.Router();

router.post(
    '/create',
    validateRequest(AcademicValidation.create),
    AcademicSemesterController.createAcademicSemester
);
router.get('/getSingle/:id', AcademicSemesterController.getSingleAcademiSemester)
router.put('/update/:id', AcademicSemesterController.updateAcademicSemester)
router.delete('/delete/:id', AcademicSemesterController.deleteAcademicSemester)
router.get('/getAll', AcademicSemesterController.getAcademicSemester);


export const AcademiSemesterRouter = router;
