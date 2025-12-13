/*
  Warnings:

  - You are about to drop the column `visibility` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `spaces` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `medias` DROP COLUMN `visibility`,
    ADD COLUMN `isAvailable` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE `news` DROP COLUMN `status`,
    ADD COLUMN `isAvailable` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'DRAFTED';

-- AlterTable
ALTER TABLE `spaces` DROP COLUMN `status`,
    ADD COLUMN `isAvailable` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'AVAILABLE';
