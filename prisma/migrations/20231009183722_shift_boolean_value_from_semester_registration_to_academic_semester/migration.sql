/*
  Warnings:

  - You are about to drop the column `isCurrent` on the `semester-registration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "academic_semesters" ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "semester-registration" DROP COLUMN "isCurrent";
