-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "estimatedDuration" INTEGER,
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "isCompleted" DROP DEFAULT;
