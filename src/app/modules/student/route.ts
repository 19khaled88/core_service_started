
import express from 'express';
import { StudnetController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './validation';
// import { AcademicValidation } from './validation';

const router = express.Router();

router.post(
    '/create',
    validateRequest(StudentValidation.studentValidation),
    // validateRequest(AcademicValidation.create),
    StudnetController.createStudent
);
router.get('/getSingle/:id', StudnetController.getAllStudent)
router.put('/update/:id', StudnetController.updateStudent)
router.delete('/delete/:id', StudnetController.deleteStudent)
router.get('/getAll', StudnetController.getAllStudent);


export const StudentRouter = router;