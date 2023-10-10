-- DropForeignKey
ALTER TABLE "academic_departments" DROP CONSTRAINT "academic_departments_academicFacultyId_fkey";

-- DropForeignKey
ALTER TABLE "course_faculty" DROP CONSTRAINT "course_faculty_courseId_fkey";

-- DropForeignKey
ALTER TABLE "course_faculty" DROP CONSTRAINT "course_faculty_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "coursetoprerequisit" DROP CONSTRAINT "coursetoprerequisit_courseId_fkey";

-- DropForeignKey
ALTER TABLE "coursetoprerequisit" DROP CONSTRAINT "coursetoprerequisit_preRequisiteId_fkey";

-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "faculties" DROP CONSTRAINT "faculties_academicFacultyId_fkey";

-- DropForeignKey
ALTER TABLE "offered-courses" DROP CONSTRAINT "offered-courses_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "offered-courses" DROP CONSTRAINT "offered-courses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "offered-courses" DROP CONSTRAINT "offered-courses_semesterRegistrationId_fkey";

-- DropForeignKey
ALTER TABLE "offered_course_class_schedule" DROP CONSTRAINT "offered_course_class_schedule_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "offered_course_class_schedule" DROP CONSTRAINT "offered_course_class_schedule_offeredCourseSectionId_fkey";

-- DropForeignKey
ALTER TABLE "offered_course_class_schedule" DROP CONSTRAINT "offered_course_class_schedule_roomId_fkey";

-- DropForeignKey
ALTER TABLE "offered_course_class_schedule" DROP CONSTRAINT "offered_course_class_schedule_semesterRegistrationId_fkey";

-- DropForeignKey
ALTER TABLE "offered_course_section" DROP CONSTRAINT "offered_course_section_offeredCourseId_fkey";

-- DropForeignKey
ALTER TABLE "offered_course_section" DROP CONSTRAINT "offered_course_section_semesterRegistrationId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "semester-registration" DROP CONSTRAINT "semester-registration_academicSemesterId_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration" DROP CONSTRAINT "student_semester_registration_semesterRegistrationId_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration" DROP CONSTRAINT "student_semester_registration_studentId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicFacultyId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicSemesterId_fkey";

-- AddForeignKey
ALTER TABLE "academic_departments" ADD CONSTRAINT "academic_departments_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_academicFacultyId_fkey" FOREIGN KEY ("academicFacultyId") REFERENCES "academic_faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursetoprerequisit" ADD CONSTRAINT "coursetoprerequisit_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursetoprerequisit" ADD CONSTRAINT "coursetoprerequisit_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_faculty" ADD CONSTRAINT "course_faculty_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_faculty" ADD CONSTRAINT "course_faculty_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester-registration" ADD CONSTRAINT "semester-registration_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered-courses" ADD CONSTRAINT "offered-courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered-courses" ADD CONSTRAINT "offered-courses_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered-courses" ADD CONSTRAINT "offered-courses_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester-registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_section" ADD CONSTRAINT "offered_course_section_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered-courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_section" ADD CONSTRAINT "offered_course_section_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester-registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedule" ADD CONSTRAINT "offered_course_class_schedule_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedule" ADD CONSTRAINT "offered_course_class_schedule_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester-registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedule" ADD CONSTRAINT "offered_course_class_schedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedule" ADD CONSTRAINT "offered_course_class_schedule_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration" ADD CONSTRAINT "student_semester_registration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration" ADD CONSTRAINT "student_semester_registration_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester-registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
