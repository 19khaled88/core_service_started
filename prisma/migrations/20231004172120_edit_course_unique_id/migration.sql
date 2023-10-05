/*
  Warnings:

  - The primary key for the `CourseToPrerequisit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[courseId,preRequisiteId]` on the table `CourseToPrerequisit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CourseToPrerequisit" DROP CONSTRAINT "CourseToPrerequisit_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "CourseToPrerequisit_courseId_preRequisiteId_key" ON "CourseToPrerequisit"("courseId", "preRequisiteId");
