/*
  Warnings:

  - The `courseId` column on the `offered-courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "offered-courses" DROP CONSTRAINT "offered-courses_courseId_fkey";

-- AlterTable
ALTER TABLE "offered-courses" DROP COLUMN "courseId",
ADD COLUMN     "courseId" TEXT;

-- AddForeignKey
ALTER TABLE "offered-courses" ADD CONSTRAINT "offered-courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
