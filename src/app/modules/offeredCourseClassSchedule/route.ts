import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseClassScheduleController } from './controller';
import { OfferCourseClassScheduleValidation } from './validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(OfferCourseClassScheduleValidation.create),
  OfferedCourseClassScheduleController.createOfferedCourseClassSchedule
);
router.get(
  '/getSingle/:id',
  OfferedCourseClassScheduleController.getOfferedClassSchedule
);
router.put(
  '/update/:id',
  OfferedCourseClassScheduleController.updateOfferedClassSchedule
);
router.delete(
  '/delete/:id',
  OfferedCourseClassScheduleController.deleteOfferedClassSchedule
);
router.get(
  '/All',
  OfferedCourseClassScheduleController.getOfferedClassSchedules
);

export const OfferedCourseClassScheduleRouter = router;
