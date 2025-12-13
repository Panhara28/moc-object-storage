/*
  Warnings:

  - You are about to alter the column `status` on the `spaces` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `medias` MODIFY `visibility` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY') NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE `spaces` MODIFY `status` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY') NOT NULL DEFAULT 'AVAILABLE';
