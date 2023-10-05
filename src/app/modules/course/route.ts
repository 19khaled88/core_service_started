import express from 'express';
import { CourseController } from './controller';

const router = express.Router();

router.post('/create', CourseController.createCouse);
router.get('/single/:id', CourseController.getSingleCourse);
router.put('/update/:id', CourseController.updateCouse);
router.get('/all', CourseController.getAllCourse);

export const CourseRouter = router;
