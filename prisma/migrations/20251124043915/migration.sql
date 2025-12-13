/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `Test` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `test` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Test_slug_key` ON `Test`(`slug`);
