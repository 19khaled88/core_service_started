import express from 'express';
import { AcademiSemesterRouter } from '../modules/academicSemester/route';
import { StudentRouter } from '../modules/student/route';
import { AcademiFacultyRouter } from '../modules/academicFaculty/route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/route';
import { FacultyRouter } from '../modules/faculty/route';
import { CourseRouter } from '../modules/course/route';

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
  },
  {
    path:'/academic-department',
    routes:AcademicDepartmentRouter
  },
  {
    path:'/faculty',
    routes:FacultyRouter
  },
  {
    path:'/course',
    routes:CourseRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
