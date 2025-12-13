/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `media_upload_details` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `media_upload_details` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `media_upload_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `media_upload_details` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `media_upload_details_slug_key` ON `media_upload_details`(`slug`);
