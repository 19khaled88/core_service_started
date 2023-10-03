import express from 'express';
import { AcademiSemesterRouter } from '../modules/academicSemester/route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semester",
    routes: AcademiSemesterRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
