/*
  Warnings:

  - You are about to drop the column `otpId` on the `audiences` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `audiences` DROP FOREIGN KEY `audiences_otpId_fkey`;

-- DropIndex
DROP INDEX `audiences_otpId_idx` ON `audiences`;

-- AlterTable
ALTER TABLE `audiences` DROP COLUMN `otpId`;

-- AlterTable
ALTER TABLE `otps` ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `otps_userId_idx` ON `otps`(`userId`);

-- AddForeignKey
ALTER TABLE `otps` ADD CONSTRAINT `otps_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `audiences`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
