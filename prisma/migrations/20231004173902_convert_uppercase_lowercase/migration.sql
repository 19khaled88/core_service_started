/*
  Warnings:

  - You are about to drop the `CourseToPrerequisit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseToPrerequisit" DROP CONSTRAINT "CourseToPrerequisit_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseToPrerequisit" DROP CONSTRAINT "CourseToPrerequisit_preRequisiteId_fkey";

-- DropTable
DROP TABLE "CourseToPrerequisit";

-- CreateTable
CREATE TABLE "coursetoprerequisit" (
    "courseId" TEXT NOT NULL,
    "preRequisiteId" TEXT NOT NULL,

    CONSTRAINT "coursetoprerequisit_pkey" PRIMARY KEY ("courseId","preRequisiteId")
);

-- AddForeignKey
ALTER TABLE "coursetoprerequisit" ADD CONSTRAINT "coursetoprerequisit_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursetoprerequisit" ADD CONSTRAINT "coursetoprerequisit_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
