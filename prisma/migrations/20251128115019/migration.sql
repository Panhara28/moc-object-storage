/*
  Warnings:

  - You are about to alter the column `isAvailable` on the `books` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `isAvailable` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY') NOT NULL DEFAULT 'PUBLIC';
