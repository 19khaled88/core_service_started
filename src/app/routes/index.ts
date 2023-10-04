import express from 'express';
import { AcademiSemesterRouter } from '../modules/academicSemester/route';
import { StudentRouter } from '../modules/student/route';
import { AcademiFacultyRouter } from '../modules/academicFaculty/route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semester",
    routes: AcademiSemesterRouter
  },{
    path:'/student',
    routes:StudentRouter
  },
  {
    path:'/academic-faculty',
    routes:AcademiFacultyRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
