-- DropIndex
DROP INDEX "CourseToPrerequisit_courseId_preRequisiteId_key";

-- AlterTable
ALTER TABLE "CourseToPrerequisit" ADD CONSTRAINT "CourseToPrerequisit_pkey" PRIMARY KEY ("courseId", "preRequisiteId");
