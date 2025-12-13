/*
  Warnings:

  - Added the required column `spaceId` to the `media_upload_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `media_upload_details` ADD COLUMN `spaceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `media_upload_details` ADD CONSTRAINT `media_upload_details_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
