import express from 'express';
import { AcademicSemesterController } from './controller';

const router = express.Router();

router.post(
  '/create',
  AcademicSemesterController.createAcademicSemester
);

export const AcademiSemesterRouter = router;
