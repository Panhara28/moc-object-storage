/*
  Warnings:

  - You are about to drop the column `slug` on the `media_upload_details` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `media_upload_details` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `media_upload_details` DROP FOREIGN KEY `media_upload_details_spaceId_fkey`;

-- DropIndex
DROP INDEX `media_upload_details_slug_key` ON `media_upload_details`;

-- DropIndex
DROP INDEX `media_upload_details_spaceId_fkey` ON `media_upload_details`;

-- AlterTable
ALTER TABLE `media_upload_details` DROP COLUMN `slug`,
    DROP COLUMN `updatedAt`,
    MODIFY `spaceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `media_upload_details` ADD CONSTRAINT `media_upload_details_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
