-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "credits" DROP DEFAULT,
ALTER COLUMN "credits" SET DATA TYPE TEXT;
