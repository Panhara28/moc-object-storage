/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `isPrivate` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `medias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `medias` DROP COLUMN `isDeleted`,
    DROP COLUMN `isPrivate`,
    DROP COLUMN `visibility`,
    ADD COLUMN `isVisibility` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'AVAILABLE';
