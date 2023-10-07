import express from 'express';
import { OfferedCourseController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferCourseValidation } from './validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(OfferCourseValidation.create),
  OfferedCourseController.createofferedCourse
);
router.get('/getSingle/:id', OfferedCourseController.getOfferedCourse);
router.put('/update/:id', OfferedCourseController.updateOfferedCourse);
router.delete('/delete/:id', OfferedCourseController.deleteOfferedCourse);
router.get('/All', OfferedCourseController.getOfferedCourses);

export const OfferedCourseRouter = router;
