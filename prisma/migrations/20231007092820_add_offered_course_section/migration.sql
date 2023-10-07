/*
  Warnings:

  - Made the column `courseId` on table `offered-courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "offered-courses" ALTER COLUMN "courseId" SET NOT NULL;

-- CreateTable
CREATE TABLE "offered_course_section" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "currentlyEntrolledStudent" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offered_course_section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offered_course_section" ADD CONSTRAINT "offered_course_section_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered-courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_section" ADD CONSTRAINT "offered_course_section_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester-registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
