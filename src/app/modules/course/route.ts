import express from 'express';
import { CourseController } from './controller';

const router = express.Router();

router.get('/single/:id', CourseController.getSingleCourse);
router.put('/update/:id', CourseController.updateCouse);
router.post('/assignFaculty/:id', CourseController.assignFaculties);
router.delete('/deleteFaculty/:id', CourseController.deleteFaculties);
router.post('/create', CourseController.createCouse);
router.get('/all', CourseController.getAllCourse);

export const CourseRouter = router;
