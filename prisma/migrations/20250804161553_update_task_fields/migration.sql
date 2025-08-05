/*
  Warnings:

  - You are about to drop the column `isCompletion` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "isCompletion",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
