/*
  Warnings:

  - The values [PUBPLISHED] on the enum `spaces_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [PUBPLISHED] on the enum `spaces_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [PUBPLISHED] on the enum `spaces_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `isAvailable` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED') NOT NULL DEFAULT 'DRAFTED';

-- AlterTable
ALTER TABLE `medias` MODIFY `visibility` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED') NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE `spaces` MODIFY `status` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED') NOT NULL DEFAULT 'AVAILABLE';
