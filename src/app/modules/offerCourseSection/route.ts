import express from 'express';
import { OfferedCourseSectionController } from './controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferCourseSectionValidation } from './validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(OfferCourseSectionValidation.create),
  OfferedCourseSectionController.createOfferedCourseSection
);
router.get(
  '/getSingle/:id',
  OfferedCourseSectionController.getOfferedCourseSection
);
router.put(
  '/update/:id',
  OfferedCourseSectionController.updateOfferedCourseSection
);
router.delete(
  '/delete/:id',
  OfferedCourseSectionController.deleteOfferedCourseSection
);
router.get('/All', OfferedCourseSectionController.getOfferedCourseSections);

export const OfferedCourseSectionRouter = router;
