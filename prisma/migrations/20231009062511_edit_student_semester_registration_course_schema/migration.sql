/*
  Warnings:

  - Added the required column `offeredCourseId` to the `student_semester_registration_course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_semester_registration_course" ADD COLUMN     "offeredCourseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_semesterRegistrationI_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester-registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered-courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_offeredCourseSectionI_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
