/*
  Warnings:

  - You are about to drop the column `bulletPoints` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `paragraphs` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "bulletPoints",
DROP COLUMN "paragraphs",
ADD COLUMN     "content" JSONB NOT NULL DEFAULT '[]';
